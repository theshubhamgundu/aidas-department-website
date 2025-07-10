
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  professor: string;
  room: string;
}

interface Timetable {
  id: number;
  year: string;
  section: string;
  batch: string;
  slots: TimeSlot[];
}

interface CreateTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (timetable: Omit<Timetable, 'id'>) => void;
}

const CreateTimetableModal = ({ isOpen, onClose, onAdd }: CreateTimetableModalProps) => {
  const [formData, setFormData] = useState({
    year: '',
    section: '',
    batch: 'Morning'
  });

  const [slots, setSlots] = useState<TimeSlot[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: 'Monday',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      subject: '',
      professor: '',
      room: ''
    };
    setSlots([...slots, newSlot]);
  };

  const removeTimeSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const updateSlot = (id: string, field: keyof TimeSlot, value: string) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.year || !formData.section || slots.length === 0) {
      toast.error('Please fill in all required fields and add at least one time slot');
      return;
    }

    const timetable = {
      ...formData,
      slots
    };

    onAdd(timetable);
    toast.success('Timetable created successfully');
    
    // Reset form
    setFormData({ year: '', section: '', batch: 'Morning' });
    setSlots([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Timetable</DialogTitle>
          <DialogDescription>
            Create a new class timetable for students
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="year">Year *</Label>
              <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
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
              <Label htmlFor="section">Section *</Label>
              <Select value={formData.section} onValueChange={(value) => setFormData(prev => ({ ...prev, section: value }))}>
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
              <Label htmlFor="batch">Batch</Label>
              <Select value={formData.batch} onValueChange={(value) => setFormData(prev => ({ ...prev, batch: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning Batch</SelectItem>
                  <SelectItem value="Afternoon">Afternoon Batch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Time Slots</h3>
              <Button type="button" onClick={addTimeSlot} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Time Slot
              </Button>
            </div>

            {slots.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slots.map((slot) => (
                      <TableRow key={slot.id}>
                        <TableCell>
                          <Select value={slot.day} onValueChange={(value) => updateSlot(slot.id, 'day', value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map(day => (
                                <SelectItem key={day} value={day}>{day}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select value={slot.startTime} onValueChange={(value) => updateSlot(slot.id, 'startTime', value)}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select value={slot.endTime} onValueChange={(value) => updateSlot(slot.id, 'endTime', value)}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={slot.subject}
                            onChange={(e) => updateSlot(slot.id, 'subject', e.target.value)}
                            placeholder="Subject"
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={slot.professor}
                            onChange={(e) => updateSlot(slot.id, 'professor', e.target.value)}
                            placeholder="Professor"
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={slot.room}
                            onChange={(e) => updateSlot(slot.id, 'room', e.target.value)}
                            placeholder="Room"
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTimeSlot(slot.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {slots.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No time slots added yet. Click "Add Time Slot" to get started.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Timetable
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimetableModal;
