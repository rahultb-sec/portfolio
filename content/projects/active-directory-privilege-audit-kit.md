---
title: "Active Directory Misconfiguration & Kerberos Attack Audit Tool"
slug: "active-directory-privilege-audit-kit"
category: "Infrastructure Security"
securityType: "Red Team & Audit Scripting"
date: "2023-11-05"
featured: true
shortDescription: "Automated PowerShell and Python toolkit to audit Kerberoasting, AS-REP Roasting, DCSync rights, and unconstrained delegation paths in enterprise Active Directory environments."
technologies: ["Active Directory", "PowerShell", "Python", "Impacket", "Kerberos", "LDAP"]
featuredImage: "/images/cert.png"
githubUrl: "https://github.com/rahulsecur/ad-privilege-auditor"
liveDemoUrl: ""
documentationUrl: "https://github.com/rahulsecur/ad-privilege-auditor#usage"
---

### Overview

Active Directory (AD) remains the primary authentication backbone for 90%+ of global enterprises. Over years of operational growth, permission sprawl, legacy service accounts, and weak Delegation settings introduce critical attack vectors that allow unprivileged domain users to elevate to Domain Admin.

This auditing suite extracts, parses, and visualizes complex object ACLs and Kerberos tickets to expose hidden privilege escalation pathways.

### Key Capabilities

- **AS-REP Roasting Assessment**: Scans LDAP for user accounts with `DONT_REQ_PREAUTH` enabled and extracts TGT hashes for offline cracking analysis.
- **Kerberoasting Vulnerability Audit**: Identifies Service Principal Names (SPNs) associated with privileged user accounts and checks password age metrics.
- **Delegation Path Mapping**: Audits Unconstrained, Constrained, and Resource-Based Constrained Delegation (RBCD) risks.
- **DCSync & ACL Analysis**: Queries DACLs for `DS-Replication-Get-Changes-All` rights assigned to non-Domain Controller accounts.

### Results & Remediation Impact

- Utilized across 15+ internal enterprise audits to remediate legacy service account vulnerabilities.
- Provided actionable GPO and Tiered Administration hardening recommendations.
