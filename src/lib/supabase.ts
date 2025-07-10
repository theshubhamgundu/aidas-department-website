
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Student {
  id: string;
  roll_number: string;
  name: string;
  email: string;
  phone: string;
  year: string;
  section: string;
  semester: string;
  cgpa: string;
  attendance: string;
  status: 'pending' | 'approved' | 'rejected';
  address: string;
  parent_name: string;
  parent_phone: string;
  date_of_birth: string;
  blood_group: string;
  category: string;
  admission_date: string;
  hostel_details: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
  professor: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  created_at: string;
}

export interface Research {
  id: string;
  title: string;
  description: string;
  author: string;
  publication_date: string;
  pdf_url?: string;
  created_at: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  president: string;
  contact_email: string;
  image_url?: string;
  created_at: string;
}

export interface Placement {
  id: string;
  company_name: string;
  role: string;
  package: string;
  student_name: string;
  year: string;
  placement_date: string;
  created_at: string;
}
