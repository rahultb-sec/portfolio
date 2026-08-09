---
title: "Bypassing Android SSL Pinning in Compiled Native Libraries"
slug: "bypassing-android-ssl-pinning-in-native-code"
excerpt: "A deep dive into dynamic binary instrumentation using Frida to hook C/C++ OpenSSL and BoringSSL functions in target Android applications."
date: "2024-05-10"
author: "Rahul"
category: "Mobile Security"
tags: ["Android", "Frida", "Reverse Engineering", "SSL Pinning", "Mobile Sec"]
readingTime: "8 min read"
featuredImage: "/images/cert.png"
featured: true
---

### Introduction

Standard Android application penetration testing relies heavily on intercepting HTTP/HTTPS traffic using proxy tools like **Burp Suite** or **OWASP ZAP**. While standard Java-based pinning implementations (such as OkHttp's `CertificatePinner`) can be disabled using generic Frida scripts, an increasing number of enterprise mobile applications compiled with Flutter, Unity, or custom C++ libraries embed transport security mechanisms directly inside compiled Shared Libraries (`.so` files).

In this technical article, we examine how to reverse engineer native C/C++ SSL checks using Ghidra and construct custom Frida dynamic instrumentation hooks to bypass verification.

---

### Understanding Native SSL Verification

When an application bundles its own TLS stack (e.g., Google BoringSSL or OpenSSL compiled into `libnative-net.so`), standard Java `TrustManager` calls are bypassed entirely. The application establishes TCP sockets directly through POSIX calls and passes socket file descriptors to native OpenSSL routines.

The key verification functions inside OpenSSL/BoringSSL include:

1. `SSL_CTX_set_custom_verify`
2. `SSL_set_custom_verify`
3. `SSL_get_verify_result`

If the custom verification callback returns any value other than `SSL_VERIFY_NONE` or `0`, the handshake terminates with a TLS alert error (`cert_verify_failed`).

---

### Step 1: Identifying Loaded Native Libraries

Before constructing our hook, we inspect the loaded native modules at runtime using Frida's Javascript API:

```javascript
Process.enumerateModules({
  onMatch: function(module) {
    if (module.name.includes("ssl") || module.name.includes("crypto") || module.name.includes("flutter")) {
      console.log("[+] Found target module: " + module.name + " at " + module.base);
    }
  },
  onComplete: function() {
    console.log("[*] Module enumeration complete.");
  }
});
```

---

### Step 2: Locating Exported Symbols

If the shared library preserves exported symbols, we can directly hook exported functions by name:

```javascript
const targetSymbol = "SSL_set_custom_verify";
const symbolAddress = Module.findExportByName("libssllib.so", targetSymbol);

if (symbolAddress) {
  Interceptor.attach(symbolAddress, {
    onEnter: function(args) {
      console.log("[+] Intercepted " + targetSymbol);
      // Force verification mode argument to SSL_VERIFY_NONE (0)
      args[1] = ptr(0x0);
    },
    onLeave: function(retval) {
      // Force return success (0)
      retval.replace(ptr(0x0));
    }
  });
}
```

---

### Step 3: Handling Stripped Binaries with Pattern Scanning

In production APKs, symbols are frequently stripped. In these scenarios, we analyze the binary in Ghidra or IDA Pro to find unique byte patterns (signatures) around key comparison instructions, and use `Memory.scan` in Frida:

```javascript
const pattern = "7F 45 4C 46 02 01 01 00"; // Signature pattern
const module = Process.getModuleByName("libnative-net.so");

Memory.scan(module.base, module.size, pattern, {
  onMatch: function(address, size) {
    console.log("[+] Found signature match at: " + address);
    Interceptor.attach(address, {
      onLeave: function(retval) {
        retval.replace(ptr(0x1)); // Overwrite verification check return
      }
    });
  },
  onError: function(reason) {
    console.error("[-] Memory scan error: " + reason);
  }
});
```

---

### Key Takeaways & Defense Guidelines

1. **Defense in Depth**: Native SSL pinning raises the bar for casual attackers, but **cannot prevent dedicated dynamic analysis** on rooted or instrumented devices.
2. **Backend Authentication**: Mobile applications must rely on robust backend mutual TLS (mTLS) with hardware-backed key storage (Android Keystore / StrongBox) for critical transactions rather than client-side certificate checking alone.

---

*Found this technical write-up useful? Check out my related mobile security research projects on GitHub.*
