import { useState, useEffect } from 'react'
import { supabase, Student } from '@/lib/supabase'
import { toast } from 'sonner'

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Fetch all students
  const fetchStudents = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (error) {
      console.error('Error fetching students:', error)
      toast.error('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Add new student
  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single()

      if (error) throw error

      setStudents(prev => [data, ...prev])
      toast.success('Student registered successfully')
      return data
    } catch (error) {
      console.error('Error adding student:', error)
      toast.error('Failed to register student')
      throw error
    }
  }

  // ✅ Update student safely (with ID check)
  const updateStudent = async (rollNumber: string, updates: Partial<Student>) => {
    if (!rollNumber) {
      toast.error('Invalid roll number for update')
      return null
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('roll_number', rollNumber)
        .select()
        .single()

      if (error) throw error

      setStudents(prev => prev.map(s => s.roll_number === rollNumber ? data : s))
      toast.success('Student updated successfully')
      return data
    } catch (error) {
      console.error('Error updating student:', error)
      toast.error('Failed to update student')
      throw error
    }
  }

  // ✅ Delete student safely
  const deleteStudent = async (rollNumber: string) => {
    if (!rollNumber) {
      toast.error('Invalid roll number for deletion')
      return
    }

    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('roll_number', rollNumber)

      if (error) throw error

      setStudents(prev => prev.filter(s => s.roll_number !== rollNumber))
      toast.success('Student deleted successfully')
    } catch (error) {
      console.error('Error deleting student:', error)
      toast.error('Failed to delete student')
      throw error
    }
  }

  // ✅ Approve student
  const approveStudent = async (rollNumber: string) => {
    if (!rollNumber) {
      toast.error('Missing roll number')
      return
    }

    const result = await updateStudent(rollNumber, { status: 'approved' })
    await fetchStudents()
    return result
  }

  // ✅ Reject student
  const rejectStudent = async (rollNumber: string) => {
    if (!rollNumber) {
      toast.error('Missing roll number')
      return
    }

    const result = await updateStudent(rollNumber, { status: 'rejected' })
    await fetchStudents()
    return result
  }

  // ✅ Real-time updates
  useEffect(() => {
    fetchStudents()

    const subscription = supabase
      .channel('students_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students' },
        () => fetchStudents()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    approveStudent,
    rejectStudent,
    refetch: fetchStudents
  }
}
