# Function Hoisting Error Fix

## Issue
Runtime error occurred in both student and faculty layout components:
```
ReferenceError: Cannot access 'formatTimeAgo' before initialization
```

## Root Cause
The functions `formatTimeAgo` and `isRecentNotification` were being used in the `formattedClassroomNotifications` array before they were defined, causing a temporal dead zone error.

## Solution
Moved the helper functions before their usage:

### Before (Broken)
```typescript
// Format classroom notifications
const formattedClassroomNotifications = classroomNotifications.map(notif => ({
  id: notif.notification_id,
  title: notif.title,
  message: notif.message,
  time: formatTimeAgo(notif.created_at), // ❌ Used before definition
  unread: isRecentNotification(notif.created_at), // ❌ Used before definition
  type: 'classroom'
}));

// Functions defined AFTER usage
const formatTimeAgo = (dateString: string) => { ... };
const isRecentNotification = (dateString: string) => { ... };
```

### After (Fixed)
```typescript
// Helper functions - defined before use
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
  return `${Math.floor(diffInMinutes / 1440)} days ago`;
};

const isRecentNotification = (dateString: string) => {
  const date = new Date(dateString);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return date > oneDayAgo;
};

// Format classroom notifications - now functions are available
const formattedClassroomNotifications = classroomNotifications.map(notif => ({
  id: notif.notification_id,
  title: notif.title,
  message: notif.message,
  time: formatTimeAgo(notif.created_at), // ✅ Functions defined above
  unread: isRecentNotification(notif.created_at), // ✅ Functions defined above
  type: 'classroom'
}));
```

## Files Fixed
- `app/dashboard/student/layout.tsx`
- `app/dashboard/faculty/layout.tsx`

## Key Learning
In JavaScript/TypeScript, `const` and `let` declarations are not hoisted like `function` declarations. They exist in a "temporal dead zone" from the start of the block until the declaration is reached.

## Test Results
✅ All tests passing after fix:
- Student notifications: 4 found
- Faculty notifications: 8 found  
- Notification badges working correctly
- Auto-refresh functioning
- No runtime errors

## Status
✅ **FIXED** - Function hoisting error resolved, notification system fully functional