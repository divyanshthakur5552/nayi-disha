# Authentication & Storage Setup Guide

This guide will help you set up Firebase authentication and Supabase storage for the Nayi Disha application.

## Prerequisites

- Firebase account
- Supabase account

## Firebase Setup (Authentication)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, click on "Web" icon to add a web app
4. Register your app and copy the configuration

### 2. Enable Authentication Providers

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Google** provider:
   - Click on Google
   - Toggle "Enable"
   - Add your support email
   - Save
3. Enable **LinkedIn** provider:
   - Click on "Add new provider" > OpenID Connect
   - Name: `LinkedIn`
   - Client ID: Get from LinkedIn Developer Portal
   - Issuer: `https://www.linkedin.com/oauth`
   - Save

### 3. LinkedIn OAuth Setup

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. Add OAuth 2.0 redirect URLs:
   - `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Get your Client ID and Client Secret
5. Add Client ID to Firebase OpenID Connect settings

### 4. Add Firebase Config to Environment

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Supabase Setup (Data Storage)

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com/)
2. Click "New project"
3. Choose your organization and set up project details
4. Wait for project to be provisioned

### 2. Set Up Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Open the `supabase-schema.sql` file from this project
3. Copy and paste the entire SQL content
4. Click "Run" to create tables and policies

### 3. Add Supabase Config to Environment

Add your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

You can find these in **Project Settings** > **API** in Supabase Dashboard.

### 4. (Optional) Configure Row Level Security

The schema includes basic RLS policies. You may want to customize them based on your security requirements:

1. Go to **Authentication** > **Policies** in Supabase Dashboard
2. Review and modify policies for `users` and `user_progress` tables

## Usage in Your Application

### Authentication

```javascript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, loginWithGoogle, loginWithLinkedIn, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={loginWithGoogle}>Login with Google</button>
          <button onClick={loginWithLinkedIn}>Login with LinkedIn</button>
        </>
      )}
    </div>
  );
}
```

### Saving User Progress

```javascript
import { userService } from './services/userService';
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();

  const saveProgress = async () => {
    await userService.saveProgress(user.uid, {
      goal: 'JEE Preparation',
      skillLevel: 'intermediate',
      selectedSubjects: ['math', 'physics'],
      currentModule: 'algebra',
      completedModules: ['basics'],
      quizScores: { basics: 85 }
    });
  };

  const loadProgress = async () => {
    const progress = await userService.getProgress(user.uid);
    console.log(progress);
  };

  return (
    <div>
      <button onClick={saveProgress}>Save Progress</button>
      <button onClick={loadProgress}>Load Progress</button>
    </div>
  );
}
```

## Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `uid`: TEXT (Firebase UID, Unique)
- `email`: TEXT
- `display_name`: TEXT
- `photo_url`: TEXT
- `provider`: TEXT (google.com, oidc.linkedin, etc.)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### User Progress Table
- `id`: UUID (Primary Key)
- `user_uid`: TEXT (Foreign Key to users.uid)
- `goal`: TEXT
- `skill_level`: TEXT
- `selected_subjects`: JSONB
- `roadmap`: JSONB
- `current_module`: TEXT
- `completed_modules`: TEXT[]
- `quiz_scores`: JSONB
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## Protected Routes

All learning routes are now protected and require authentication:
- `/goal-selection`
- `/skill-level-selection`
- `/subject-selection`
- `/ai-generated-roadmap`
- `/module-quiz-interface`
- `/profile`

Users will be redirected to the landing page if they try to access these routes without being logged in.

## Troubleshooting

### Firebase Issues
- **Auth domain not authorized**: Add your domain to Firebase Console > Authentication > Settings > Authorized domains
- **Invalid API key**: Double-check your `.env` file

### Supabase Issues
- **RLS policy error**: Make sure RLS policies are set up correctly
- **Connection error**: Verify your Supabase URL and anon key

## Security Notes

1. Never commit your `.env` file to version control
2. Use environment variables for all sensitive credentials
3. Review and customize RLS policies based on your needs
4. Keep Firebase and Supabase dependencies updated
5. Monitor authentication logs in Firebase Console

## Next Steps

After setup is complete:
1. Test authentication flow with Google and LinkedIn
2. Verify user data is being synced to Supabase
3. Test progress saving and loading
4. Implement progress tracking in your learning modules
5. Add error handling for network failures
