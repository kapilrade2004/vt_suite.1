# 🚀 VasifyTech SaaS Modules Architecture

This folder (`saas-modules/`) stores isolated, modular SaaS backend & frontend implementations for VasifyTech Suite.

---

## 📁 Directory Structure

```text
saas-modules/
├── backend/
│   ├── routes/
│   │   └── invoice.routes.js     <-- Multi-Tenant SaaS Invoice & Serialwise Billing API
│   ├── controllers/              <-- Controller logic for business modules
│   └── services/                 <-- External WhatsApp (AOC) & Email services
└── frontend/
    └── finance/
        └── invoices/
            └── page.tsx          <-- Multi-Tenant Invoice Table with WhatsApp Send Action
```

---

## ⚙️ Included SaaS Features

1. **Multi-Tenant Database Isolation (`user_id`)**:
   - Query filters isolate tenant records so each company only accesses their own business data.

2. **Serialwise Invoice Generation**:
   - Strictly sequential invoice numbering (`INV-YYYYMM-XXXX`).

3. **Automated WhatsApp PDF & Notification Dispatch**:
   - Dispatches formatted WhatsApp messages & downloadable PDF links directly to customer mobile numbers.
