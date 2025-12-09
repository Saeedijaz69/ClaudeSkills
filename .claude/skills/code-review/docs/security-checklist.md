# Security Review Checklist

## Quick Reference

Use this checklist during code reviews to ensure security best practices are followed.

---

## 1. Input Validation

### User Input
- [ ] All user input is validated on the server-side
- [ ] Input length limits are enforced
- [ ] Input format is validated (regex, schemas)
- [ ] Whitelist validation preferred over blacklist
- [ ] File uploads are restricted by type and size

### Data Sanitization
- [ ] HTML output is properly escaped
- [ ] SQL queries use parameterized statements
- [ ] Shell commands avoid user input or are properly escaped
- [ ] JSON/XML parsing handles malicious input

---

## 2. Authentication

### Password Handling
- [ ] Passwords are hashed with strong algorithms (bcrypt, Argon2)
- [ ] Salt is unique per user
- [ ] Password strength requirements enforced
- [ ] No password hints or security questions
- [ ] Account lockout after failed attempts

### Session Management
- [ ] Session tokens are cryptographically random
- [ ] Sessions expire after inactivity
- [ ] Sessions invalidated on logout
- [ ] Session fixation prevented
- [ ] Secure and HttpOnly cookie flags set

### Multi-Factor Authentication
- [ ] MFA option available for sensitive accounts
- [ ] Backup codes handled securely
- [ ] Rate limiting on MFA attempts

---

## 3. Authorization

### Access Control
- [ ] Authorization checks on every request
- [ ] Principle of least privilege applied
- [ ] Role-based access control (RBAC) implemented correctly
- [ ] Direct object references validated
- [ ] Horizontal privilege escalation prevented

### API Security
- [ ] API authentication required
- [ ] API rate limiting implemented
- [ ] API keys not exposed in URLs
- [ ] Sensitive operations require re-authentication

---

## 4. Data Protection

### Sensitive Data
- [ ] PII identified and protected
- [ ] Sensitive data encrypted at rest
- [ ] Sensitive data encrypted in transit (TLS)
- [ ] Data minimization applied
- [ ] Secure data deletion implemented

### Secrets Management
- [ ] No hardcoded credentials
- [ ] Secrets in environment variables or vault
- [ ] API keys rotated regularly
- [ ] Secrets not logged or exposed in errors

---

## 5. Injection Prevention

### SQL Injection
- [ ] Parameterized queries used
- [ ] ORM properly configured
- [ ] Dynamic query building avoided
- [ ] Database permissions restricted

### XSS Prevention
- [ ] Output encoding applied
- [ ] Content Security Policy (CSP) configured
- [ ] DOM manipulation sanitized
- [ ] User-generated content validated

### Command Injection
- [ ] Shell execution avoided when possible
- [ ] Input sanitized before shell use
- [ ] Argument arrays used instead of string concatenation

---

## 6. Error Handling

### Error Messages
- [ ] Generic error messages to users
- [ ] Detailed errors only in logs
- [ ] Stack traces not exposed
- [ ] No sensitive data in error messages

### Logging
- [ ] Security events logged
- [ ] Logs don't contain sensitive data
- [ ] Log injection prevented
- [ ] Logs protected from tampering

---

## 7. Cryptography

### Algorithms
- [ ] Strong algorithms used (AES-256, RSA-2048+)
- [ ] MD5/SHA1 not used for security
- [ ] Cryptographic randomness used (CSPRNG)
- [ ] No custom cryptography

### Implementation
- [ ] Keys properly generated and stored
- [ ] IV/nonce unique per operation
- [ ] Proper padding modes used
- [ ] Key rotation supported

---

## 8. Third-Party Dependencies

### Dependency Management
- [ ] Dependencies from trusted sources
- [ ] Version pinning used
- [ ] Regular security updates
- [ ] Vulnerability scanning automated

### Supply Chain
- [ ] Package integrity verified
- [ ] Minimal dependencies
- [ ] Transitive dependencies reviewed
- [ ] Lock files committed

---

## 9. Configuration Security

### Server Configuration
- [ ] Default credentials changed
- [ ] Unnecessary services disabled
- [ ] Debug mode off in production
- [ ] Security headers configured

### Environment Separation
- [ ] Production data not in development
- [ ] Environment-specific configs
- [ ] Secrets not in version control
- [ ] Production hardened separately

---

## 10. Network Security

### Transport Security
- [ ] HTTPS enforced (HSTS)
- [ ] TLS 1.2+ required
- [ ] Certificate validation enabled
- [ ] Certificate pinning (mobile apps)

### API Security
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Request size limits
- [ ] API versioning

---

## Severity Classification

### Critical (Must Fix Before Merge)
- SQL Injection
- Command Injection
- Authentication bypass
- Hardcoded credentials
- Unencrypted sensitive data

### High (Should Fix Before Deploy)
- XSS vulnerabilities
- CSRF vulnerabilities
- Insecure direct object references
- Missing authorization checks
- Weak cryptography

### Medium (Fix Soon)
- Information disclosure
- Missing security headers
- Verbose error messages
- Weak password policy
- Missing rate limiting

### Low (Track for Future)
- Minor information leaks
- Missing security best practices
- Outdated (but not vulnerable) dependencies

---

## Tools for Automated Scanning

### Static Analysis (SAST)
- **Python**: Bandit, Pylint security
- **JavaScript**: ESLint security plugins, npm audit
- **General**: SonarQube, Semgrep

### Dynamic Analysis (DAST)
- OWASP ZAP
- Burp Suite
- Nikto

### Dependency Scanning
- Snyk
- Dependabot
- npm audit / pip-audit

### Secret Detection
- git-secrets
- truffleHog
- detect-secrets

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
