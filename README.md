# ♻️ Recliq Backoffice (Admin Dashboard)

This is the Recliq Backoffice, a web-based admin platform built with Next.js.
It enables authorized administrators to manage, monitor, and operate the Recliq ecosystem efficiently.

The backoffice serves as the control center for:

- Users
- Agents
- Recycling transactions
- Wallets & rewards
- Environmental impact data
- System configuration

## 🚀 Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the backoffice.

You can begin editing the dashboard by modifying:

`app/page.tsx`

The application supports hot reloading, so changes are reflected instantly during development.

## 🧩 Core Responsibilities of the Backoffice

Administrators can:

- 👤 Manage users (recyclers)
- 🧑‍🔧 Manage agents and agent verification
- ♻️ Monitor recycling pickups and drop-offs
- 💸 Track wallet balances, withdrawals, and transactions
- 🎁 Configure rewards, points, and benefits
- 🏅 Manage badges, streaks, and challenges
- 🌱 View environmental impact statistics (CO₂ saved, waste recycled)
- 🏦 Review and approve sensitive operations when required
- 📊 Access analytics and operational insights
- ⚙️ Manage system settings and configurations

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS / CSS Modules (configurable)
- **Fonts**: Google Fonts via next/font
- **Authentication**: Admin-only (role-based access)
- **API Integration**: Recliq Backend Services

## 🔐 Access Control

- Restricted to authorized admin users only
- Role-based permissions (Admin, Ops, Finance, Support)
- Secure session handling
- Audit-ready actions for critical operations

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## ☁️ Deployment

The Recliq Backoffice is optimized for deployment on Vercel.

To deploy:

1. Connect the repository to Vercel
2. Configure environment variables
3. Deploy with zero downtime

For more details, see:

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

## 🎯 Purpose

The Recliq Backoffice exists to ensure transparency, operational efficiency, and accountability across the entire recycling ecosystem — enabling Recliq to scale sustainably.
