# FORGESTACK LABS - Website

A sophisticated, founder-led technology studio website built with Next.js 14+, featuring glassmorphic design, advanced animations, and Notion integration for contact management.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=flat-square&logo=tailwindcss)

---

## ðŸŒŸ Features

- âœ¨ **Stunning Intro Animation** - 5.5s particle-based animation with letter-by-letter reveal
- ðŸŽ¨ **Glassmorphic Design** - Frosted glass cards with backdrop blur effects
- ðŸŒŠ **Animated Backgrounds** - Floating particles, gradient orbs, and mesh gradients
- ðŸ“± **Fully Responsive** - Mobile-first design that works on all devices
- ðŸŽ­ **Framer Motion Animations** - Smooth scroll-triggered and hover animations
- ðŸ“ **Notion Integration** - Contact form submissions sent directly to Notion database
- ðŸŽ¯ **Active Navigation States** - Highlights current page with gradient underline
- â™¿ **Accessibility Ready** - Semantic HTML and ARIA-friendly structure
- âš¡ **Performance Optimized** - Server components and optimized font loading

---

## ðŸš€ Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Notion account (for contact form integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/forgestacklabs/forgestacklabs-site.git
   cd Company-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NOTION_API_KEY=your_notion_integration_key
   NOTION_DATABASE_ID=your_database_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ðŸ”§ Configuration

### Notion Setup

#### 1. Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Give it a name (e.g., "Forgestack Contact Form")
4. Select your workspace
5. Copy the **Internal Integration Token** â†’ This is your `NOTION_API_KEY`

#### 2. Create a Database

1. In Notion, create a new database with these properties:

   | Property Name | Type | Required |
   |---------------|------|----------|
   | Name | Title | Yes |
   | Email | Email | Yes |
   | Phone | Text | No |
   | Organization | Text | No |
   | Message | Text | Yes |
   | Source | Select | No |
   | Status | Select | No |
   | Priority | Select | No |
   | Internal Notes | Text | No |
   | Received At | Date | No |

2. Add these select options:
   - **Source**: Website, Referral, Other
   - **Status**: New, In Progress, Completed
   - **Priority**: Low, Normal, High

3. Share the database with your integration:
   - Click **"Share"** on the database
   - Invite your integration
   - Give it **Edit** permissions

4. Copy the database ID from the URL:
   ```
   https://notion.so/xxxxx?v=yyyy
                    ^^^^^ This is your DATABASE_ID
   ```

#### 3. Update Environment Variables

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ðŸ“ Project Structure

```
Company-site/
â”œâ”€â”€ app/                          # Next.js App Router
â”‚   â”œâ”€â”€ about/
â”‚   â”‚   â””â”€â”€ page.tsx             # About page
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â””â”€â”€ contact/
â”‚   â”‚       â””â”€â”€ route.ts         # Contact form API endpoint
â”‚   â”œâ”€â”€ contact/
â”‚   â”‚   â””â”€â”€ page.tsx             # Contact page
â”‚   â”œâ”€â”€ principles/
â”‚   â”‚   â””â”€â”€ page.tsx             # Approach/Principles page
â”‚   â”œâ”€â”€ privacy/
â”‚   â”‚   â””â”€â”€ page.tsx             # Privacy Policy page
â”‚   â”œâ”€â”€ technology/
â”‚   â”‚   â””â”€â”€ page.tsx             # Technology Stack page
â”‚   â”œâ”€â”€ terms/
â”‚   â”‚   â””â”€â”€ page.tsx             # Terms of Service page
â”‚   â”œâ”€â”€ layout.tsx               # Root layout with metadata
â”‚   â””â”€â”€ page.tsx                 # Home page
â”‚
â”œâ”€â”€ components/                   # Reusable components
â”‚   â”œâ”€â”€ BackgroundField.tsx      # Animated background effects
â”‚   â”œâ”€â”€ Footer.tsx               # Site footer
â”‚   â”œâ”€â”€ Navigation.tsx           # Navigation header
â”‚   â””â”€â”€ ReloadRedirect.tsx       # Redirect on reload utility
â”‚
â”œâ”€â”€ lib/                          # Utility libraries
â”‚   â””â”€â”€ notion.ts                # Notion API configuration
â”‚
â”œâ”€â”€ styles/                       # Global styles
â”‚   â””â”€â”€ globals.css              # Tailwind directives and global CSS
â”‚
â”œâ”€â”€ public/                       # Static assets
â”‚
â”œâ”€â”€ .env.local                    # Environment variables (create this)
â”œâ”€â”€ .eslintrc.json               # ESLint configuration
â”œâ”€â”€ next-env.d.ts
â”œâ”€â”€ next.config.js               # Next.js configuration
â”œâ”€â”€ package-lock.json
â”œâ”€â”€ package.json                 # Dependencies and scripts
â”œâ”€â”€ postcss.config.js
â”œâ”€â”€ tailwind.config.ts           # Tailwind CSS configuration
â”œâ”€â”€ tsconfig.json                # TypeScript configuration
â””â”€â”€ README.md                    # This file
```

