#!/usr/bin/env python3
"""
Security Scanner
Detects common security vulnerabilities in code.
"""

import re
import sys
import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional

@dataclass
class SecurityIssue:
    severity: str  # CRITICAL, HIGH, MEDIUM, LOW
    category: str
    title: str
    description: str
    file: str
    line: int
    code_snippet: str
    recommendation: str
    cwe_id: Optional[str] = None

# Security patterns to detect
SECURITY_PATTERNS = {
    'python': [
        {
            'pattern': r'eval\s*\(',
            'severity': 'CRITICAL',
            'category': 'Code Injection',
            'title': 'Use of eval()',
            'description': 'eval() can execute arbitrary code and is a major security risk',
            'recommendation': 'Use ast.literal_eval() for safe evaluation or avoid dynamic code execution',
            'cwe_id': 'CWE-94'
        },
        {
            'pattern': r'exec\s*\(',
            'severity': 'CRITICAL',
            'category': 'Code Injection',
            'title': 'Use of exec()',
            'description': 'exec() can execute arbitrary code and is a major security risk',
            'recommendation': 'Avoid dynamic code execution; use safer alternatives',
            'cwe_id': 'CWE-94'
        },
        {
            'pattern': r'pickle\.loads?\s*\(',
            'severity': 'HIGH',
            'category': 'Deserialization',
            'title': 'Unsafe Pickle Deserialization',
            'description': 'Pickle can deserialize malicious objects leading to code execution',
            'recommendation': 'Use JSON or other safe serialization formats for untrusted data',
            'cwe_id': 'CWE-502'
        },
        {
            'pattern': r'subprocess\.(call|run|Popen)\s*\([^)]*shell\s*=\s*True',
            'severity': 'HIGH',
            'category': 'Command Injection',
            'title': 'Shell=True in subprocess',
            'description': 'Using shell=True with user input can lead to command injection',
            'recommendation': 'Use shell=False and pass arguments as a list',
            'cwe_id': 'CWE-78'
        },
        {
            'pattern': r'os\.system\s*\(',
            'severity': 'HIGH',
            'category': 'Command Injection',
            'title': 'Use of os.system()',
            'description': 'os.system() is vulnerable to command injection',
            'recommendation': 'Use subprocess with shell=False instead',
            'cwe_id': 'CWE-78'
        },
        {
            'pattern': r'\.format\s*\([^)]*\)\s*$|%\s*\([^)]+\)|f["\'][^"\']*{[^}]*}',
            'severity': 'MEDIUM',
            'category': 'SQL Injection',
            'title': 'Potential SQL String Formatting',
            'description': 'String formatting in SQL queries can lead to SQL injection',
            'recommendation': 'Use parameterized queries with placeholders',
            'cwe_id': 'CWE-89'
        },
        {
            'pattern': r'(password|secret|api_key|apikey|token|credential)\s*=\s*["\'][^"\']+["\']',
            'severity': 'CRITICAL',
            'category': 'Hardcoded Secrets',
            'title': 'Hardcoded Credentials',
            'description': 'Credentials should never be hardcoded in source code',
            'recommendation': 'Use environment variables or a secrets manager',
            'cwe_id': 'CWE-798'
        },
        {
            'pattern': r'hashlib\.(md5|sha1)\s*\(',
            'severity': 'MEDIUM',
            'category': 'Weak Cryptography',
            'title': 'Weak Hash Algorithm',
            'description': 'MD5 and SHA1 are cryptographically weak',
            'recommendation': 'Use SHA-256 or stronger for security-sensitive hashing',
            'cwe_id': 'CWE-328'
        },
        {
            'pattern': r'random\.(random|randint|choice|randrange)\s*\(',
            'severity': 'LOW',
            'category': 'Weak Randomness',
            'title': 'Non-cryptographic Random',
            'description': 'random module is not suitable for security purposes',
            'recommendation': 'Use secrets module for security-sensitive random values',
            'cwe_id': 'CWE-330'
        },
        {
            'pattern': r'verify\s*=\s*False',
            'severity': 'HIGH',
            'category': 'SSL/TLS',
            'title': 'SSL Verification Disabled',
            'description': 'Disabling SSL verification allows man-in-the-middle attacks',
            'recommendation': 'Always verify SSL certificates in production',
            'cwe_id': 'CWE-295'
        },
        {
            'pattern': r'DEBUG\s*=\s*True',
            'severity': 'MEDIUM',
            'category': 'Configuration',
            'title': 'Debug Mode Enabled',
            'description': 'Debug mode can expose sensitive information',
            'recommendation': 'Ensure DEBUG is False in production',
            'cwe_id': 'CWE-489'
        },
    ],
    'javascript': [
        {
            'pattern': r'eval\s*\(',
            'severity': 'CRITICAL',
            'category': 'Code Injection',
            'title': 'Use of eval()',
            'description': 'eval() can execute arbitrary code and is a major security risk',
            'recommendation': 'Avoid eval(); use JSON.parse() for JSON data',
            'cwe_id': 'CWE-94'
        },
        {
            'pattern': r'new\s+Function\s*\(',
            'severity': 'HIGH',
            'category': 'Code Injection',
            'title': 'Dynamic Function Constructor',
            'description': 'new Function() is similar to eval() and can execute arbitrary code',
            'recommendation': 'Avoid dynamic code generation',
            'cwe_id': 'CWE-94'
        },
        {
            'pattern': r'\.innerHTML\s*=',
            'severity': 'HIGH',
            'category': 'XSS',
            'title': 'innerHTML Assignment',
            'description': 'innerHTML can execute scripts if content is not sanitized',
            'recommendation': 'Use textContent or sanitize HTML before assignment',
            'cwe_id': 'CWE-79'
        },
        {
            'pattern': r'document\.write\s*\(',
            'severity': 'HIGH',
            'category': 'XSS',
            'title': 'document.write() Usage',
            'description': 'document.write() can introduce XSS vulnerabilities',
            'recommendation': 'Use DOM manipulation methods instead',
            'cwe_id': 'CWE-79'
        },
        {
            'pattern': r'dangerouslySetInnerHTML',
            'severity': 'MEDIUM',
            'category': 'XSS',
            'title': 'dangerouslySetInnerHTML in React',
            'description': 'Can introduce XSS if content is not sanitized',
            'recommendation': 'Sanitize content using DOMPurify or similar library',
            'cwe_id': 'CWE-79'
        },
        {
            'pattern': r'(password|secret|api_key|apikey|token|credential)\s*[=:]\s*["\'][^"\']+["\']',
            'severity': 'CRITICAL',
            'category': 'Hardcoded Secrets',
            'title': 'Hardcoded Credentials',
            'description': 'Credentials should never be hardcoded in source code',
            'recommendation': 'Use environment variables or a secrets manager',
            'cwe_id': 'CWE-798'
        },
        {
            'pattern': r'localStorage\.setItem\s*\([^)]*password|localStorage\.setItem\s*\([^)]*token',
            'severity': 'HIGH',
            'category': 'Sensitive Data Exposure',
            'title': 'Sensitive Data in localStorage',
            'description': 'Storing sensitive data in localStorage is insecure',
            'recommendation': 'Use secure, httpOnly cookies for sensitive tokens',
            'cwe_id': 'CWE-922'
        },
        {
            'pattern': r'Math\.random\s*\(',
            'severity': 'LOW',
            'category': 'Weak Randomness',
            'title': 'Math.random() for Security',
            'description': 'Math.random() is not cryptographically secure',
            'recommendation': 'Use crypto.getRandomValues() for security purposes',
            'cwe_id': 'CWE-330'
        },
        {
            'pattern': r'cors\s*:\s*true|Access-Control-Allow-Origin.*\*',
            'severity': 'MEDIUM',
            'category': 'CORS',
            'title': 'Permissive CORS Configuration',
            'description': 'Wildcard CORS allows any origin to access resources',
            'recommendation': 'Specify exact allowed origins',
            'cwe_id': 'CWE-942'
        },
        {
            'pattern': r'child_process\.(exec|spawn)\s*\([^)]*\+|child_process\.(exec|spawn)\s*\(`',
            'severity': 'HIGH',
            'category': 'Command Injection',
            'title': 'Command Injection Risk',
            'description': 'String concatenation in shell commands can lead to injection',
            'recommendation': 'Sanitize inputs and avoid shell commands when possible',
            'cwe_id': 'CWE-78'
        },
    ],
    'sql': [
        {
            'pattern': r'SELECT\s+\*\s+FROM',
            'severity': 'LOW',
            'category': 'Data Exposure',
            'title': 'SELECT * Usage',
            'description': 'SELECT * can expose unintended columns',
            'recommendation': 'Explicitly list required columns',
            'cwe_id': 'CWE-200'
        },
        {
            'pattern': r'--.*admin|admin.*--',
            'severity': 'HIGH',
            'category': 'SQL Injection',
            'title': 'Potential SQL Injection Pattern',
            'description': 'Comment syntax may indicate SQL injection attempt',
            'recommendation': 'Use parameterized queries',
            'cwe_id': 'CWE-89'
        },
    ]
}

