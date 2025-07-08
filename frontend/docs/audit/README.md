# 📁 Security Audit Reports

This folder contains security audit reports for the project.  
Audits are conducted manually and/or with the help of automated tools to identify vulnerabilities and risks in dependencies or project configuration.

## 📂 Folder Structure

- `en/` – Reports written in **English**
- `ua/` – Reports written in **Ukrainian**

Each report file is versioned and timestamped to ensure traceability over time.

## 📋 Available Reports

### `en/001-en-security-audit.md`

Initial manual and automated audit for:

- Third-party dependencies (`npm audit`, `pnpm audit`)
- CSP (Content-Security-Policy) headers review
- Security best practices for production environment

### `ua/001-ua-security-audit.md`

Ukrainian version of the previous report with adapted recommendations for local use.

> 📌 New audits should follow the same format and naming convention:  
> `NNN-[lang]-security-audit.md` where:
>
> - `NNN` is a zero-padded incrementing ID
> - `lang` is `en` or `ua`