---

## ðŸŽ¨ Design System

### Colors

```typescript
const colors = {
  // Background
  ink: '#0a0a0f',           // Primary background
  obsidian: '#0d0d14',      // Secondary background
  
  // Text
  white: '#FFFFFF',         // Primary text
  offWhite: '#e8e8f0',      // Secondary text
  muted: '#9d9db8',         // Body text
  
  // Accents
  accent: '#818cf8',        // Indigo
  accentPurple: '#a78bfa',  // Purple
  accentPink: '#c084fc',    // Pink
}
```

### Typography

```typescript
// Font: Inter (Google Font)
const typography = {
  logo: '14px, uppercase, tracking-[0.4em], weight-400',
  navigation: '12px, uppercase, tracking-[0.3em], weight-300',
  h1: '96px, weight-100, tracking-[-0.03em]',
  h2: '60px, weight-300, tracking-[-0.02em]',
  body: '16px, weight-300, line-height-1.75',
}
```

### Spacing

```typescript
// Based on 4px unit
const spacing = {
  xs: '12px',   // 3 units
  sm: '16px',   // 4 units
  md: '24px',   // 6 units
  lg: '32px',   // 8 units
  xl: '48px',   // 12 units
  '2xl': '64px',  // 16 units
  '3xl': '96px',  // 24 units
  '4xl': '128px', // 32 units
}
```

### Glassmorphic Card

```typescript
// Standard card style used throughout
const cardStyle = {
  background: 'linear-gradient(to-br, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  backdropFilter: 'blur(24px)',
  padding: '32px',
  
  hover: {
    border: '1px solid rgba(255,255,255,0.15)',
    transform: 'translateY(-8px)',
    transition: 'all 700ms ease',
  }
}
```

---

## ðŸ› ï¸ Built With

