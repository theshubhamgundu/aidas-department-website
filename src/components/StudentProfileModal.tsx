
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, Plus, Trash2 } from 'lucide-react';

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
  dateOfBirth: string;
  bloodGroup: string;
  category: string;
  admissionDate: string;
  hostelDetails: string;
  emergencyContact: string;
  semesterResults: SemesterResult[];
}

interface StudentProfileModalProps {
  student: any;
  onClose: () => void;
  onSave: (student: any) => void;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Student>(student);

  const handleChange = (field: keyof Student, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const addNewSemester = () => {
    const newSemester: SemesterResult = {
      semester: formData.semesterResults.length + 1,
      sgpa: 0,
      totalCredits: 0,
      subjects: []
    };
    
    setFormData(prev => ({
      ...prev,
      semesterResults: [...prev.semesterResults, newSemester]
    }));
  };

  const addSubjectToSemester = (semesterIndex: number) => {
    const newSubject = {
      name: '',
      credits: 0,
      grade: '',
      marks: 0
    };

    setFormData(prev => ({
      ...prev,
      semesterResults: prev.semesterResults.map((sem, index) => 
        index === semesterIndex 
          ? { ...sem, subjects: [...sem.subjects, newSubject] }
          : sem
      )
    }));
  };

  const updateSemesterResult = (semesterIndex: number, field: keyof SemesterResult, value: any) => {
    setFormData(prev => ({
      ...prev,
      semesterResults: prev.semesterResults.map((sem, index) => 
        index === semesterIndex 
          ? { ...sem, [field]: value }
          : sem
      )
    }));
  };

  const updateSubject = (semesterIndex: number, subjectIndex: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      semesterResults: prev.semesterResults.map((sem, semIndex) => 
        semIndex === semesterIndex 
          ? {
              ...sem,
              subjects: sem.subjects.map((subject, subIndex) => 
                subIndex === subjectIndex 
                  ? { ...subject, [field]: value }
                  : subject
              )
            }
          : sem
      )
    }));
  };

  const deleteSubject = (semesterIndex: number, subjectIndex: number) => {
    setFormData(prev => ({
      ...prev,
      semesterResults: prev.semesterResults.map((sem, semIndex) => 
        semIndex === semesterIndex 
          ? {
              ...sem,
              subjects: sem.subjects.filter((_, subIndex) => subIndex !== subjectIndex)
            }
          : sem
      )
    }));
  };

  // Always render the modal when this component is called

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Profile - {formData.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic Info</TabsTrigger>
                <TabsTrigger value="results">Semester Results</TabsTrigger>
                <TabsTrigger value="contact">Contact & Other</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Roll Number</label>
                    <Input
                      value={formData.rollNumber}
                      onChange={(e) => handleChange('rollNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Blood Group</label>
                    <Select value={formData.bloodGroup || undefined} onValueChange={(value) => handleChange('bloodGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={formData.category || undefined} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OC">OC</SelectItem>
                        <SelectItem value="BC-A">BC-A</SelectItem>
                        <SelectItem value="BC-B">BC-B</SelectItem>
                        <SelectItem value="BC-C">BC-C</SelectItem>
                        <SelectItem value="BC-D">BC-D</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Admission Date</label>
                    <Input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => handleChange('admissionDate', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <Select value={formData.year || undefined} onValueChange={(value) => handleChange('year', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Section</label>
                    <Select value={formData.section || undefined} onValueChange={(value) => handleChange('section', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Semester</label>
                    <Select value={formData.semester || undefined} onValueChange={(value) => handleChange('semester', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                        <SelectItem value="4">Semester 4</SelectItem>
                        <SelectItem value="5">Semester 5</SelectItem>
                        <SelectItem value="6">Semester 6</SelectItem>
                        <SelectItem value="7">Semester 7</SelectItem>
                        <SelectItem value="8">Semester 8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Overall CGPA</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cgpa}
                      onChange={(e) => handleChange('cgpa', e.target.value)}
                      placeholder="e.g., 8.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Attendance %</label>
                    <Input
                      value={formData.attendance}
                      onChange={(e) => handleChange('attendance', e.target.value)}
                      placeholder="e.g., 85%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select value={formData.status || undefined} onValueChange={(value) => handleChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Semester Results</h3>
                  <Button onClick={addNewSemester} className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Semester</span>
                  </Button>
                </div>

                {formData.semesterResults.map((semester, semesterIndex) => (
                  <Card key={semesterIndex}>
                    <CardHeader>
                      <CardTitle className="text-base">Semester {semester.semester}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">SGPA</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={semester.sgpa}
                            onChange={(e) => updateSemesterResult(semesterIndex, 'sgpa', parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Total Credits</label>
                          <Input
                            type="number"
                            value={semester.totalCredits}
                            onChange={(e) => updateSemesterResult(semesterIndex, 'totalCredits', parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Subjects</h4>
                          <Button 
                            size="sm" 
                            onClick={() => addSubjectToSemester(semesterIndex)}
                            className="flex items-center space-x-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Subject</span>
                          </Button>
                        </div>

                        {semester.subjects.length > 0 && (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Subject Name</TableHead>
                                <TableHead>Credits</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {semester.subjects.map((subject, subjectIndex) => (
                                <TableRow key={subjectIndex}>
                                  <TableCell>
                                    <Input
                                      value={subject.name}
                                      onChange={(e) => updateSubject(semesterIndex, subjectIndex, 'name', e.target.value)}
                                      placeholder="Subject name"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      value={subject.credits}
                                      onChange={(e) => updateSubject(semesterIndex, subjectIndex, 'credits', parseInt(e.target.value))}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      value={subject.marks}
                                      onChange={(e) => updateSubject(semesterIndex, subjectIndex, 'marks', parseInt(e.target.value))}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      value={subject.grade}
                                      onChange={(e) => updateSubject(semesterIndex, subjectIndex, 'grade', e.target.value)}
                                      placeholder="A+, A, B+, etc."
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => deleteSubject(semesterIndex, subjectIndex)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                      <Input
                        value={formData.emergencyContact}
                        onChange={(e) => handleChange('emergencyContact', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Hostel Details</label>
                      <Input
                        value={formData.hostelDetails}
                        onChange={(e) => handleChange('hostelDetails', e.target.value)}
                        placeholder="Block, Room or Day Scholar"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Parent/Guardian Name</label>
                      <Input
                        value={formData.parentName}
                        onChange={(e) => handleChange('parentName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Parent/Guardian Phone</label>
                      <Input
                        value={formData.parentPhone}
                        onChange={(e) => handleChange('parentPhone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfileModal;
