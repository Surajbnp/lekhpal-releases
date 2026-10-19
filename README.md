# Lekhpal

**AI-powered business management for your shop, on your desktop.**

Lekhpal is an offline-first Windows desktop app for billing, inventory, GST, accounts and business insights. It is built for Indian pharmacy distributors and wholesalers, with batch and expiry tracking built in. Everything runs on your own computer, and the internet is only needed for optional cloud sync, licence renewal and the AI assistant.

[**Download for Windows**](https://github.com/Surajbnp/lekhpal-releases/releases/latest) · Windows 10/11 (64-bit)

---

## Features

| Area | What you get |
|---|---|
| **Billing (POS)** | Fast cash or credit sales, walk-in or saved customers, printable GST invoices with batch details |
| **Batch & expiry** | FEFO selling (earliest expiry first), expired batches blocked from sale, expiry alerts |
| **Purchases** | Supplier purchases with batch and expiry capture, automatic stock and cost updates |
| **Returns** | Sales and purchase returns against the original bill, restocking to the original batch |
| **Payments** | Customer receipts and supplier payments, outstanding balances |
| **Inventory** | Products, HSN, MRP, rates, GST %, minimum stock and low-stock status |
| **Accounts** | Automatic double-entry books, ledger, trial balance, profit & loss, manual journals with reversal |
| **GST returns** | GSTR-1 tables (B2B, B2C, HSN, credit notes), GSTR-3B style summary, JSON and CSV export |
| **Reports** | Sales by item, GST in and out, purchase totals by date range |
| **Assistant** | Local business insights, plus optional "Ask AI" using your own Anthropic API key |
| **Users & roles** | Admin, cashier and accountant, each limited to the screens they need |
| **Cloud sync** | Optional upload of your records to your own server, with safe retries |
| **Backup & restore** | Daily automatic backups (last 7 kept), manual backup and restore |
| **Productivity** | Keyboard shortcuts (F2 new sale, F3 returns, F4 purchase, and more) and a Ctrl+K command palette |

## Screenshots

Add your screenshots to a `docs/screenshots` folder and reference them here:

```md
![Dashboard](docs/screenshots/dashboard.png)
![Billing](docs/screenshots/billing.png)
```

## Tech stack

- **Desktop shell:** Electron 32
- **Interface:** Next.js 14 (static export) and React 18, plain CSS
- **Local database:** SQLite through `better-sqlite3`, with WAL mode and versioned migrations
- **Validation:** Zod
- **Cloud server (optional):** Express, Mongoose and MongoDB
- **Installer:** electron-builder (NSIS)

## Getting started (development)

**Requirements:** Node.js 20 or later and npm. Building the Windows installer needs a Windows machine.

```bash
npm install
npm run dev
```

This starts Next.js on `http://localhost:3000` and opens the Electron window.

On first run the app creates a sample database with demo data and these demo logins:

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Cashier | `cashier` | `cashier123` |
| Accountant | `accountant` | `account123` |

> **Change these passwords** under **Users** before using the app with real data.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Run the app in development |
| `npm run build` | Build the Next.js static export into `out/` |
| `npm start` | Run Electron against the built `out/` folder |
| `npm test` | Run the database, sync, accounting, licence and feature tests |
| `npm run dist` | Build the Windows installer into `dist/` |

## Building the installer

1. Put your icon at `electron/icon.ico` (a real `.ico` with a 256×256 image).
2. Run:

   ```bash
   npm run dist
   ```

3. The installer is created in `dist/`. Upload it to a GitHub release to share it.

## Project structure

```
app/            Next.js pages (billing, purchases, returns, GST, accounts, ...)
components/     Shared UI (shell, logo, forms, invoice print)
lib/            Renderer helpers (IPC client, shortcuts, brand)
electron/       Main process: IPC, database, business rules, sync, licence, tests
server/         Optional cloud server (Express + MongoDB) and licence tools
public/         Favicon and static assets
docs/           Architecture and operations notes
```

For the full design, including the IPC security model, sync rules and licensing, read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## How it works

- **Secure by design:** the interface has no direct access to Node or the database. It can only call a fixed list of channels through one preload bridge. The main process checks the session, the user's role and the licence before every action.
- **Always consistent:** each sale, purchase, payment or return is a single database transaction that updates the document, stock, party balance, journal entry and sync queue together.
- **Immutable records:** posted financial documents are never edited. Corrections are made through Returns or a journal reversal.
- **Offline first:** every change is saved locally first and queued for sync, so a lost connection never blocks billing.

## Cloud server (optional)

The server stores synced documents and issues licences.

```bash
cd server
npm install
cp .env.example .env
node --env-file=.env src/index.js
```

| Variable | Meaning |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default `4000`) |
| `ALLOW_REGISTER` | Set to `1` only while creating the first company, then remove it |
| `ADMIN_API_KEY` | Secret used to issue licences |
| `LICENCE_PRIVATE_KEY` or `LICENCE_PRIVATE_KEY_FILE` | Private key used to sign licences |

Then open **Cloud Sync** in the app and connect with the server URL, company ID, username and password.

> Sync is currently **upload only**. Records from one PC are stored on the server, but they are not merged back onto other PCs.

## Licensing

- Every install starts with a **30-day free trial**.
- Licences are signed with Ed25519 and verified offline.
- When a licence expires there is a grace period. After that the app becomes **read-only**: you can still view data, run reports and make backups, and nothing is deleted.
- Renew online from the **Licence** page, or offline with a request file that you send to the vendor.

**Before you ship:** generate your own key pair with `node server/tools/gen-keys.js`, replace `electron/licence-pub.pem` with the new public key, keep the private key only on your server or vendor machine, and delete `server/dev-keys/`.

## AI assistant

The **Assistant** page shows local insights without any setup. To use "Ask AI", an admin adds an Anthropic API key. The key is encrypted on the PC, and only summary numbers and a few names are sent, never full invoices or customer records.

## Backups

- An automatic backup runs daily and keeps the last 7 in the app's data folder.
- Use **Settings → Backup** for a manual copy, and **Restore** to load one. Restore keeps a `.pre-restore` copy of your current data first.

## Known limitations

- Multi-PC sync is not merged yet, so use one PC per company.
- GST exports are not validated against the GST portal. Reverse charge, e-invoice and e-way bill are not covered.
- Windows is the only supported platform.

## Support

Questions or issues? Contact the team at the email shown on the Lekhpal website.

---

Made with ♥ by SRJ
