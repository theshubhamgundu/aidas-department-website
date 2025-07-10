import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit, Trash2, Plus, User, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import StudentProfileModal from './StudentProfileModal';
import AddStudentModal from './AddStudentModal';

interface SemesterResult {
  semester: number;
  subjects: {
    name: string;
    credits: number;
    grade: string;
    marks: number;
  }[];
  sgpa: number;
  totalCredits: number;
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
  category: string;
  admissionDate: string;
  emergencyContact: string;
  semesterResults: SemesterResult[];
}

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with Supabase fetch later
    setStudents([]);
    setFilteredStudents([]);
    setLoading(false);
  }, []);

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
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedYear, selectedStatus, searchTerm]);

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleDeleteStudent = (studentId: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(s => s.id !== studentId);
      setStudents(updatedStudents);
      toast.success('Student deleted successfully');
    }
  };

  const handleApproveStudent = (studentId: number) => {
    const updatedStudents = students.map(s =>
      s.id === studentId ? { ...s, status: 'approved' } : s
    );
    setStudents(updatedStudents);
    toast.success('Student approved successfully');
  };

  const handleRejectStudent = (studentId: number) => {
    const updatedStudents = students.map(s =>
      s.id === studentId ? { ...s, status: 'rejected' } : s
    );
    setStudents(updatedStudents);
    toast.error('Student rejected');
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map(s =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    setStudents(updatedStudents);
    toast.success('Student updated successfully');
  };

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const student = {
      ...newStudent,
      id: Math.max(...students.map(s => s.id), 0) + 1
    };
    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    toast.success('Student added successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading student data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ...UI and modal structure remains unchanged (you already have this) */}
      {/* Don't forget to update `StudentProfileModal` and `AddStudentModal` components to remove these fields there too */}
    </div>
  );
};

export default StudentManagement;
