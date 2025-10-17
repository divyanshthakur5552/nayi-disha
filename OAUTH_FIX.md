# Firebase OAuth Redirect Loop Fix

## Problem
Firebase OAuth is redirecting to `nayi-disha-8.firebaseapp.com` instead of `localhost`, causing a redirect loop.

## Solution Steps

### 1. Add Localhost to Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `nayi-disha-8`
3. Navigate to: **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add: `localhost`
6. Save changes

### 2. Verify OAuth Redirect URIs in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: `nayi-disha-8`
3. Navigate to: **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID (used by Firebase)
5. Click to edit
6. Under **Authorized redirect URIs**, ensure these exist:
   - `http://localhost` (or your specific port like `http://localhost:5173`)
   - `https://nayi-disha-8.firebaseapp.com/__/auth/handler`
7. Add your local dev URL if missing:
   - `http://localhost:5173` (adjust port as needed)
8. Save changes

### 3. Clear Browser State & Test

```powershell
# Clear your browser cache and cookies for localhost
# Or use incognito mode
```

Then test the OAuth flow again.

## Additional Notes

- The code now dynamically uses `window.location.origin` for redirects
- If you're running on a different port (e.g., 5173, 3000), make sure to add that specific URL
- Changes in Google Cloud Console can take a few minutes to propagate

## Check Your Dev Server URL

Run this to see what URL your dev server is using:
```powershell
cd D:\Documents\Codes\nayi-disha
npm run dev
```

Look for the local URL (e.g., `http://localhost:5173`) and ensure that exact URL is authorized.
