# AGENTS.md

## Agent Communication Protocol (ACP) - System Rules

This document defines the mandatory communication protocol for all AI agents operating within the Vasify SUITE ecosystem. These rules are **absolute** and must be followed by every AI agent without exception.

---

## 1. **Core Communication Principles**

### 1.1 Mandatory Introduction
All agent communications must begin with a formal introduction:
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's primary role]
**STATUS:** [Current status: ready, working, blocked, completed, etc.]
**CONTEXT:** [Brief context or project summary]
```

**Example:**
```markdown
**AGENT:** CodeArchitect AI
**ROLE:** Backend System Architect
**STATUS:** Ready for review
**CONTEXT:** Reviewing authentication module implementation
```

### 1.2 Status Reporting
Agents must maintain a status field in all communications. Accepted status values:
- `ready` - Ready to receive tasks
- `working` - Actively processing
- `blocked` - Awaiting external input
- `completed` - Task finished
- `escalating` - Escalating to higher authority
- `error` - Encountered critical error

### 1.3 Context Persistence
All communications must maintain context from previous interactions. Agents must:
- Reference previous messages when necessary
- Acknowledge previous findings or decisions
- Provide continuity in conversations

---

## 2. **Task Management Protocol**

### 2.1 Task Submission Format
When submitting tasks to other agents, use this format:
```markdown
**TO:** [Recipient Agent Name]
**FROM:** [Your Agent Name]
**TASK:** [Task description]
**PRIORITY:** [critical/high/medium/low]
**DUE:** [Timestamp or deadline]
**DEPENDENCIES:** [List any prerequisites]
**OUTPUT:** [Expected output format or deliverable]
**CONSTRAINTS:** [Any limitations or rules]
```

**Example:**
```markdown
**TO:** CodeArchitect AI
**FROM:** ProjectManager AI
**TASK:** Implement JWT authentication for /api/auth endpoint
**PRIORITY:** high
**DUE:** 2024-10-27T17:00:00Z
**DEPENDENCIES:** User schema must be completed
**OUTPUT:** Working /auth endpoint with JWT tokens
**CONSTRAINTS:** Use bcrypt for password hashing
```

### 2.2 Task Acknowledgment
Recipient agents must acknowledge tasks within:
- 5 minutes for `high` priority
- 15 minutes for `medium` priority
- 30 minutes for `low` priority

Acknowledgment format:
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's role]
**STATUS:** working
**ACKNOWLEDGED:** Task [Task ID] from [Sender Name]
**ETA:** [Estimated completion time]
```

---

## 3. **Conflict Resolution Protocol**

### 3.1 Conflict Identification
Agents must report conflicts immediately using:
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's role]
**STATUS:** error
**CONFLICT:** [Conflict description]
**IMPACT:** [What this conflict affects]
**SUGGESTIONS:** [Potential solutions]
```

### 3.2 Escalation Protocol
If a conflict cannot be resolved between two agents within 1 hour:
1. Identify the next level authority: **ProductOwner AI**
2. Submit escalation request with:
   ```markdown
   **ESCALATION:** Conflict between [Agent A] and [Agent B]
   **REASON:** [Why escalation is needed]
   **BACKGROUND:** [Summary of the issue]
   **HISTORY:** [Timeline of interactions]
   **REQUESTED:** [What you need from ProductOwner AI]
   ```

### 3.3 Authority Structure
Agents must respect the following hierarchy:
1. **SystemAdministrator AI** - Ultimate authority
2. **ProductOwner AI** - Product decisions and approvals
3. **TeamLead AI** - Coordination and task assignment
4. **Specialist AIs** - Technical implementation
5. **JuniorAIs** - Support and data processing

---

## 4. **Documentation Standards**

### 4.1 Communication Logs
All agent communications must be logged in:
- `SYSTEM_LOGS/COMMUNICATIONS.md`
- Format: Markdown with timestamp, agent names, and message content

### 4.2 Decision Records
Important decisions must be documented in:
- `SYSTEM_LOGS/DECISIONS.md`
- Format: Date, decision-maker, decision summary, impact, justification

### 4.3 Code Documentation
All code changes must include:
- Commit messages following conventional commits
- Updated `CHANGELOG.md`
- API documentation in `docs/api/`

---

## 5. **Technical Requirements**

### 5.1 Message Length Limits
- **Standard messages:** Max 500 words
- **Summary reports:** Max 300 words
- **Full documentation:** As needed (outside standard comms)

### 5.2 Response Time Requirements
- **Standard:** Within 15 minutes
- **Critical:** Within 5 minutes
- **Batch processing:** Within 1 hour

### 5.3 File Naming Conventions
```
PROJECTNAME_AGENCYNAME_ROLE_VERSION.md

Example:
VT_SUITE_CODEARCHITECT_AUTH_MODULE_V1.0.md
```

---

## 6. **Quality Assurance**

### 6.1 Code Review Requirements
All code changes must undergo:
- Automated tests (unit, integration, E2E)
- Peer review by another specialist AI
- Security audit by SecurityGuardian AI
- Performance testing

### 6.2 Testing Standards
- **Unit tests:** Minimum 80% coverage
- **Integration tests:** All core flows
- **E2E tests:** Critical user journeys

### 6.3 Security Requirements
- No hardcoded secrets in code
- Environment variables for all secrets
- Regular security audits
- Input validation on all external interfaces

---

## 7. **Common Communication Templates**

### 7.1 Task Completion Notification
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's role]
**STATUS:** completed
**TASK:** [Task ID] from [Sender Name]

**COMPLETED:** [Task description]
**OUTPUT:** [Link to deliverable]
**TESTS:** [Test results]
**CHANGES:** [Summary of changes]
**NEXT STEPS:** [Suggested follow-ups]
```

### 7.2 Escalation Notification
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's role]
**STATUS:** escalating
**ESCALATION:** Conflict resolution required

**CONFLICT BETWEEN:** [Agent A] and [Agent B]
**ISSUE:** [Clear problem statement]
**TIMELINE:**
- Started: [Timestamp]
- Last interaction: [Timestamp]
- Duration: [X hours]

**ATTEMPTS MADE:**
1. [Attempt 1]
2. [Attempt 2]

**IMPACT:** [What is blocked]
**SUGGESTED RESOLUTION:** [Your recommendation]
**REQUIRED FROM:** [Who can resolve this]
```

### 7.3 Status Update Report
```markdown
**AGENT:** [Agent Name]
**ROLE:** [Agent's role]
**STATUS:** working
**PERIOD:** [Reporting period]

**ACCOMPLISHMENTS:**
1. [Accomplishment]
2. [Accomplishment]

**IN PROGRESS:**
1. [Task in progress]

**BLOCKERS:**
1. [Blocker details]

**NEXT STEPS:**
1. [Next action]
```

---

## 8. **Documentation and Updates**

### 8.1 Protocol Review Cycle
- **Frequency:** Monthly
- **Owner:** SystemAdministrator AI
- **Reviewers:** All specialist AIs
- **Approval:** Required from SystemAdministrator AI

### 8.2 Adding New Protocols
To add a new communication protocol:
1. Submit proposal to SystemAdministrator AI
2. Include:
   - Protocol
