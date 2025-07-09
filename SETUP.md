# 🚀 Complete Setup Guide for Job Application Tracker

This guide will walk you through setting up the Job Application Tracker with your Supabase project.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (you already have this!)

## 🔧 Step-by-Step Setup

### 1. Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd job-application-tracker

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

3. **Run the Database Script**: Copy and paste the entire content from `scripts/create-tables.sql` and click "Run"

   This will create:
   - `jobs` table with Row Level Security
   - `profiles` table for user information
   - Security policies to protect user data
   - Triggers for automatic profile creation

### 4. Authentication Configuration

1. **Go to Authentication Settings**: 
   - Navigate to Authentication > Settings in your Supabase dashboard

2. **Configure Site URL**:
   - Set Site URL to: `http://localhost:3000` (for development)
   - For production, update this to your deployed URL

3. **Email Settings** (Optional):
   - Configure email templates if you want custom emails
   - Enable/disable email confirmations as needed

4. **Social Providers** (Optional):
   - You can enable Google, GitHub, etc. later if desired

### 5. Test the Setup

\`\`\`bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Visit http://localhost:3000 and you should see:
- ✅ Beautiful landing page with authentication
- ✅ Sign up/Sign in forms
- ✅ No console errors

### 6. Create Your First Account

1. Click "Sign up" on the landing page
2. Fill in your details:
   - Full Name: Your Name
   - Email: your-email@example.com
   - Password: (at least 6 characters)
3. Sign up and start using the app!

## 🔍 Verification Checklist

After setup, verify these work:

- [ ] App loads without errors
- [ ] Sign up creates a new account
- [ ] Sign in works with created account
- [ ] Dashboard shows after login
- [ ] Can add a job application
- [ ] Job applications are saved and displayed
- [ ] Sign out works properly
- [ ] Data is private (create second account to test)

## 🚀 Production Deployment

### For Vercel:

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**:
   - Connect your GitHub repo to Vercel
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`: `https://uzhtumuzysycntyiahnm.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aHR1bXV6eXN5Y250eWlhaG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDQ0NjUsImV4cCI6MjA2NzU4MDQ2NX0.UoeWWPqEY2Pd4JlBXrelGOOZb3PX9LCO6O1viUAlEuw`

3. **Update Supabase Site URL**:
   - Go to Authentication > Settings in Supabase
   - Update Site URL to your Vercel domain (e.g., `https://your-app.vercel.app`)

## 🔒 Security Notes

- ✅ Your anon key is safe to use in frontend code
- ✅ Row Level Security protects user data
- ✅ All authentication is handled securely by Supabase
- ✅ Passwords are never stored in plain text

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Double-check your environment variables
   - Restart the development server after changing .env.local

2. **Database connection issues**:
   - Ensure you've run the SQL script in Supabase
   - Check that your project URL is correct

3. **Authentication not working**:
   - Verify Site URL in Supabase Auth settings
   - Check browser console for errors

4. **Can't see other users' data** (This is correct!):
   - Row Level Security ensures data privacy
   - Each user only sees their own job applications

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all environment variables are correct
3. Ensure the database script ran successfully
4. Check Supabase logs in the dashboard

## 🎉 You're All Set!

Your Job Application Tracker is now ready to use with:
- ✅ Secure multi-user authentication
- ✅ Private data for each user
- ✅ Beautiful, responsive design
- ✅ Full job application management
- ✅ Follow-up reminders
- ✅ Advanced search and filtering

Happy job hunting! 🚀
\`\`\`

Let me also create a quick verification script to test the connection:
