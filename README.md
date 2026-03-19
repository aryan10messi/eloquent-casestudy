# Eloquent AI — Reference Interface Implementation

A pixel-accurate replication of the Eloquent Case Study dashboard, built as part of the Agent Deployment Manager take-home assessment.

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

## Project Overview

The application is a two-page client entity dashboard:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | KPI sidebar + paginated client table |
| `/user/:id` | Detail | Editable entity view with segment, financial overrides |

### Key Features

- **Sidebar KPIs** — Avg Customer LTV, Enterprise Revenue Share, and Churn Risk, all computed live from underlying transaction data.
- **Dynamic pagination** — Table rows per page adjusts automatically based on viewport height.
- **Editable detail view** — Click any row to open its detail page. The Financial Overview section supports inline editing of Lifetime Value, Transaction Count, and Last Activity.
- **Cross-page consistency** — Edits saved on the detail page are immediately reflected in the dashboard KPIs and table when navigating back.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Icons | Lucide React |
| Fonts | Inter, Poppins (Google Fonts) |

## Project Structure

```
src/
├── main.tsx                  # Entry point
├── App.tsx                   # Router + providers
├── index.css                 # Tailwind import
├── data/
│   ├── users.ts              # 15 hardcoded client entities
│   ├── transactions.ts       # Deterministic seeded transaction generator
│   └── formulas.ts           # KPI + per-user metric calculations
├── context/
│   └── DataContext.tsx        # Shared state provider (users, transactions, updateUser)
├── components/
│   ├── Layout.tsx             # Sidebar + main content wrapper
│   ├── Sidebar.tsx            # KPI cards (desktop fixed + mobile scroll)
│   ├── KPICard.tsx            # Individual metric card
│   ├── Card.tsx               # Reusable card container
│   ├── Button.tsx             # Styled button with loading state
│   └── Footer.tsx             # Eloquent AI branding
└── pages/
    ├── Dashboard.tsx          # Dashboard page
    ├── ClientTable.tsx        # Table with dynamic pagination
    └── UserDetail.tsx         # Detail / edit page
```

## Build for Production

```bash
npm run build
```

Output is written to `dist/`. Serve it with any static file server or deploy directly to Vercel, Netlify, or similar.
