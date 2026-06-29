# Forgestack Labs Website

Official website for Forgestack Labs LLP, built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Notion.

The site includes public company and product pages, Notion-backed contact forms, and an internal certificate management workflow with public QR verification.

## Technology

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Notion API
- Lenis smooth scrolling

## Requirements

- Node.js 18.17 or newer
- npm
- A Notion integration and databases for production form storage

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from the example:

```bash
Copy-Item .env.example .env.local
```

3. Add your local environment values. Never commit `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NOTION_API_KEY` | Internal Notion integration token used by forms and certificate storage. |
| `NOTION_DATABASE_ID` | Database ID for contact and project enquiries. |
| `CERT_NOTION_DATABASE_ID` | Database ID for certificate records. |
| `ADMIN_CERT_USERS` | Comma-separated admin credentials in `email|password` format. |

Example:

```env
NOTION_API_KEY=
NOTION_DATABASE_ID=
CERT_NOTION_DATABASE_ID=
ADMIN_CERT_USERS=admin@example.com|replace-with-a-strong-password
```

For multiple administrators:

```env
ADMIN_CERT_USERS=first@example.com|password-one,second@example.com|password-two
```

Use strong production passwords and configure the same variables in the deployment platform.

## Notion Setup

Create an internal Notion integration, copy its token to `NOTION_API_KEY`, and connect the integration to both databases through the database's Connections menu.

### Contact Database

Set `NOTION_DATABASE_ID` to a database with these exact properties:

| Property | Type |
| --- | --- |
| `Name` | Title |
| `Email` | Email |
| `Phone` | Text |
| `Organization` | Text |
| `Message` | Text |
| `Source` | Select |
| `Status` | Select |
| `Priority` | Select |
| `Internal Notes` | Text |
| `Received At` | Date |

The API creates submissions with `Status` set to `New` and `Priority` set to `Normal`. The `Source` select must allow the values submitted by the website forms.

### Certificate Database

Set `CERT_NOTION_DATABASE_ID` to a database with these exact properties:

| Property | Type |
| --- | --- |
| `Name` | Title |
| `Serial` | Text |
| `Email` | Email |
| `Type` | Select |
| `Role` | Text |
| `Issued On` | Date |
| `Start Date` | Date |
| `End Date` | Date |
| `Notes` | Text |
| `Created At` | Date |

The `Type` select must include `Internship` and `Employment`.

When both `NOTION_API_KEY` and `CERT_NOTION_DATABASE_ID` are configured, certificates are stored in Notion. Otherwise, development falls back to `data/certificates.json`.

The JSON fallback is intentionally ignored by Git and is not durable on Vercel. Use Notion in production.

## Routes

### Public Pages

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/products` | Forgestack Fuel OS product page |
| `/about` | The Lab, company approach, and culture |
| `/careers` | Careers and future hiring tracks |
| `/resources` | Video, architecture deck, and engineering resources |
| `/contact` | Product demo, project brief, and support options |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/verify/[serial]` | Public certificate verification |

### Internal Page

| Route | Description |
| --- | --- |
| `/admin` | Admin login, certificate creation, serial generation, and QR output |

The admin route is intentionally absent from the public navigation. Access is controlled using `ADMIN_CERT_USERS`.

### API Routes

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/contact` | `POST` | Validates and stores website enquiries in Notion. |
| `/api/certificates` | `GET` | Returns certificate records for an authenticated admin. |
| `/api/certificates` | `POST` | Authenticates an admin or creates a certificate record. |
| `/api/certificates/[serial]` | `GET` | Returns a certificate by serial number. |

## Project Structure

```text
app/                    Next.js pages and API routes
components/             Shared navigation, footer, and visual components
lib/                    Notion and certificate data logic
public/                 Images, gallery slides, video, and site assets
styles/                 Global CSS
types/                 TypeScript declarations
```

## Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Run the production build
npm run lint      # Run Next.js ESLint checks
npx tsc --noEmit  # Run TypeScript checks
```

## Deployment

The project is suitable for Vercel or another Node.js-compatible Next.js host.

Before deployment:

1. Add all environment variables to the hosting platform.
2. Confirm both Notion databases are connected to the integration.
3. Run `npm run build`.
4. Test contact submissions, admin login, certificate creation, and public verification.
5. Confirm QR links use the production domain.

## Security Notes

- Never commit `.env.local` or Notion credentials.
- Rotate credentials immediately if a token or password is exposed.
- Keep `/admin` unlinked from public navigation.
- Treat certificate records and contact submissions as personal data.
- The current environment-based admin authentication is intended for a small internal team. Use a dedicated authentication provider if access requirements expand.

## License

Private and proprietary to Forgestack Labs LLP.

Copyright 2026 Forgestack Labs LLP. All rights reserved.


