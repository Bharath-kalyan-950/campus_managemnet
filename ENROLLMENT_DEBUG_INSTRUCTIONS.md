# 🔍 Enrollment Debug Instructions

## Issue
Student can't see courses when selecting slots in the enrollment page, even though courses exist in the database.

## What I Found
✅ **Database**: Has 2 courses in Slot B (CS302 and UBA0123)  
✅ **API Query**: Returns correct data when tested directly  
❌ **Frontend**: Not displaying the courses  

## Debug Steps

### 1. Check Browser Console
1. **Login** as student: `rajesh.kumar@simats.edu` / `password`
2. **Go to** Enrollment page
3. **Open browser console** (F12 → Console tab)
4. **Select Slot B** from dropdown
5. **Look for debug messages** like:
   ```
   🔍 Fetching courses from: /api/enrollment/slots?slot=B&student_id=STU2024002
   📊 Student ID: STU2024002
   📊 Selected Slot: B
   📡 API Response: {success: true, data: [...]}
   ✅ API Success - Found courses: 2
   ```

### 2. Expected Results
If working correctly, you should see:
- **Student ID**: STU2024002 (for Rajesh Kumar)
- **API Response**: 2 courses in Slot B
- **Courses displayed**: CS302 and UBA0123

### 3. Common Issues to Check

#### Issue A: Student ID not found
**Symptoms**: Console shows "No user found in localStorage"  
**Solution**: Login again or check if login is working

#### Issue B: API returns empty data
**Symptoms**: Console shows "Found courses: 0"  
**Solution**: Check if courses have faculty_id set

#### Issue C: API call fails
**Symptoms**: Console shows "Fetch Error" or 500 status  
**Solution**: Check server logs and database connection

### 4. Manual API Test
You can test the API directly in browser:
1. **Open new tab**
2. **Go to**: `http://localhost:3000/api/enrollment/slots?slot=B&student_id=STU2024002`
3. **Should return**:
   ```json
   {
     "success": true,
     "data": [
       {
         "course_code": "CS302",
         "course_name": "Database Management Systems",
         "slot": "B",
         "faculty_name": "Daniel Faculty",
         "available_slots": 33
       },
       {
         "course_code": "UBA0123", 
         "course_name": "ENGINEERING MATHEMATICS ll",
         "slot": "B",
         "faculty_name": "Daniel Faculty",
         "available_slots": 30
       }
     ]
   }
   ```

### 5. Database Verification
Courses that should appear in Slot B:
- **CS302**: Database Management Systems (35 capacity, 2 enrolled)
- **UBA0123**: ENGINEERING MATHEMATICS ll (30 capacity, 0 enrolled)

## Next Steps
1. **Check console logs** when selecting Slot B
2. **Report what you see** in the console
3. **Try the manual API test** in browser
4. **Test other slots** (A, C, D, E) to see if they work

## Quick Fix Attempts
If the issue persists, try:
1. **Refresh the page** and try again
2. **Clear browser cache** (Ctrl+F5)
3. **Try a different slot** (like Slot A or E)
4. **Login with different student** account

The debug messages I added will help identify exactly where the issue is occurring!