### Core Technologies

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[React 18+](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Libraries

- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Notion SDK](https://developers.notion.com/)** - Notion API integration
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

---

## ðŸ“œ Available Scripts

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier (if configured)

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

---

## ðŸŒ Pages

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with intro animation |
| Technology | `/technology` | Tech stack and engineering principles |
| Approach | `/principles` | Company philosophy and core values |
| About | `/about` | Company info and leadership team |
| Contact | `/contact` | Contact form with Notion integration |
| Privacy Policy | `/privacy` | Privacy policy and data handling |
| Terms of Service | `/terms` | Terms and conditions |

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form to Notion |

---

## ðŸŽ¯ Key Features Explained

### 1. Intro Animation

The home page features a sophisticated 5.5-second intro animation with:
- 100 floating particles
- 20 connecting SVG lines
- 5 glowing orbs
- Letter-by-letter text reveal
- Animated progress bar

**Location:** `app/page.tsx`

### 2. Glassmorphic Design

Cards throughout the site use a frosted glass effect:
- Semi-transparent background (3% white opacity)
- Backdrop blur filter (24px)
- Subtle border (8% white opacity)
- Hover effects with glow

**Location:** All page components

### 3. Active Navigation

Navigation automatically highlights the current page:
- Detects current route with `usePathname()`
- Applies gradient underline to active link
- Smooth hover transitions

**Location:** `components/Navigation.tsx`

### 4. Contact Form Integration

Form submissions are sent to Notion:
- Client-side validation
- API route handling
- Notion database creation
- Success/error states

**Locations:** 
- Form: `app/contact/page.tsx`
- API: `app/api/contact/route.ts`
- Config: `lib/notion.ts`

### 5. Performance Optimizations

- Server Components by default
- Font optimization with `next/font`
- Lazy loading for heavy animations
- Optimized image loading (when used)

---

## âš¡ Performance Optimization

### Current Performance Issues

The site currently has some performance bottlenecks:

1. **Too many animated particles** (100+ on home page)
2. **Heavy blur effects** taxing GPU
3. **Long intro animation** (5.5s) blocks interaction
4. **All client-side rendering** (no SSR benefits)

### Recommended Fixes

See `PERFORMANCE_FIXES.md` for detailed optimization guide:

**Quick wins:**
```typescript
// 1. Reduce particles
{[...Array(20)].map((_, i) => (  // Was 100

// 2. Shorten intro
const timer = setTimeout(() => setShowIntro(false), 2500); // Was 5500

// 3. Add performance hints
style={{ willChange: 'transform', transform: 'translateZ(0)' }}

// 4. Reduce blur
className="blur-xl"  // Instead of blur-[140px]
```

**Expected improvements:**
- 50% faster initial load
- 60fps smooth animations (currently ~30fps)
- 64% faster time to interactive

---

## ðŸ› Troubleshooting

### Common Issues

#### 1. Notion Integration Not Working

**Error:** Contact form returns 500 error

**Solutions:**
```bash
# Check environment variables are set
echo $NOTION_API_KEY
echo $NOTION_DATABASE_ID

# Verify Notion integration has database access
# Check database properties match schema
# Confirm API key is valid
```

#### 2. Build Errors

**Error:** Type errors or missing dependencies

**Solutions:**
```bash
# Delete build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### 3. Animations Not Smooth

**Error:** Choppy animations or low FPS

**Solutions:**
- Reduce particle count (see Performance section)
- Add `will-change` CSS property
- Enable hardware acceleration
- Test on different browsers/devices

#### 4. Environment Variables Not Loading

**Error:** `undefined` when accessing `process.env.*`

**Solutions:**
```bash
# Ensure file is named .env.local (not .env)
# Restart development server after adding variables
# Check variables are prefixed correctly
# Don't commit .env.local to git (it's in .gitignore)
```

---

## ðŸ“ License

This project is private and proprietary to Forgestack Labs LLP.

**Copyright Â© 2026 Forgestack Labs LLP. All rights reserved.**

---

## ðŸ‘¥ Team

**Forgestack Labs LLP** - Founder-led Technology Studio

- **CEO** - Sriharsha
- **COO** - Pulavarson  
- **CTO** - Hardhik

**Incorporated:** January 14, 2026  
**Location:** India

---

## ðŸ“ž Contact

**Email:** hello@forgestacklabs.com  
**Website:** https://forgestacklabs.com

For questions about this codebase, please use the contact form on the website.


---

## ðŸ¤ Contributing

This is a private project. If you're a team member:

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   ```bash
   # Follow the existing code style
   # Add TypeScript types
   # Test thoroughly
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

### Code Standards

- Use TypeScript for all new code
- Follow existing component structure
- Add comments for complex logic
- Use Tailwind classes (avoid custom CSS)
- Test on multiple screen sizes
- Ensure accessibility

### Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
perf: Performance improvement
test: Add tests
chore: Maintenance tasks
```

---

**Built with â¤ï¸ by Forgestack Labs**

*When Vision Meets Precision*

