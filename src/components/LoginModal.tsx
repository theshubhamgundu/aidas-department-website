
import React, { useState } from 'react';
import { X, User, Shield, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
}

export const LoginModal = ({ isOpen, onClose, type }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
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
    parentPhone: ''
  });

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'admin') {
      if (loginData.username === 'admin' && loginData.password === 'admin123') {
        toast.success('Admin login successful!');
        onClose();
        // Here you would typically set admin session and redirect
      } else {
        toast.error('Invalid admin credentials');
      }
    } else {
      // Student login logic - check if roll number exists and is approved
      const sampleStudents = ['21BCT001', '21BCT002'];
      if (sampleStudents.includes(loginData.username)) {
        toast.success('Student login successful!');
        onClose();
        // Here you would typically set student session and redirect to dashboard
      } else {
        toast.error('Invalid roll number or account not approved');
      }
    }
  };

  const handleStudentRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Student registration data:', studentData);
    toast.success('Registration submitted! Please wait for admin approval.');
    
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
      parentPhone: ''
    });
    setIsRegistering(false);
    onClose();
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
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  {type === 'admin' ? 'Username' : 'Roll Number'}
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleInputChange}
                  placeholder={type === 'admin' ? 'Enter admin username' : 'Enter your roll number'}
                  className="mt-1"
                  required
                />
              </div>

              {type === 'admin' && (
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
                      placeholder="Enter admin password"
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
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                {type === 'admin' ? 'Login as Admin' : 'Login as Student'}
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

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="font-medium text-blue-800 mb-2">Demo Credentials:</p>
                {type === 'admin' ? (
                  <div className="text-blue-700">
                    <p>Username: <code className="bg-blue-100 px-1 rounded">admin</code></p>
                    <p>Password: <code className="bg-blue-100 px-1 rounded">admin123</code></p>
                  </div>
                ) : (
                  <div className="text-blue-700">
                    <p>Approved Students: <code className="bg-blue-100 px-1 rounded">21BCT001</code>, <code className="bg-blue-100 px-1 rounded">21BCT002</code></p>
                    <p>Pending Approval: <code className="bg-blue-100 px-1 rounded">21BCT003</code></p>
                  </div>
                )}
              </div>
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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Submit Registration
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
