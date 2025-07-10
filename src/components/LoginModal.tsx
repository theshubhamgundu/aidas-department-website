import React, { useState } from 'react';
import { X, User, Shield, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStudents } from '@/hooks/useStudents';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'student' | 'admin';
}

interface StudentFormData {
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  year: string;
  section: string;
  semester: string;
  address: string;
  parentName: string;
  parentPhone: string;
  dateOfBirth: string;
  bloodGroup: string;
  category: string;
  admissionDate: string;
  hostelDetails: string;
  emergencyContact: string;
}

export const LoginModal = ({ isOpen, onClose, type }: LoginModalProps) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { addStudent } = useStudents();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [studentData, setStudentData] = useState<StudentFormData>({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    year: '1st Year',
    section: 'A',
    semester: '1',
    address: '',
    parentName: '',
    parentPhone: '',
    dateOfBirth: '',
    bloodGroup: 'O+',
    category: 'OC',
    admissionDate: new Date().toISOString().split('T')[0],
    hostelDetails: '',
    emergencyContact: ''
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(loginData.email, loginData.password);
      onClose();
      
      // Navigate based on user role (will be handled by auth context)
      setTimeout(() => {
        if (type === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create auth account
      await signUp(studentData.email, 'student123', {
        name: studentData.name,
        roll_number: studentData.rollNumber
      });

      // Add student record to database
      await addStudent({
        roll_number: studentData.rollNumber,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        year: studentData.year,
        section: studentData.section,
        semester: studentData.semester,
        cgpa: '0.0',
        attendance: '0%',
        status: 'pending',
        address: studentData.address,
        parent_name: studentData.parentName,
        parent_phone: studentData.parentPhone,
        date_of_birth: studentData.dateOfBirth,
        blood_group: studentData.bloodGroup,
        category: studentData.category,
        admission_date: studentData.admissionDate,
        hostel_details: studentData.hostelDetails,
        emergency_contact: studentData.emergencyContact
      });
      
      // Reset form and close modal
      setStudentData({
        name: '',
        rollNumber: '',
        email: '',
        phone: '',
        year: '1st Year',
        section: 'A',
        semester: '1',
        address: '',
        parentName: '',
        parentPhone: '',
        dateOfBirth: '',
        bloodGroup: 'O+',
        category: 'OC',
        admissionDate: new Date().toISOString().split('T')[0],
        hostelDetails: '',
        emergencyContact: ''
      });
      setIsRegistering(false);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setStudentData(prev => ({ ...prev, [name]: value }));
    } else {
      setLoginData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              {type === 'admin' ? (
                <Shield className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {type === 'admin' ? 'Admin Login' : isRegistering ? 'Student Registration' : 'Student Login'}
              </h2>
              <p className="text-sm text-gray-600">
                {type === 'admin' 
                  ? 'Access administrative dashboard' 
                  : isRegistering 
                    ? 'Create your student profile'
                    : 'Access your student dashboard'
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === 'admin' || !isRegistering ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                {loading ? 'Signing in...' : (type === 'admin' ? 'Login as Admin' : 'Login as Student')}
              </Button>

              {type === 'student' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRegistering(true)}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create New Profile</span>
                  </Button>
                </div>
              )}
            </form>
          ) : (
            // Student Registration Form
            <form onSubmit={handleStudentRegistration} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700">Roll Number *</Label>
                  <Input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={studentData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 21BCT001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleInputChange}
                    placeholder="student@vit.ac.in"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={studentData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700">Year *</Label>
                  <select
                    id="year"
                    name="year"
                    value={studentData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="section" className="text-sm font-medium text-gray-700">Section *</Label>
                  <select
                    id="section"
                    name="section"
                    value={studentData.section}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="semester" className="text-sm font-medium text-gray-700">Semester *</Label>
                  <select
                    id="semester"
                    name="semester"
                    value={studentData.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem.toString()}>{sem}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={studentData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">Parent/Guardian Name *</Label>
                  <Input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={studentData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="parentPhone" className="text-sm font-medium text-gray-700">Parent Phone *</Label>
                  <Input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={studentData.parentPhone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistering(false)}
                  className="flex-1"
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {loading ? 'Registering...' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
