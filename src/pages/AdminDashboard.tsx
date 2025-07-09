
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, BookOpen, Calendar, Settings, LogOut, UserCheck, UserX, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingStudents] = useState([
    { id: 1, name: 'John Doe', rollNumber: '21BCT003', email: 'john@vit.ac.in', year: '2nd Year', status: 'pending' },
    { id: 2, name: 'Jane Smith', rollNumber: '21BCT004', email: 'jane@vit.ac.in', year: '1st Year', status: 'pending' }
  ]);

  const [approvedStudents] = useState([
    { id: 3, name: 'Alice Johnson', rollNumber: '21BCT001', email: 'alice@vit.ac.in', year: '3rd Year', status: 'approved' },
    { id: 4, name: 'Bob Wilson', rollNumber: '21BCT002', email: 'bob@vit.ac.in', year: '2nd Year', status: 'approved' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');
    toast.success('Admin logged out successfully');
    navigate('/');
  };

  const handleApproveStudent = (studentId: number) => {
    toast.success('Student approved successfully');
    console.log('Approving student:', studentId);
  };

  const handleRejectStudent = (studentId: number) => {
    toast.error('Student registration rejected');
    console.log('Rejecting student:', studentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-600">AI & Data Science Department</p>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Stats Cards */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{approvedStudents.length + pendingStudents.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{approvedStudents.length}</div>
                  <p className="text-xs text-muted-foreground">Active students</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                  <UserX className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingStudents.length}</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </CardContent>
              </Card>
            </div>

            {/* Pending Approvals */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Pending Student Approvals</CardTitle>
                <CardDescription>Review and approve student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.rollNumber} • {student.email}</p>
                        <p className="text-xs text-gray-500">{student.year}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveStudent(student.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectStudent(student.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>Manage student accounts and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.rollNumber} • {student.email}</p>
                        <p className="text-xs text-gray-500">{student.year} • Status: {student.status}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage courses and academic content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Course management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Department Settings</CardTitle>
                <CardDescription>Configure department preferences and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
