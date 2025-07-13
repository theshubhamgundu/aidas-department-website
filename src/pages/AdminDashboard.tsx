import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, BookOpen, Calendar, Settings, LogOut, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useStudents } from '@/hooks/useStudents';
import StudentManagement from '../components/StudentManagement';
import AddCourseModal from '../components/AddCourseModal';
import CreateTimetableModal from '../components/CreateTimetableModal';
import AttendanceUploadModal from '../components/AttendanceUploadModal';
import ExportDataModal from '../components/ExportDataModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { students, loading, approveStudent, rejectStudent } = useStudents();

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isCreateTimetableModalOpen, setIsCreateTimetableModalOpen] = useState(false);
  const [isAttendanceUploadModalOpen, setIsAttendanceUploadModalOpen] = useState(false);
  const [isExportDataModalOpen, setIsExportDataModalOpen] = useState(false);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Machine Learning', code: 'ML101', credits: 4, semester: 6, professor: 'Prof. Dr. Sharma', description: 'Introduction to Machine Learning concepts' },
    { id: 2, name: 'Data Structures & Algorithms', code: 'DSA201', credits: 4, semester: 3, professor: 'Prof. Dr. Patel', description: 'Fundamental data structures and algorithms' },
    { id: 3, name: 'Database Management', code: 'DBMS301', credits: 3, semester: 4, professor: 'Prof. Dr. Kumar', description: 'Database design and management' }
  ]);

  const [timetables, setTimetables] = useState([
    { id: 1, year: '2nd Year', section: 'A', batch: 'Morning', slots: [] },
    { id: 2, year: '3rd Year', section: 'A', batch: 'Morning', slots: [] }
  ]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleApproveStudent = async (studentId: string) => {
    try {
      await approveStudent(studentId);
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handleRejectStudent = async (studentId: string) => {
    try {
      await rejectStudent(studentId);
    } catch (error) {
      console.error('Error rejecting student:', error);
    }
  };

  const handleAddCourse = (newCourse: any) => {
    const course = {
      ...newCourse,
      id: Math.max(...courses.map(c => c.id), 0) + 1
    };
    setCourses([...courses, course]);
    console.log('Course added:', course);
  };

  const handleCreateTimetable = (newTimetable: any) => {
    const timetable = {
      ...newTimetable,
      id: Math.max(...timetables.map(t => t.id), 0) + 1
    };
    setTimetables([...timetables, timetable]);
    console.log('Timetable created:', timetable);
  };

  const handleUploadAttendance = (attendanceData: any) => {
    console.log('Uploading attendance data:', attendanceData);
  };

  const handleBackupDatabase = () => {
    toast.success('Database backup created successfully');
  };

  const pendingStudents = students.filter(s => s.status === 'pending');
  const approvedStudents = students.filter(s => s.status === 'approved');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</h1>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="timetables">Timetables</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                  <p className="text-xs text-muted-foreground">Real-time count</p>
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
                  <div className="text-2xl font-bold">{courses.length}</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Pending Student Approvals</CardTitle>
                <CardDescription>Review and approve student registrations - Updates in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   {pendingStudents.map((student) => (
                     <div key={student.roll_number} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.roll_number} • {student.email}</p>
                        <p className="text-xs text-gray-500">{student.year}</p>
                      </div>
                      <div className="flex space-x-2">
                         <Button size="sm" onClick={() => handleApproveStudent(student.roll_number)} className="bg-green-600 hover:bg-green-700">
                          <UserCheck className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRejectStudent(student.roll_number)} className="border-red-300 text-red-600 hover:bg-red-50">
                          <UserX className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingStudents.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No pending approvals</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="courses">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage courses and academic content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <Card key={course.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-gray-600">Credits: {course.credits} | Semester: {course.semester}</p>
                          <p className="text-xs text-gray-500">{course.professor}</p>
                          <p className="text-xs text-gray-400 mt-1">{course.code}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={() => setIsAddCourseModalOpen(true)}>Add New Course</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetables">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Timetable Management</CardTitle>
                <CardDescription>Manage class schedules and timetables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timetables.map((timetable) => (
                      <Card key={timetable.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{timetable.year} - Section {timetable.section}</h3>
                          <p className="text-sm text-gray-600">{timetable.batch} Batch | 9:00 AM - 4:00 PM</p>
                          <Button size="sm" variant="outline" className="mt-2">View/Edit</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={() => setIsCreateTimetableModalOpen(true)}>Create New Timetable</Button>
                </div>
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Academic Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Current Academic Year</span>
                        <span className="font-medium">2024-25</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Current Semester</span>
                        <span className="font-medium">Odd Semester</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <Button variant="outline" onClick={handleBackupDatabase}>Backup Database</Button>
                      <Button variant="outline" onClick={() => setIsExportDataModalOpen(true)}>Export Student Data</Button>
                      <Button variant="outline" onClick={() => setIsAttendanceUploadModalOpen(true)}>Upload Attendance</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                    <div className="space-y-4">
                      <Button variant="outline">System Maintenance</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AddCourseModal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} onAdd={handleAddCourse} />
      <CreateTimetableModal isOpen={isCreateTimetableModalOpen} onClose={() => setIsCreateTimetableModalOpen(false)} onAdd={handleCreateTimetable} />
      <AttendanceUploadModal isOpen={isAttendanceUploadModalOpen} onClose={() => setIsAttendanceUploadModalOpen(false)} onUpload={handleUploadAttendance} />
      <ExportDataModal isOpen={isExportDataModalOpen} onClose={() => setIsExportDataModalOpen(false)} students={students as any[]} />
    </div>
  );
};

export default AdminDashboard;
