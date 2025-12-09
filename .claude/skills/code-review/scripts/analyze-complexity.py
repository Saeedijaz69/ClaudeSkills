#!/usr/bin/env python3
"""
Code Complexity Analyzer
Analyzes cyclomatic complexity, cognitive complexity, and maintainability metrics.
"""

import re
import sys
import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional

@dataclass
class FunctionMetrics:
    name: str
    file: str
    line: int
    cyclomatic_complexity: int
    cognitive_complexity: int
    lines_of_code: int
    parameters: int
    nesting_depth: int
    risk_level: str

@dataclass
class FileMetrics:
    file: str
    total_lines: int
    code_lines: int
    comment_lines: int
    blank_lines: int
    functions: int
    classes: int
    average_complexity: float
    max_complexity: int
    maintainability_index: float

def calculate_cyclomatic_complexity(code: str, language: str = 'python') -> int:
    """Calculate cyclomatic complexity based on decision points."""
    complexity = 1  # Base complexity
    
    # Decision point patterns
    patterns = {
        'python': [
            r'\bif\b', r'\belif\b', r'\bfor\b', r'\bwhile\b',
            r'\band\b', r'\bor\b', r'\bexcept\b', r'\bwith\b',
            r'\bcase\b', r'\?\s*:', r'\blambda\b'
        ],
        'javascript': [
            r'\bif\b', r'\belse\s+if\b', r'\bfor\b', r'\bwhile\b',
            r'\bcase\b', r'\bcatch\b', r'\?\s*:', r'\&\&', r'\|\|',
            r'\?\?', r'=>'
        ],
        'typescript': [
            r'\bif\b', r'\belse\s+if\b', r'\bfor\b', r'\bwhile\b',
            r'\bcase\b', r'\bcatch\b', r'\?\s*:', r'\&\&', r'\|\|',
            r'\?\?', r'=>'
        ]
    }
    
    for pattern in patterns.get(language, patterns['python']):
        complexity += len(re.findall(pattern, code))
    
    return complexity

def calculate_cognitive_complexity(code: str, language: str = 'python') -> int:
    """Calculate cognitive complexity based on mental effort to understand."""
    complexity = 0
    nesting_level = 0
    
    # Simplified cognitive complexity calculation
    lines = code.split('\n')
    
    for line in lines:
        stripped = line.strip()
        
        # Nesting increases
        if re.search(r'\b(if|for|while|try|with|switch)\b', stripped):
            complexity += 1 + nesting_level
            nesting_level += 1
        
        # Binary logical operators
        complexity += len(re.findall(r'\b(and|or|\&\&|\|\|)\b', stripped))
        
        # Nesting decreases (simplified)
        if stripped.startswith(('else', 'elif', 'except', 'finally', 'catch')):
            complexity += 1
        
        # Recursion (simplified detection)
        if 'return' in stripped and re.search(r'\w+\s*\(', stripped):
            complexity += 1
    
    return complexity

def calculate_maintainability_index(loc: int, cyclomatic: int, halstead_volume: float = 100) -> float:
    """
    Calculate Maintainability Index (MI).
    MI = max(0, (171 - 5.2 * ln(V) - 0.23 * G - 16.2 * ln(LOC)) * 100 / 171)
    Simplified version using defaults.
    """
    import math
    
    if loc == 0:
        return 100.0
    
    v = halstead_volume  # Simplified Halstead volume
    g = cyclomatic
    
    mi = 171 - 5.2 * math.log(v) - 0.23 * g - 16.2 * math.log(loc)
    mi = max(0, (mi * 100) / 171)
    
    return round(mi, 2)

def get_risk_level(complexity: int) -> str:
    """Determine risk level based on cyclomatic complexity."""
    if complexity <= 10:
        return "LOW"
    elif complexity <= 20:
        return "MEDIUM"
    elif complexity <= 50:
        return "HIGH"
    else:
        return "CRITICAL"