def detect_language(file_path: Path) -> str:
    """Detect programming language from file extension."""
    suffix = file_path.suffix.lower()
    mapping = {
        '.py': 'python',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'javascript',
        '.tsx': 'javascript',
        '.sql': 'sql',
    }
    return mapping.get(suffix, 'unknown')

def scan_file(file_path: Path) -> List[SecurityIssue]:
    """Scan a file for security issues."""
    issues = []
    language = detect_language(file_path)
    
    if language == 'unknown':
        return issues
    
    patterns = SECURITY_PATTERNS.get(language, [])
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        lines = content.split('\n')
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return issues
    
    for i, line in enumerate(lines, 1):
        for pattern_info in patterns:
            if re.search(pattern_info['pattern'], line, re.IGNORECASE):
                issues.append(SecurityIssue(
                    severity=pattern_info['severity'],
                    category=pattern_info['category'],
                    title=pattern_info['title'],
                    description=pattern_info['description'],
                    file=str(file_path),
                    line=i,
                    code_snippet=line.strip()[:100],
                    recommendation=pattern_info['recommendation'],
                    cwe_id=pattern_info.get('cwe_id')
                ))
    
    return issues

def scan_directory(dir_path: Path, extensions: List[str] = None) -> List[SecurityIssue]:
    """Recursively scan a directory for security issues."""
    if extensions is None:
        extensions = ['.py', '.js', '.jsx', '.ts', '.tsx']
    
    all_issues = []
    
    for file_path in dir_path.rglob('*'):
        if file_path.is_file() and file_path.suffix.lower() in extensions:
            # Skip common non-source directories
            if any(part in file_path.parts for part in ['node_modules', '__pycache__', '.git', 'venv', 'dist', 'build']):
                continue
            issues = scan_file(file_path)
            all_issues.extend(issues)
    
    return all_issues

