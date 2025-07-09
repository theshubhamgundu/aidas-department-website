
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookOpen, Calendar, Award, LogOut, Bell } from 'lucide-react';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Student Dashboard
                </h1>
                <p className="text-xs text-gray-600">Welcome back, {currentUser.name || currentUser.rollNumber}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>My Profile</span>
              </CardTitle>
              <CardDescription>View and manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Roll Number:</strong> {currentUser.rollNumber}</p>
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Year:</strong> {currentUser.year}</p>
                <p><strong>Section:</strong> {currentUser.section}</p>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Courses Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span>My Courses</span>
              </CardTitle>
              <CardDescription>Access your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded border">
                  <p className="font-medium text-sm">Machine Learning</p>
                  <p className="text-xs text-gray-600">Prof. Smith</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border">
                  <p className="font-medium text-sm">Data Structures</p>
                  <p className="text-xs text-gray-600">Prof. Johnson</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Courses
              </Button>
            </CardContent>
          </Card>

          {/* Attendance Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>Attendance</span>
              </CardTitle>
              <CardDescription>Track your attendance record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Overall</span>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="text-sm font-medium text-blue-600">92%</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>

          {/* Grades Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Grades</span>
              </CardTitle>
              <CardDescription>View your academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Current CGPA</span>
                  <span className="text-sm font-medium text-green-600">8.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Semester GPA</span>
                  <span className="text-sm font-medium text-blue-600">8.8</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Transcript
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-red-600" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Recent updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-red-50 rounded border">
                  <p className="text-xs font-medium">Assignment Due</p>
                  <p className="text-xs text-gray-600">ML Project - Due Tomorrow</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border">
                  <p className="text-xs font-medium">New Material</p>
                  <p className="text-xs text-gray-600">Lecture notes uploaded</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline" size="sm">
                  Download Timetable
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  Library Access
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  Fee Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
