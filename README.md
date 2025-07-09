# 🚀 Job Application Tracker

A beautiful, secure job application tracking system built with Next.js, Supabase, and Tailwind CSS. Keep track of your job applications, manage follow-ups, and monitor your job search progress with style.

![Job Application Tracker](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop)

## ✨ Features

- **🔐 Secure Authentication**: Sign up, sign in, and password reset functionality
- **👤 User Profiles**: Personal accounts with secure data isolation
- **📝 Job Management**: Add, edit, and delete job applications
- **🔍 Advanced Search & Filtering**: Search by company, position, location, or email
- **📊 Beautiful Dashboard**: Visual stats and progress tracking
- **📅 Follow-up Reminders**: Never miss an important follow-up
- **💾 Cloud Storage**: Powered by Supabase for reliable data persistence
- **🔒 Row Level Security**: Your data is private and secure
- **📱 Responsive Design**: Works perfectly on all devices
- **🎨 Modern UI**: Clean, aesthetic design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `scripts/create-tables.sql` to create the database tables and set up Row Level Security

### 4. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL (for development: `http://localhost:3000`)
3. Enable email confirmations if desired
4. Optionally configure social providers (Google, GitHub, etc.)

### 5. Configure Environment Variables

1. Copy the environment template:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Fill in your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

You can find these values in your Supabase project settings under "API".

### 6. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔐 Authentication Features

### Sign Up
- Create a new account with email and password
- Email confirmation (configurable)
- Automatic profile creation

### Sign In
- Secure email/password authentication
- Password reset functionality
- Remember me functionality

### Security
- Row Level Security (RLS) ensures users can only access their own data
- Secure session management
- Password hashing handled by Supabase

## 📖 Usage Guide

### Getting Started
1. Sign up for a new account or sign in to an existing one
2. Your dashboard will be empty initially - start by adding your first job application

### Adding a Job Application
1. Click the "Add Job" button in the top right
2. Fill in the job details:
   - Company Name (required)
   - Position Title (required)
   - Location (optional)
   - Email Used (optional)
   - Date Applied
   - Source (LinkedIn, Indeed, etc.)
   - Status (Wishlist, Applied, Interview, Offer, Rejected, Archived)
   - Follow-up Date (optional)
   - Notes (optional)

### Managing Applications
- **Search**: Use the search bar to find applications by company, position, location, or email
- **Filter**: Filter applications by status
- **Sort**: Click column headers to sort by date, company, or position
- **Edit**: Click the menu button (⋯) next to any application to edit or delete

### Follow-up Reminders
The dashboard will highlight applications that need follow-up within the next 7 days. Applications with overdue follow-ups are shown in red, while upcoming ones are shown in yellow.

### User Profile
- Click on your avatar in the top right to access user menu
- Sign out securely when done

## 🔒 Security & Privacy

- **Row Level Security**: Each user can only access their own job applications
- **Secure Authentication**: Passwords are hashed and never stored in plain text
- **Session Management**: Secure session handling with automatic expiration
- **Data Isolation**: Complete separation of user data
- **HTTPS**: All data transmission is encrypted

## 🎨 Customization

### Changing Colors
The application uses a custom color palette defined in `tailwind.config.js`. You can modify the colors by updating the `extend.colors` section.

### Adding New Status Types
1. Update the `JobStatus` type in `lib/types.ts`
2. Add the new status to the database CHECK constraint in `scripts/create-tables.sql`
3. Update the status color mappings in the components

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # shadcn/ui components
│   ├── add-job-dialog.tsx
│   ├── edit-job-dialog.tsx
│   ├── job-list.tsx
│   └── user-menu.tsx
├── lib/                   # Utilities and configurations
│   ├── auth-context.tsx  # Authentication context
│   ├── job-store.ts      # Zustand store
│   ├── supabase.ts       # Supabase client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── scripts/              # Database scripts
│   └── create-tables.sql # Database schema with RLS
└── public/               # Static assets
\`\`\`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Update your Supabase site URL to your production domain
5. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add your environment variables in the Netlify dashboard
4. Update your Supabase site URL to your production domain

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure and authentication
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for job seekers everywhere