def analyze_python_file(file_path: Path) -> Dict:
    """Analyze a Python file for complexity metrics."""
    content = file_path.read_text(encoding='utf-8', errors='ignore')
    lines = content.split('\n')
    
    metrics = {
        'file': str(file_path),
        'total_lines': len(lines),
        'code_lines': 0,
        'comment_lines': 0,
        'blank_lines': 0,
        'functions': [],
        'classes': 0,
    }
    
    in_multiline_string = False
    current_function = None
    function_lines = []
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        
        # Count line types
        if not stripped:
            metrics['blank_lines'] += 1
        elif stripped.startswith('#'):
            metrics['comment_lines'] += 1
        else:
            metrics['code_lines'] += 1
        
        # Detect classes
        if re.match(r'^class\s+\w+', stripped):
            metrics['classes'] += 1
        
        # Detect function definitions
        func_match = re.match(r'^(async\s+)?def\s+(\w+)\s*\((.*?)\)', stripped)
        if func_match:
            # Save previous function if exists
            if current_function and function_lines:
                func_code = '\n'.join(function_lines)
                cyclomatic = calculate_cyclomatic_complexity(func_code, 'python')
                cognitive = calculate_cognitive_complexity(func_code, 'python')
                
                metrics['functions'].append(FunctionMetrics(
                    name=current_function['name'],
                    file=str(file_path),
                    line=current_function['line'],
                    cyclomatic_complexity=cyclomatic,
                    cognitive_complexity=cognitive,
                    lines_of_code=len(function_lines),
                    parameters=current_function['params'],
                    nesting_depth=0,  # Simplified
                    risk_level=get_risk_level(cyclomatic)
                ))
            
            # Start new function tracking
            params = func_match.group(3)
            param_count = len([p for p in params.split(',') if p.strip()]) if params.strip() else 0
            
            current_function = {
                'name': func_match.group(2),
                'line': i,
                'params': param_count
            }
            function_lines = [line]
        elif current_function:
            # Continue collecting function lines (simplified - just collect until next def/class)
            if stripped and not stripped.startswith(('def ', 'class ', 'async def ')):
                function_lines.append(line)
    
    # Process last function
    if current_function and function_lines:
        func_code = '\n'.join(function_lines)
        cyclomatic = calculate_cyclomatic_complexity(func_code, 'python')
        cognitive = calculate_cognitive_complexity(func_code, 'python')
        
        metrics['functions'].append(FunctionMetrics(
            name=current_function['name'],
            file=str(file_path),
            line=current_function['line'],
            cyclomatic_complexity=cyclomatic,
            cognitive_complexity=cognitive,
            lines_of_code=len(function_lines),
            parameters=current_function['params'],
            nesting_depth=0,
            risk_level=get_risk_level(cyclomatic)
        ))
    
    # Calculate aggregates
    if metrics['functions']:
        complexities = [f.cyclomatic_complexity for f in metrics['functions']]
        metrics['average_complexity'] = round(sum(complexities) / len(complexities), 2)
        metrics['max_complexity'] = max(complexities)
    else:
        metrics['average_complexity'] = 0
        metrics['max_complexity'] = 0
    
    metrics['maintainability_index'] = calculate_maintainability_index(
        metrics['code_lines'],
        metrics['max_complexity']
    )
    
    # Convert function dataclasses to dicts for JSON serialization
    metrics['functions'] = [asdict(f) for f in metrics['functions']]
    
    return metrics

def analyze_javascript_file(file_path: Path) -> Dict:
    """Analyze a JavaScript/TypeScript file for complexity metrics."""
    content = file_path.read_text(encoding='utf-8', errors='ignore')
    lines = content.split('\n')
    
    metrics = {
        'file': str(file_path),
        'total_lines': len(lines),
        'code_lines': 0,
        'comment_lines': 0,
        'blank_lines': 0,
        'functions': [],
        'classes': 0,
    }
    
    in_multiline_comment = False
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        
        # Handle multiline comments
        if '/*' in stripped:
            in_multiline_comment = True
        if '*/' in stripped:
            in_multiline_comment = False
            metrics['comment_lines'] += 1
            continue
        
        if in_multiline_comment:
            metrics['comment_lines'] += 1
            continue
        
        # Count line types
        if not stripped:
            metrics['blank_lines'] += 1
        elif stripped.startswith('//'):
            metrics['comment_lines'] += 1
        else:
            metrics['code_lines'] += 1
        
        # Detect classes
        if re.match(r'^(export\s+)?(default\s+)?class\s+\w+', stripped):
            metrics['classes'] += 1
    
    # Calculate overall complexity for the file
    cyclomatic = calculate_cyclomatic_complexity(content, 'javascript')
    cognitive = calculate_cognitive_complexity(content, 'javascript')
    
    metrics['average_complexity'] = cyclomatic
    metrics['max_complexity'] = cyclomatic
    metrics['maintainability_index'] = calculate_maintainability_index(
        metrics['code_lines'],
        cyclomatic
    )
    
    return metrics

