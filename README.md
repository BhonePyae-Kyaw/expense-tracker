# 💰 Expense Tracker

A modern, full-stack expense tracking application built with Next.js 16, featuring secure authentication, real-time data management, and beautiful visualizations to help you take control of your finances.

![Landing Page](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Expense+Tracker+Landing+Page)

## ✨ Features

### 🔐 Authentication & Security

- **Multi-Provider Authentication**: Sign in with GitHub, Google, or use Demo Account
- **Secure Sessions**: JWT-based session management with NextAuth.js
- **Demo Account**: Pre-populated with 3 months of realistic expense data for testing

### 💸 Expense Management

- **Full CRUD Operations**: Create, read, update, and delete expenses effortlessly
- **Smart Categorization**: 12 predefined categories (Food, Transportation, Shopping, etc.)
- **Rich Details**: Track amount, date, category, and notes for each expense
- **Real-time Updates**: Instant reflection of changes across the application

### 📊 Analytics & Insights

- **Visual Charts**: Beautiful pie charts showing expense breakdown by category
- **Period Filtering**: View expenses by Today, Last 7 Days, Last 30 Days, Last 3 Months, or All Time
- **Custom Date Ranges**: Filter expenses between specific dates
- **Category Filtering**: Focus on specific expense categories
- **Search Functionality**: Quick search across expense descriptions
- **Total Calculations**: Automatic summation of expenses in selected period

### 📱 User Experience

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Sortable Tables**: Sort expenses by date or category
- **Pagination**: View 10 expenses per page with smart navigation
- **User Dropdown**: Easy access to account info and sign out
- **Conditional Navigation**: Smart navbar that adapts to context
- **Landing Page**: Professional marketing page with feature showcase

## 🖼️ Screenshots

### Landing Page

![Landing Page Desktop](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Landing+Page+Desktop)
![Landing Page Mobile](https://via.placeholder.com/400x800/3B82F6/FFFFFF?text=Landing+Page+Mobile)

### Sign In

![Sign In Desktop](https://via.placeholder.com/1200x600/6366F1/FFFFFF?text=Sign+In+Page+Desktop)
![Sign In Mobile](https://via.placeholder.com/400x800/6366F1/FFFFFF?text=Sign+In+Page+Mobile)

### Dashboard

![Dashboard Desktop](https://via.placeholder.com/1200x600/10B981/FFFFFF?text=Dashboard+Desktop)
![Dashboard Mobile](https://via.placeholder.com/400x800/10B981/FFFFFF?text=Dashboard+Mobile)

### Expense List

![Expense List Desktop](https://via.placeholder.com/1200x600/F59E0B/FFFFFF?text=Expense+List+Desktop)
![Expense List Mobile](https://via.placeholder.com/400x800/F59E0B/FFFFFF?text=Expense+List+Mobile)

### Analytics

![Analytics Desktop](https://via.placeholder.com/1200x600/8B5CF6/FFFFFF?text=Analytics+Desktop)
![Analytics Mobile](https://via.placeholder.com/400x800/8B5CF6/FFFFFF?text=Analytics+Mobile)

## 🏗️ Architecture

### Application Structure

```
expense-tracker/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth configuration
│   │   └── expenses/               # Expense CRUD endpoints
│   ├── components/
│   │   ├── expense/                # Expense-related components
│   │   ├── ConditionalNavMenu.tsx  # Smart navigation
│   │   ├── NavMenu.tsx             # User menu dropdown
│   │   └── SessionProvider.tsx     # Auth session wrapper
│   ├── expense/
│   │   ├── ExpenseClient.tsx       # Main expense orchestrator
│   │   └── page.tsx                # Expense page server component
│   ├── auth/signin/                # Sign-in page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Global styles
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Category seed data
│   └── seed-demo.ts                # Demo account seed (130+ expenses)
└── lib/
    ├── auth.ts                     # Auth utilities
    └── prisma.ts                   # Prisma client
```

### Component Architecture

```
ExpenseClient (State Management)
├── ExpenseHeader (Title & New Expense Button)
├── PeriodSelector (Time Period Filters)
├── DateRangeSelector (Custom Date Range)
├── ExpenseFilters (Category & Search)
├── ExpenseSummaryCard (Total Amount Display)
├── ExpenseCategoryChart (Pie Chart Visualization)
├── ExpenseTable (Sortable Data Table)
│   └── Pagination Controls
├── ExpenseCreateModal (New Expense Form)
└── ExpenseEditModal (Edit Expense Form)
```

### Data Flow

1. **Server Components** fetch initial data from PostgreSQL via Prisma
2. **Client Components** manage state and user interactions
3. **API Routes** handle CRUD operations and database mutations
4. **Real-time Updates** reflect changes immediately in the UI

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16.0.4](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development
- **UI Library**: [React 19.2.0](https://react.dev/) - Modern React with hooks
- **Styling**: [Tailwind CSS 4.1.17](https://tailwindcss.com/) - Utility-first CSS
- **Fonts**: [Geist Sans & Geist Mono](https://vercel.com/font) - Modern font family

### Backend

- **Authentication**: [NextAuth.js 4.24.13](https://next-auth.js.org/) - Flexible authentication
  - GitHub OAuth Provider
  - Google OAuth Provider
  - Credentials Provider (Demo)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/)
- **ORM**: [Prisma 7.0.1](https://www.prisma.io/) - Type-safe database client
- **Database Adapter**: [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql)

### Development Tools

- **Linting**: [ESLint 9](https://eslint.org/) with Next.js config
- **Package Manager**: npm
- **Runtime**: [Node.js 20+](https://nodejs.org/)

### Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  expenses      Expense[]
}

model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  expenses Expense[]
}

model Expense {
  id          Int      @id @default(autoincrement())
  amount      Float
  description String
  date        DateTime @default(now())
  userId      String
  categoryId  Int
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  category    Category @relation(fields: [categoryId], references: [id])
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or cloud)
- GitHub OAuth App credentials (optional)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/BhonePyae-Kyaw/expense-tracker.git
cd expense-tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# GitHub OAuth (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed categories (required)
npx prisma db seed

# Seed demo account (optional)
npm run seed:demo
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Account

After running `npm run seed:demo`, you can sign in with:

- **Option**: Click "Try Demo Account" on the sign-in page
- **Data**: 130+ expenses across 3 months (September - November)
- **Categories**: All 12 categories with realistic spending patterns

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**

   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Database Setup**

   - Use [Neon](https://neon.tech/) for serverless PostgreSQL
   - Or [Supabase](https://supabase.com/) for managed PostgreSQL
   - Update `DATABASE_URL` in Vercel environment variables

4. **Post-Deployment**
   - Run migrations: `npx prisma migrate deploy`
   - Seed data via Vercel CLI or dashboard

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-new-secret-for-production"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
GOOGLE_CLIENT_ID="your-google-oauth-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-secret"
```

### Alternative Deployment Options

- **Netlify**: Compatible with Next.js
- **Railway**: Easy PostgreSQL + Next.js deployment
- **DigitalOcean**: App Platform supports Next.js
- **Self-hosted**: Use Docker or traditional VPS

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Create and apply migrations
npx prisma studio    # Open Prisma Studio (GUI)
npm run seed:demo    # Seed demo account data

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Bhone Pyae Kyaw**

- GitHub: [@BhonePyae-Kyaw](https://github.com/BhonePyae-Kyaw)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Prisma for the excellent ORM
- NextAuth.js for authentication
- Tailwind CSS for styling utilities

---

Built with ❤️ using Next.js and Prisma
