import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import StudentProfileModal from './StudentProfileModal';
import AddStudentModal from './AddStudentModal';
import { useStudents } from '@/hooks/useStudents';

const StudentManagement = () => {
  const {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    approveStudent,
    rejectStudent,
    refetch,
  } = useStudents();

  const [filteredStudents, setFilteredStudents] = useState<typeof students>([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    let filtered = students;

    if (selectedYear !== 'all') {
      filtered = filtered.filter(student => student.year === selectedYear);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedYear, selectedStatus, searchTerm]);

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await deleteStudent(id);
    }
  };

  const handleApprove = async (id: string) => {
    await approveStudent(id);
  };

  const handleReject = async (id: string) => {
    await rejectStudent(id);
  };

  const handleUpdateStudent = async (updated: any) => {
    await updateStudent(updated.roll_number, updated);
    setIsProfileModalOpen(false);
  };

  const handleAddStudent = async (newStudent: any) => {
    await addStudent(newStudent);
    setIsAddModalOpen(false);
  };

  if (loading) {
    return <div className="text-center p-10 text-lg">Loading student data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Student Management
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search by name, email or roll number"
              className="w-full md:w-1/3"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.roll_number}>
                  <TableCell>{student.roll_number}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(student)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleApprove(student.roll_number)}>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleReject(student.roll_number)}>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(student.roll_number)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedStudent && isProfileModalOpen && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleUpdateStudent}
        />
      )}

      {isAddModalOpen && (
        <AddStudentModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddStudent}
        />
      )}
    </div>
  );
};

export default StudentManagement;
