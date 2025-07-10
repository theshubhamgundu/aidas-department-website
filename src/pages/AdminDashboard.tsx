import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, BookOpen, Calendar, Settings, LogOut, UserCheck, UserX, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import StudentManagement from '../components/StudentManagement';
import AddCourseModal from '../components/AddCourseModal';
import CreateTimetableModal from '../components/CreateTimetableModal';
import AttendanceUploadModal from '../components/AttendanceUploadModal';
import ExportDataModal from '../components/ExportDataModal';

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  semester: number;
  professor: string;
  description: string;
}

interface Timetable {
  id: number;
  year: string;
  section: string;
  batch: string;
  slots: any[];
}

interface Student {
  id: number;
  rollNumber: string;
  name: string;
  year: string;
  email: string;
  section: string;
  semester: string;
  cgpa: string;
  attendance: string;
  status: string;
  phone: string;
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'John Doe', 
      rollNumber: '21BCT003', 
      email: 'john@vit.ac.in', 
      year: '2nd Year', 
      section: 'A',
      semester: '3',
      cgpa: '8.2',
      attendance: '85%',
      status: 'pending',
      phone: '9876543210',
      address: 'Hyderabad, Telangana',
      parentName: 'John Father',
      parentPhone: '9876543211',
      dateOfBirth: '2003-05-15',
      bloodGroup: 'B+',
      category: 'OC',
      admissionDate: '2022-08-15',
      hostelDetails: 'Block A, Room 205',
      emergencyContact: '9876543212'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      rollNumber: '21BCT004', 
      email: 'jane@vit.ac.in', 
      year: '1st Year', 
      section: 'B',
      semester: '1',
      cgpa: '9.0',
      attendance: '92%',
      status: 'pending',
      phone: '9876543213',
      address: 'Warangal, Telangana',
      parentName: 'Jane Father',
      parentPhone: '9876543214',
      dateOfBirth: '2004-03-20',
      bloodGroup: 'A+',
      category: 'BC-A',
      admissionDate: '2023-08-15',
      hostelDetails: 'Block B, Room 102',
      emergencyContact: '9876543215'
    }
  ]);

  const [approvedStudents] = useState<Student[]>([
    { 
      id: 3, 
      name: 'Alice Johnson', 
      rollNumber: '21BCT001', 
      email: 'alice@vit.ac.in', 
      year: '3rd Year', 
      section: 'A',
      semester: '5',
      cgpa: '8.8',
      attendance: '90%',
      status: 'approved',
      phone: '9876543216',
      address: 'Rangareddy, Telangana',
      parentName: 'Alice Father',
      parentPhone: '9876543217',
      dateOfBirth: '2002-01-15',
      bloodGroup: 'B-',
      category: 'OC',
      admissionDate: '2021-08-15',
      hostelDetails: 'Block C, Room 302',
      emergencyContact: '9876543218'
    },
    { 
      id: 4, 
      name: 'Bob Wilson', 
      rollNumber: '21BCT002', 
      email: 'bob@vit.ac.in', 
      year: '2nd Year', 
      section: 'B',
      semester: '4',
      cgpa: '7.9',
      attendance: '88%',
      status: 'approved',
      phone: '9876543219',
      address: 'Karimnagar, Telangana',
      parentName: 'Bob Father',
      parentPhone: '9876543220',
      dateOfBirth: '2003-07-22',
      bloodGroup: 'A+',
      category: 'BC-B',
      admissionDate: '2022-08-15',
      hostelDetails: 'Block A, Room 315',
      emergencyContact: '9876543221'
    }
  ]);

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isCreateTimetableModalOpen, setIsCreateTimetableModalOpen] = useState(false);
  const [isAttendanceUploadModalOpen, setIsAttendanceUploadModalOpen] = useState(false);
  const [isExportDataModalOpen, setIsExportDataModalOpen] = useState(false);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Machine Learning', code: 'ML101', credits: 4, semester: 6, professor: 'Prof. Dr. Sharma', description: 'Introduction to Machine Learning concepts' },
    { id: 2, name: 'Data Structures & Algorithms', code: 'DSA201', credits: 4, semester: 3, professor: 'Prof. Dr. Patel', description: 'Fundamental data structures and algorithms' },
    { id: 3, name: 'Database Management', code: 'DBMS301', credits: 3, semester: 4, professor: 'Prof. Dr. Kumar', description: 'Database design and management' }
  ]);

  const [timetables, setTimetables] = useState<Timetable[]>([
    { id: 1, year: '2nd Year', section: 'A', batch: 'Morning', slots: [] },
    { id: 2, year: '3rd Year', section: 'A', batch: 'Morning', slots: [] }
  ]);

  const [allStudents, setAllStudents] = useState<Student[]>([
    ...pendingStudents,
    ...approvedStudents
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

  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    const course = {
      ...newCourse,
      id: Math.max(...courses.map(c => c.id), 0) + 1
    };
    setCourses([...courses, course]);
    console.log('Course added:', course);
  };

  const handleCreateTimetable = (newTimetable: Omit<Timetable, 'id'>) => {
    const timetable = {
      ...newTimetable,
      id: Math.max(...timetables.map(t => t.id), 0) + 1
    };
    setTimetables([...timetables, timetable]);
    console.log('Timetable created:', timetable);
  };

  const handleUploadAttendance = (attendanceData: any[]) => {
    console.log('Uploading attendance data:', attendanceData);
    
    // Update student attendance
    const updatedStudents = allStudents.map(student => {
      const attendanceRecord = attendanceData.find(record => 
        record.rollNumber.toUpperCase() === student.rollNumber.toUpperCase()
      );
      
      if (attendanceRecord) {
        return { ...student, attendance: attendanceRecord.attendance };
      }
      
      return student;
    });

    setAllStudents(updatedStudents);
    console.log('Students updated with new attendance:', updatedStudents.filter(s => 
      attendanceData.some(record => record.rollNumber.toUpperCase() === s.rollNumber.toUpperCase())
    ));
  };

  const handleBackupDatabase = () => {
    const data = {
      students: allStudents,
      courses: courses,
      timetables: timetables,
      exportDate: new Date().toISOString()
    };
    
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `database_backup_${new Date().toDateString().replace(/\s/g, '_')}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Database backup created successfully');
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
            <TabsTrigger value="timetables">Timetables</TabsTrigger>
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

      {/* Modals */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAdd={handleAddCourse}
      />

      <CreateTimetableModal
        isOpen={isCreateTimetableModalOpen}
        onClose={() => setIsCreateTimetableModalOpen(false)}
        onAdd={handleCreateTimetable}
      />

      <AttendanceUploadModal
        isOpen={isAttendanceUploadModalOpen}
        onClose={() => setIsAttendanceUploadModalOpen(false)}
        onUpload={handleUploadAttendance}
      />

      <ExportDataModal
        isOpen={isExportDataModalOpen}
        onClose={() => setIsExportDataModalOpen(false)}
        students={allStudents}
      />
    </div>
  );
};

export default AdminDashboard;
