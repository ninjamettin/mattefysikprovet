# Supabase Authentication Setup Guide

## ✅ What's Already Done

Your authentication system is now connected to Supabase! The code has been updated to:

1. ✅ Use Supabase Auth for login/registration
2. ✅ Automatically create profiles in the `profiles` table
3. ✅ Track `last_login` timestamp
4. ✅ Handle Google OAuth (requires setup below)
5. ✅ Handle email/password authentication

## 🔧 Required Setup in Supabase Dashboard

### Step 1: Enable Email Authentication

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers**
4. Make sure **Email** is enabled

### Step 2: Configure Google OAuth (Optional but Recommended)

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Enable Google provider
4. You need to add your Google OAuth credentials:
   - **Client ID**: `392212819686-vp26ovtb26tujq01fqls0esk3b8j32a7.apps.googleusercontent.com` (from your .env.local)
   - **Client Secret**: You need to get this from Google Cloud Console

#### Get Google Client Secret:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or the one where you created the OAuth client)
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Copy the **Client Secret**
6. Paste it in Supabase Google provider settings

#### Add Authorized Redirect URIs:

In Google Cloud Console, add these redirect URIs to your OAuth client:
```
https://sntidqkdiitigwnpsbzn.supabase.co/auth/v1/callback
http://localhost:5173/auth/callback (for local development)
```

### Step 3: Configure Site URL

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:5173` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:5173/dashboard`
   - `http://localhost:5173/auth/callback`

For production, update these to your actual domain.

## 📝 How to Test

### Test Email/Password Login:

1. First, create a test user:
   ```javascript
   // In browser console or create a signup page
   import { supabase } from './lib/supabaseClient'
   
   await supabase.auth.signUp({
     email: 'test@example.com',
     password: 'testpassword123'
   })
   ```

2. Check your email for verification link (if email confirmation is enabled)

3. Try logging in with those credentials

### Test Google OAuth:

1. Click "Fortsätt med Google" button
2. Select your Google account
3. You'll be redirected back to /dashboard

## 🔍 Verify Database Integration

After logging in, check your Supabase database:

1. Go to **Table Editor** → **profiles**
2. You should see a new row with:
   - `id`: User's UUID (matches auth.users.id)
   - `email`: User's email
   - `last_login`: Timestamp of last login

## 🚨 Troubleshooting

### "Invalid login credentials" error
- Make sure the user exists in Supabase Auth
- Check if email confirmation is required (Authentication → Settings)

### Google OAuth not working
- Verify Client ID and Secret are correct
- Check redirect URIs are properly configured
- Make sure Google provider is enabled in Supabase

### Profile not created automatically
- Check the trigger is working: `on_auth_user_created` in Database → Triggers
- The trigger should automatically insert into profiles table
- Verify RLS policies allow inserts

## 📋 User Object Structure

After login, `user` object contains:
```javascript
{
  id: "uuid-here",
  email: "user@example.com",
  user_metadata: {
    picture: "url-to-profile-pic" // if using Google
  },
  // ... other Supabase user properties
}
```

## 🔐 Row Level Security (RLS)

The following RLS policies are active:

- **profiles**: Users can only view/update their own profile
- **exams**: All authenticated users can read exams
- **user_exam_attempts**: Users can only view/insert their own attempts
- **user_statistics**: Users can only view/update/insert their own stats
- **practice_progress**: Users can only view/update/insert their own progress

## 🎯 Next Steps

1. Enable email provider in Supabase
2. Configure Google OAuth (optional)
3. Test login with email/password
4. Test Google OAuth (if configured)
5. Verify profile creation in database
6. Create a signup page for new users

## 💡 Creating a Signup Feature

You can add a signup page using:
```javascript
const { signUpWithEmail } = useAuth();

const handleSignup = async (email, password) => {
  try {
    await signUpWithEmail(email, password);
    // User will receive verification email
    // Or be logged in directly (based on your Supabase settings)
  } catch (error) {
    console.error('Signup error:', error);
  }
};
```
