# Encryption and Security

## User Story: Data Encryption

**As a** user  
**I want** my personal data to be encrypted  
**So that** my privacy is protected

**Acceptance Criteria:**
- [ ] All PII is encrypted at rest
- [ ] Encryption keys are properly derived (PBKDF2 100k+ iterations)
- [ ] Sensitive data is cleared from memory after use
- [ ] No sensitive data in logs or crash reports
- [ ] Clipboard is disabled for sensitive fields

## User Story: Secure Backups

**As a** user  
**I want to** backup my data securely  
**So that** I can restore it if needed

**Acceptance Criteria:**
- [ ] Backups are encrypted before upload
- [ ] Backup integrity verified with checksums
- [ ] User controls backup frequency
- [ ] Backup restoration requires authentication
- [ ] Backup size limits enforced (10MB max)

