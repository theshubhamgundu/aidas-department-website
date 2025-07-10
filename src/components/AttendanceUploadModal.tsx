
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceRecord {
  rollNumber: string;
  attendance: string;
  studentName?: string;
}

interface AttendanceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (attendanceData: AttendanceRecord[]) => void;
}

const AttendanceUploadModal = ({ isOpen, onClose, onUpload }: AttendanceUploadModalProps) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const data: AttendanceRecord[] = [];
        const newErrors: string[] = [];

        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const [rollNumber, attendance] = line.split(',').map(s => s.trim());
          
          if (!rollNumber || !attendance) {
            newErrors.push(`Line ${i + 1}: Missing roll number or attendance`);
            continue;
          }

          // Validate attendance percentage
          const attendanceNum = parseFloat(attendance.replace('%', ''));
          if (isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) {
            newErrors.push(`Line ${i + 1}: Invalid attendance percentage for ${rollNumber}`);
            continue;
          }

          data.push({
            rollNumber: rollNumber.toUpperCase(),
            attendance: attendance.includes('%') ? attendance : `${attendance}%`
          });
        }

        setAttendanceData(data);
        setErrors(newErrors);
        
        if (data.length === 0) {
          toast.error('No valid attendance data found in file');
        } else {
          toast.success(`Loaded ${data.length} attendance records`);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        toast.error('Error reading file. Please check file format.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (attendanceData.length === 0) {
      toast.error('No attendance data to upload');
      return;
    }

    onUpload(attendanceData);
    toast.success(`Updated attendance for ${attendanceData.length} students`);
    
    // Reset state
    setAttendanceData([]);
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const downloadTemplate = () => {
    const template = 'Roll Number,Attendance\n23891A7201,85%\n23891A7202,92%\n24891A7201,78%';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Attendance Data</DialogTitle>
          <DialogDescription>
            Upload an Excel or CSV file containing student roll numbers and attendance percentages
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="file">Select File (CSV or Excel)</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={downloadTemplate}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Click to upload file</p>
                <p className="text-sm text-gray-500">CSV or Excel files only</p>
              </Label>
            </div>

            {isProcessing && (
              <div className="text-center">
                <p className="text-sm text-gray-600">Processing file...</p>
              </div>
            )}
          </div>

          {/* File Format Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• First column: Roll Number (e.g., 23891A7201)</li>
              <li>• Second column: Attendance Percentage (e.g., 85% or 85)</li>
              <li>• Include header row: "Roll Number,Attendance"</li>
              <li>• Each row should contain one student's data</li>
            </ul>
          </div>

          {/* Errors Display */}
          {errors.length > 0 && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                <h4 className="font-medium text-red-900">Errors Found:</h4>
              </div>
              <ul className="text-sm text-red-800 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Data */}
          {attendanceData.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <h4 className="font-medium">Preview ({attendanceData.length} records)</h4>
              </div>
              
              <div className="border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.slice(0, 10).map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.rollNumber}</TableCell>
                        <TableCell>{record.attendance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {attendanceData.length > 10 && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing first 10 records. {attendanceData.length - 10} more records will be uploaded.
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={attendanceData.length === 0 || isProcessing}
            >
              <Upload className="w-4 h-4 mr-2" />
              Update Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceUploadModal;
