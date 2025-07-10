
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

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

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

const ExportDataModal = ({ isOpen, onClose, students }: ExportDataModalProps) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'rollNumber', 'name', 'year', 'section', 'cgpa', 'attendance', 'status'
  ]);

  const availableFields = [
    { id: 'rollNumber', label: 'Roll Number' },
    { id: 'name', label: 'Name' },
    { id: 'year', label: 'Year' },
    { id: 'section', label: 'Section' },
    { id: 'semester', label: 'Semester' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'cgpa', label: 'CGPA' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'status', label: 'Status' },
    { id: 'address', label: 'Address' },
    { id: 'parentName', label: 'Parent Name' },
    { id: 'parentPhone', label: 'Parent Phone' },
    { id: 'dateOfBirth', label: 'Date of Birth' },
    { id: 'bloodGroup', label: 'Blood Group' },
    { id: 'category', label: 'Category' },
    { id: 'admissionDate', label: 'Admission Date' },
    { id: 'hostelDetails', label: 'Hostel Details' },
    { id: 'emergencyContact', label: 'Emergency Contact' }
  ];

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const getFilteredStudents = () => {
    let filtered = students;

    if (filterYear !== 'all') {
      filtered = filtered.filter(student => student.year === filterYear);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.status === filterStatus);
    }

    return filtered;
  };

  const exportToCsv = (data: Student[]) => {
    if (selectedFields.length === 0) {
      toast.error('Please select at least one field to export');
      return;
    }

    const headers = selectedFields.map(field => 
      availableFields.find(f => f.id === field)?.label || field
    );

    const csvContent = [
      headers.join(','),
      ...data.map(student => 
        selectedFields.map(field => {
          const value = student[field as keyof Student]?.toString() || '';
          // Escape commas and quotes in CSV
          return value.includes(',') || value.includes('"') 
            ? `"${value.replace(/"/g, '""')}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    downloadFile(csvContent, 'students_export.csv', 'text/csv');
  };

  const exportToJson = (data: Student[]) => {
    if (selectedFields.length === 0) {
      toast.error('Please select at least one field to export');
      return;
    }

    const jsonData = data.map(student => {
      const filteredStudent: any = {};
      selectedFields.forEach(field => {
        filteredStudent[field] = student[field as keyof Student];
      });
      return filteredStudent;
    });

    const jsonContent = JSON.stringify(jsonData, null, 2);
    downloadFile(jsonContent, 'students_export.json', 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const filteredData = getFilteredStudents();
    
    if (filteredData.length === 0) {
      toast.error('No students match the selected filters');
      return;
    }

    if (exportFormat === 'csv') {
      exportToCsv(filteredData);
    } else {
      exportToJson(filteredData);
    }

    toast.success(`Exported ${filteredData.length} student records`);
    onClose();
  };

  const filteredCount = getFilteredStudents().length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Student Data</DialogTitle>
          <DialogDescription>
            Export student data in various formats with customizable filters
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Export Format */}
          <div>
            <Label className="text-base font-medium">Export Format</Label>
            <div className="flex space-x-4 mt-2">
              <Button
                type="button"
                variant={exportFormat === 'csv' ? 'default' : 'outline'}
                onClick={() => setExportFormat('csv')}
                className="flex items-center space-x-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>CSV</span>
              </Button>
              <Button
                type="button"
                variant={exportFormat === 'json' ? 'default' : 'outline'}
                onClick={() => setExportFormat('json')}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>JSON</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filterYear">Filter by Year</Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filterStatus">Filter by Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <Label className="text-base font-medium">Select Fields to Export</Label>
            <div className="grid grid-cols-2 gap-3 mt-3 max-h-64 overflow-y-auto border rounded-lg p-4">
              {availableFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label htmlFor={field.id} className="text-sm cursor-pointer">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">
                {selectedFields.length} fields selected
              </span>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFields(availableFields.map(f => f.id))}
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFields([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Export Summary</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Format: {exportFormat.toUpperCase()}</li>
              <li>• Students to export: {filteredCount}</li>
              <li>• Fields: {selectedFields.length}</li>
              <li>• Filters: Year ({filterYear}), Status ({filterStatus})</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              disabled={selectedFields.length === 0 || filteredCount === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDataModal;
