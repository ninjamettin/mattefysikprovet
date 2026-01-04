# Deploy to Netlify - Complete Guide

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Netlify account (free tier works fine)
- [ ] Your code pushed to a GitHub repository
- [ ] Supabase project configured

## 🚀 Method 1: Deploy via Netlify Dashboard (Recommended)

### Step 1: Push Your Code to GitHub

```powershell
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository

### Step 3: Configure Build Settings

In the Netlify deployment configuration screen:

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: (leave empty)

### Step 4: Add Environment Variables

Before deploying, add your environment variables:

1. Click on **"Add environment variables"** or **"Show advanced"**
2. Add the following variables:

```
VITE_SUPABASE_URL = https://sntidqkdiitigwnpsbzn.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudGlkcWtkaWl0aWd3bnBzYnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTg2NTksImV4cCI6MjA4MjMzNDY1OX0.iqaslT_KTD3rKDc4OjiiqrCIUDsrSDArkEWkA_a3JYM
VITE_REACT_APP_GOOGLE_CLIENT_ID = 392212819686-vp26ovtb26tujq01fqls0esk3b8j32a7.apps.googleusercontent.com
```

### Step 5: Deploy

Click **"Deploy site"** and wait for the build to complete (usually 2-3 minutes)

---

## 🔧 Method 2: Deploy via Netlify CLI

### Install Netlify CLI

```powershell
npm install -g netlify-cli
```

### Login to Netlify

```powershell
netlify login
```

### Initialize Your Site

```powershell
netlify init
```

Follow the prompts:
- Create & configure a new site? **Yes**
- Team: Select your team
- Site name: Enter a unique name
- Build command: `npm run build`
- Publish directory: `dist`

### Set Environment Variables

```powershell
netlify env:set VITE_SUPABASE_URL "https://sntidqkdiitigwnpsbzn.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudGlkcWtkaWl0aWd3bnBzYnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTg2NTksImV4cCI6MjA4MjMzNDY1OX0.iqaslT_KTD3rKDc4OjiiqrCIUDsrSDArkEWkA_a3JYM"
netlify env:set VITE_REACT_APP_GOOGLE_CLIENT_ID "392212819686-vp26ovtb26tujq01fqls0esk3b8j32a7.apps.googleusercontent.com"
```

### Deploy

```powershell
# Deploy to production
netlify deploy --prod
```

---

## 📝 Create netlify.toml Configuration

Create this file in your project root for automatic configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 🔐 Update Supabase Configuration

After deployment, you need to update your Supabase settings:

### 1. Get Your Netlify URL

After deployment, you'll get a URL like: `https://your-site-name.netlify.app`

### 2. Update Supabase Site URL

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Update **Site URL** to: `https://your-site-name.netlify.app`
3. Add **Redirect URLs**:
   - `https://your-site-name.netlify.app/dashboard`
   - `https://your-site-name.netlify.app/auth/callback`
   - `https://your-site-name.netlify.app/*` (wildcard for all routes)

### 3. Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add **Authorized redirect URIs**:
   - `https://sntidqkdiitigwnpsbzn.supabase.co/auth/v1/callback`
   - `https://your-site-name.netlify.app/auth/callback`

---

## ⚠️ Important Security Note

Your `.env.local` file should **NOT** be committed to Git. However, the variables need to be set in Netlify:

Add this to your `.gitignore` if not already there:
```
.env.local
.env*.local
```

---

## 🔄 Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build logs for debugging

---

## 🐛 Troubleshooting

### Build Fails with "command not found"

Make sure your `package.json` has the build script:
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

### Environment Variables Not Working

- Make sure variable names start with `VITE_`
- Redeploy after adding environment variables
- Check Netlify build logs for the values (they should be visible during build)

### 404 on Page Refresh

The `netlify.toml` file with redirects should fix this. If not:
1. Go to Netlify Dashboard → **Site settings** → **Build & deploy** → **Post processing**
2. Enable **Asset optimization** and **Pretty URLs**

### Supabase Auth Redirect Issues

- Verify Site URL and Redirect URLs in Supabase match your Netlify URL exactly
- Make sure Google OAuth redirect URIs are correct
- Check browser console for CORS errors

---

## 📊 Monitor Your Deployment

After deployment:
1. Check **Netlify Dashboard** → **Deploys** for build status
2. View **Functions logs** (if using serverless functions)
3. Monitor **Analytics** for traffic
4. Set up **Deploy notifications** in settings

---

## 🎯 Custom Domain (Optional)

### Add a Custom Domain:

1. In Netlify Dashboard → **Domain settings**
2. Click **Add custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Netlify will provide SSL certificate automatically

### Update Supabase URLs:

After adding custom domain, update all URLs in Supabase from `.netlify.app` to your custom domain.

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables set in Netlify
- [ ] Supabase Site URL updated
- [ ] Google OAuth redirect URIs configured
- [ ] netlify.toml file created
- [ ] .gitignore includes .env files
- [ ] Test all authentication flows
- [ ] Test all page routes work
- [ ] Check responsive design on mobile
- [ ] Verify PDFs load correctly
- [ ] Test exam submission to database

---

## 🚀 Quick Deploy Commands

```powershell
# Build locally to test
npm run build

# Preview build locally
npm run preview

# Deploy to Netlify (if using CLI)
netlify deploy --prod
```

---

## 📞 Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community Forum](https://answers.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