def print_report(issues: List[SecurityIssue]):
    """Print a formatted security report."""
    print("\n" + "=" * 70)
    print("SECURITY SCAN REPORT")
    print("=" * 70)
    
    if not issues:
        print("\n✅ No security issues detected!")
        print("=" * 70)
        return
    
    # Group by severity
    by_severity = {'CRITICAL': [], 'HIGH': [], 'MEDIUM': [], 'LOW': []}
    for issue in issues:
        by_severity[issue.severity].append(issue)
    
    # Print summary
    print(f"\nSummary:")
    print(f"  🔴 Critical: {len(by_severity['CRITICAL'])}")
    print(f"  🟠 High: {len(by_severity['HIGH'])}")
    print(f"  🟡 Medium: {len(by_severity['MEDIUM'])}")
    print(f"  🔵 Low: {len(by_severity['LOW'])}")
    print(f"  Total: {len(issues)}")
    
    # Print detailed findings
    severity_emoji = {'CRITICAL': '🔴', 'HIGH': '🟠', 'MEDIUM': '🟡', 'LOW': '🔵'}
    
    for severity in ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']:
        if by_severity[severity]:
            print(f"\n{severity_emoji[severity]} {severity} ISSUES ({len(by_severity[severity])})")
            print("-" * 70)
            
            for issue in by_severity[severity]:
                print(f"\n  [{issue.category}] {issue.title}")
                if issue.cwe_id:
                    print(f"  CWE: {issue.cwe_id}")
                print(f"  File: {issue.file}:{issue.line}")
                print(f"  Code: {issue.code_snippet}")
                print(f"  Issue: {issue.description}")
                print(f"  Fix: {issue.recommendation}")
    
    print("\n" + "=" * 70)
    
    # Exit code based on findings
    if by_severity['CRITICAL']:
        print("⚠️  CRITICAL issues found! Address immediately.")
    elif by_severity['HIGH']:
        print("⚠️  HIGH severity issues found. Review before deployment.")

def main():
    if len(sys.argv) < 2:
        print("Usage: python security-scan.py <file_or_directory> [--json]")
        sys.exit(1)
    
    target = Path(sys.argv[1])
    json_output = '--json' in sys.argv
    
    if not target.exists():
        print(f"Error: Path not found: {target}")
        sys.exit(1)
    
    if target.is_file():
        issues = scan_file(target)
    else:
        issues = scan_directory(target)
    
    if json_output:
        print(json.dumps([asdict(i) for i in issues], indent=2))
    else:
        print_report(issues)
    
    # Exit with error code if critical issues found
    critical_count = sum(1 for i in issues if i.severity == 'CRITICAL')
    if critical_count > 0:
        sys.exit(1)

if __name__ == '__main__':
    main()
