# URGENT: Database Fixes Required

## Issues Found:
1. **Column name mismatch**: Database has `roll_number` but code expects `rollNumber`
2. **Infinite recursion in RLS policy**: Policy is incorrectly configured
3. **No admin user exists**: Need to create admin credentials

## Immediate Fixes Needed in Supabase:

### 1. Fix user_profiles table RLS policy
**Delete the existing problematic policy and create new ones:**

```sql
-- First, drop the existing policies that are causing recursion
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON user_profiles;

-- Create simple, safe policies
CREATE POLICY "Enable read for own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 2. Fix column name in user_profiles table
```sql
-- Update the column name to match the code
ALTER TABLE user_profiles 
RENAME COLUMN rollNumber TO roll_number;
```

### 3. Create Admin User
**Follow these steps:**

1. **First, create an admin account through the app's signup:**
   - Go to your app
   - Click "Sign Up" 
   - Use email: `admin@vit.ac.in`
   - Use password: `admin123` (change this later)
   - Use any verified roll number from the list for initial signup

2. **Then update the user profile to admin:**
```sql
-- Find the user ID first
SELECT id, email FROM auth.users WHERE email = 'admin@vit.ac.in';

-- Update their role to admin (replace 'user-id-here' with actual ID)
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = 'user-id-here';
```

### 4. Test Data - Insert some students
```sql
-- Add some test students
INSERT INTO students (roll_number, name, email, phone, year, section, semester, cgpa, attendance, status, address, parent_name, parent_phone, date_of_birth, blood_group, category, admission_date, hostel_details, emergency_contact) VALUES
('24891A7301', 'John Doe', 'john@vit.ac.in', '9876543210', '2nd Year', 'A', '3', '8.5', '85%', 'approved', '123 Main St, City', 'John Doe Sr', '9876543211', '2003-05-15', 'O+', 'OC', '2024-07-01', 'Hostel A, Room 101', '9876543212'),
('24891A7302', 'Jane Smith', 'jane@vit.ac.in', '9876543213', '2nd Year', 'A', '3', '9.0', '90%', 'pending', '456 Oak St, City', 'Jane Smith Sr', '9876543214', '2003-08-22', 'A+', 'BC-A', '2024-07-01', 'Hostel B, Room 205', '9876543215'),
('24891A7303', 'Mike Johnson', 'mike@vit.ac.in', '9876543216', '3rd Year', 'B', '5', '7.8', '80%', 'approved', '789 Pine St, City', 'Mike Johnson Sr', '9876543217', '2002-12-10', 'B+', 'OC', '2023-07-01', 'Hostel C, Room 303', '9876543218');
```

## Testing Steps:

1. Run all the SQL fixes above in your Supabase SQL editor
2. Try logging in with admin@vit.ac.in / admin123
3. You should see the admin dashboard with real student data
4. Try approving/rejecting pending students
5. Test real-time updates by opening multiple browser tabs

## Expected Results:
- ✅ No more infinite recursion errors
- ✅ Admin login works
- ✅ Student data appears in admin dashboard
- ✅ Real-time updates work between tabs
- ✅ Students can register and appear in pending list