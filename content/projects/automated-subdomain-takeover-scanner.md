---
title: "Cloud Subdomain Takeover & DNS Misconfiguration Scanner"
slug: "automated-subdomain-takeover-scanner"
category: "Cloud Security"
securityType: "Vulnerability Scanner"
date: "2024-01-20"
featured: true
shortDescription: "An asynchronous DNS enumeration and cloud fingerprinting engine built in Python to detect dangling CNAME records across AWS, Azure, and GCP."
technologies: ["Python", "Asyncio", "DNS", "AWS S3", "Azure", "Docker"]
featuredImage: "/images/cert11.png"
githubUrl: "https://github.com/rahulsecur/subdomain-takeover-engine"
liveDemoUrl: ""
documentationUrl: "https://github.com/rahulsecur/subdomain-takeover-engine#documentation"
---

### Overview

Dangling DNS CNAME records pointing to decommissioned third-party cloud services (AWS S3, GitHub Pages, Heroku, Azure Web Apps) present a critical security risk. Attackers can claim the target cloud resource and serve malicious content under the victim's domain name, inheriting cookie contexts and brand trust.

This project is a high-performance **Asynchronous DNS & HTTP Fingerprinting Engine** that scans large enterprise asset inventories to identify vulnerable dangling records before malicious registration occurs.

### Problem Statement

Legacy enterprise infrastructure often leaves orphan CNAME entries pointing to unclaimed cloud storage buckets or app instances. Existing open-source tools often generate high false-positive rates due to static string matching or lack support for multi-step HTTP response validation.

### Technical Implementation

1. **High-Throughput DNS Resolution**:
   - Built using Python's `asyncio` and `dnspython` to query tens of thousands of domains per minute.
   - Resolves full CNAME chains to determine ultimate canonical targets.

2. **Dynamic Signature Matching Engine**:
   - Maintains a structured database of cloud provider error signatures (e.g., AWS "NoSuchBucket", GitHub Pages "404 There isn't a GitHub Pages site here").
   - Performs concurrent HTTP GET/HEAD requests with custom User-Agents to verify target bucket state.

```python
async def verify_s3_takeover(cname_target: str) -> bool:
    async with aiohttp.ClientSession() as session:
        async with session.get(f"http://{cname_target}") as resp:
            body = await resp.text()
            if resp.status == 404 and "NoSuchBucket" in body:
                return True
    return False
```

### Security Aspects & Results

- Scanned over 50,000 corporate subdomains during bug bounty research.
- Successfully reported 8 valid high-severity subdomain takeovers affecting major tech corporations.
- Achieved zero false positives through multi-stage DNS and HTTP verification.