def print_report(metrics: Dict, verbose: bool = False):
    """Print a formatted complexity report."""
    print("\n" + "=" * 60)
    print(f"COMPLEXITY ANALYSIS REPORT")
    print("=" * 60)
    
    print(f"\nFile: {metrics['file']}")
    print(f"Total Lines: {metrics['total_lines']}")
    print(f"Code Lines: {metrics['code_lines']}")
    print(f"Comment Lines: {metrics['comment_lines']}")
    print(f"Blank Lines: {metrics['blank_lines']}")
    print(f"Classes: {metrics['classes']}")
    print(f"Functions: {len(metrics['functions'])}")
    
    print(f"\nComplexity Metrics:")
    print(f"  Average Cyclomatic: {metrics['average_complexity']}")
    print(f"  Max Cyclomatic: {metrics['max_complexity']}")
    print(f"  Maintainability Index: {metrics['maintainability_index']}/100")
    
    # Maintainability interpretation
    mi = metrics['maintainability_index']
    if mi >= 85:
        mi_status = "✅ Highly Maintainable"
    elif mi >= 65:
        mi_status = "🟡 Moderately Maintainable"
    elif mi >= 50:
        mi_status = "🟠 Difficult to Maintain"
    else:
        mi_status = "🔴 Very Difficult to Maintain"
    print(f"  Status: {mi_status}")
    
    if verbose and metrics['functions']:
        print(f"\nFunction Analysis:")
        print("-" * 60)
        
        for func in sorted(metrics['functions'], key=lambda x: x['cyclomatic_complexity'], reverse=True):
            risk_emoji = {
                'LOW': '🟢',
                'MEDIUM': '🟡',
                'HIGH': '🟠',
                'CRITICAL': '🔴'
            }.get(func['risk_level'], '⚪')
            
            print(f"\n  {risk_emoji} {func['name']}() at line {func['line']}")
            print(f"     Cyclomatic: {func['cyclomatic_complexity']} | Cognitive: {func['cognitive_complexity']}")
            print(f"     LOC: {func['lines_of_code']} | Params: {func['parameters']}")
            print(f"     Risk: {func['risk_level']}")
    
    # Recommendations
    print("\n" + "-" * 60)
    print("RECOMMENDATIONS:")
    
    if metrics['max_complexity'] > 20:
        print("  🔴 HIGH COMPLEXITY: Consider breaking down complex functions")
    if metrics['maintainability_index'] < 65:
        print("  🟠 LOW MAINTAINABILITY: Refactoring recommended")
    if metrics['code_lines'] > 500:
        print("  🟡 LARGE FILE: Consider splitting into smaller modules")
    if metrics['average_complexity'] <= 10 and metrics['maintainability_index'] >= 65:
        print("  ✅ Code complexity is within acceptable limits")
    
    print("=" * 60)

def main():
    if len(sys.argv) < 2:
        print("Usage: python analyze-complexity.py <file_path> [--verbose] [--json]")
        print("\nSupported file types: .py, .js, .ts, .jsx, .tsx")
        sys.exit(1)
    
    file_path = Path(sys.argv[1])
    verbose = '--verbose' in sys.argv or '-v' in sys.argv
    json_output = '--json' in sys.argv
    
    if not file_path.exists():
        print(f"Error: File not found: {file_path}")
        sys.exit(1)
    
    # Determine file type and analyze
    suffix = file_path.suffix.lower()
    
    if suffix == '.py':
        metrics = analyze_python_file(file_path)
    elif suffix in ['.js', '.jsx', '.ts', '.tsx']:
        metrics = analyze_javascript_file(file_path)
    else:
        print(f"Unsupported file type: {suffix}")
        sys.exit(1)
    
    if json_output:
        print(json.dumps(metrics, indent=2))
    else:
        print_report(metrics, verbose)

if __name__ == '__main__':
    main()
