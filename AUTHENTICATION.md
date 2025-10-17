# Authentication System

## Features Implemented

### ✅ Authentication Methods
1. **Google Sign-In** - OAuth via Firebase
2. **Email/Password** - Native Firebase authentication
3. **Password Reset** - Email-based password recovery

### ✅ Pages & Routes
- `/auth` - Unified authentication page with:
  - Login form
  - Signup form
  - Forgot password form
  - Google OAuth button
  - Smooth transitions between modes

### ✅ Protected Routes
All learning routes now require authentication:
- `/goal-selection`
- `/skill-level-selection`
- `/subject-selection`
- `/ai-generated-roadmap`
- `/module-quiz-interface`
- `/profile`

Unauthenticated users are redirected to `/auth` with the intended destination stored.

### ✅ Data Persistence
- User data synced to Supabase on login/signup
- Progress automatically saved with user UID
- Session persists across page refreshes

## User Flow

```
Landing Page (/)
    ↓ [Click "Start Learning"]
Auth Page (/auth)
    ↓ [Login/Signup]
Goal Selection (/goal-selection)
    ↓
Skill Level Selection
    ↓
Subject Selection
    ↓
AI Generated Roadmap
    ↓
Module Quiz Interface
```

## Authentication Context

The `AuthContext` provides:

```javascript
const {
  user,              // Current Firebase user object
  loading,           // Auth loading state
  error,             // Auth error message
  loginWithGoogle,   // () => Promise<User>
  loginWithEmail,    // (email, password) => Promise<User>
  signupWithEmail,   // (email, password, name) => Promise<User>
  forgotPassword,    // (email) => Promise<void>
  logout             // () => Promise<void>
} = useAuth();
```

## How to Use

### In a Component

```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      {user && (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
```

### Creating Protected Routes

```javascript
<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

## Error Handling

The auth page displays user-friendly error messages for:
- Invalid credentials
- Weak passwords (< 6 characters)
- Mismatched passwords
- Email already in use
- Network errors
- Firebase errors

## Styling

The auth page matches your app's design:
- Dark theme with purple/pink gradients
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design

## Next Steps

To fully integrate authentication into your app:

1. **Update Navbar** - Add login/signup buttons when user is not logged in
2. **Add User Menu** - Show user avatar and logout option when logged in
3. **Save Progress** - Call `userService.saveProgress()` at key points
4. **Load Progress** - Restore user progress on login
5. **Profile Page** - Let users view/edit their profile

## Example: Saving Progress

```javascript
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

function LearningPage() {
  const { user } = useAuth();
  
  const saveMyProgress = async () => {
    if (!user) return;
    
    await userService.saveProgress(user.uid, {
      goal: 'JEE Preparation',
      skillLevel: 'intermediate',
      selectedSubjects: ['math', 'physics'],
      currentModule: 'algebra-basics',
      completedModules: ['intro'],
      quizScores: { intro: 85 }
    });
  };
  
  return <button onClick={saveMyProgress}>Save Progress</button>;
}
```

## Testing

To test authentication:

1. **Email/Password**
   - Sign up with a new email
   - Verify you can log in
   - Test password reset
   
2. **Google OAuth**
   - Click "Continue with Google"
   - Select your Google account
   - Verify redirect to goal-selection

3. **Protected Routes**
   - Try accessing `/goal-selection` without login
   - Should redirect to `/auth`
   - After login, should redirect back

4. **Session Persistence**
   - Log in
   - Refresh the page
   - Should remain logged in
