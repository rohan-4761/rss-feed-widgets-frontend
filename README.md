# My Next.js App

A modern [Next.js](https://nextjs.org/) application built with TypeScript, featuring multiple pages and a clean component structure.

## Project Structure

```
my-next-app/
├── src/
│   ├── app/                    # App Router directory (Next.js 13+)
│   │   ├── about/              # About page route
│   │   ├── contact/            # Contact page route
│   │   ├── services/           # Services page route
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page
│   │   └── page.module.css     # Page-specific styles
│   ├── components/             # Reusable React components
│   │   └── navbar.tsx          # Navigation component
│   ├── constants/              # Application constants
│   ├── css/                    # Stylesheets for pages and components
│   │   ├── components/         # Component-specific styles
│   │   ├── pages/              # Page-specific styles
│   │   └── common.css          # Shared styles across the app
│   ├── hooks/                  # Custom React hooks
│   └── utils/                  # Utility functions
│       └── utils.js            # Helper utilities
├── public/                     # Static assets
│   ├── next.svg               # Next.js logo
│   └── vercel.svg             # Vercel logo
├── .next/                      # Build output (auto-generated)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.mjs            # Next.js configuration
└── yarn.lock                  # Dependency lock file
```

### Key Directories

- **`src/app/`** - Uses Next.js App Router for file-based routing, keep code minimal in these pages
- **`src/components/`** - Shared UI components across the application
- **`src/utils/`** - Helper functions and utilities
- **`public/`** - Static files served directly by the web server, eg. png, svg
- **`src/css/`** - Centralized styles for pages and components

## Getting Started

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Edit `src/app/page.tsx` to modify the home page - changes auto-reload.

## Features

- **App Router** - Next.js 13+ routing system
- **TypeScript** - Type-safe development
- **Custom Components** - Modular UI architecture
- **Multiple Pages** - About, Contact, and Services routes

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) - see [deployment docs](https://nextjs.org/docs/deployment) for details.
