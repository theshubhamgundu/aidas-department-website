# Supabase Database Setup Guide

## Required Tables for College Management System

After connecting to Supabase, you'll need to create the following tables and enable Row Level Security (RLS).

### 1. Students Table
```sql
-- Create students table
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  roll_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  year VARCHAR(20),
  section VARCHAR(10),
  semester VARCHAR(10),
  cgpa VARCHAR(10),
  attendance VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pending',
  address TEXT,
  parent_name VARCHAR(100),
  parent_phone VARCHAR(20),
  date_of_birth DATE,
  blood_group VARCHAR(10),
  category VARCHAR(20),
  admission_date DATE,
  hostel_details TEXT,
  emergency_contact VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations for authenticated users" ON students
  FOR ALL USING (auth.role() = 'authenticated');
```

### 2. User Profiles Table
```sql
-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  rollNumber VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert for authenticated users" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 3. Verified Students Table (for registration validation)
```sql
-- Create verified students table
CREATE TABLE verified_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  roll_number VARCHAR(20) UNIQUE NOT NULL,
  student_name VARCHAR(100) NOT NULL,
  year VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE verified_students ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to verified students" ON verified_students
  FOR SELECT USING (true);

-- Insert sample verified students
INSERT INTO verified_students (roll_number, student_name, year, email) VALUES
('24891A7301', 'John Doe', '2nd Year', 'john@vit.ac.in'),
('24891A7302', 'Jane Smith', '2nd Year', 'jane@vit.ac.in'),
('24891A7303', 'Mike Johnson', '3rd Year', 'mike@vit.ac.in'),
('24891A7304', 'Sarah Wilson', '3rd Year', 'sarah@vit.ac.in'),
('24891A7305', 'David Brown', '4th Year', 'david@vit.ac.in');
```

### 4. Additional Content Tables

#### Gallery Table
```sql
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Events Table
```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(200),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON events
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Research Table
```sql
CREATE TABLE research (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  author VARCHAR(200) NOT NULL,
  publication_date DATE,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE research ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON research
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Clubs Table
```sql
CREATE TABLE clubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  president VARCHAR(200),
  contact_email VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON clubs
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Placements Table
```sql
CREATE TABLE placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  role VARCHAR(200) NOT NULL,
  package VARCHAR(50),
  student_name VARCHAR(200) NOT NULL,
  year VARCHAR(20),
  placement_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON placements
  FOR ALL USING (auth.role() = 'authenticated');
```

#### Courses Table
```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  credits INTEGER NOT NULL,
  semester INTEGER NOT NULL,
  professor VARCHAR(200),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON courses
  FOR ALL USING (auth.role() = 'authenticated');
```

## Admin Setup

### Create Admin User Profile
After setting up the tables, create an admin user profile:

```sql
-- First, sign up an admin user through the auth system, then insert their profile
INSERT INTO user_profiles (id, email, role) VALUES 
('your-admin-user-id', 'admin@vit.ac.in', 'admin');
```

## Environment Variables Required

Make sure these are set in your Supabase secrets:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public key

## Testing the Setup

1. Try registering as a student using one of the verified roll numbers
2. Login as admin to approve/reject student registrations
3. Test real-time updates by opening multiple browser tabs
4. Verify that students can only see their own data while admins can see all data

## Troubleshooting

- If you get RLS policy errors, ensure all policies are created correctly
- Check that the `verified_students` table has the test data
- Verify that the admin user has the correct role in `user_profiles`
- Make sure all environment variables are set correctly