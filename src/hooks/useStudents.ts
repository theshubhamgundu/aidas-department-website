
import { useState, useEffect } from 'react'
import { supabase, Student } from '@/lib/supabase'
import { toast } from 'sonner'

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all students
  const fetchStudents = async () => {
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

  // Add new student (registration)
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

  // Update student
  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setStudents(prev => prev.map(s => s.id === id ? data : s))
      toast.success('Student updated successfully')
      return data
    } catch (error) {
      console.error('Error updating student:', error)
      toast.error('Failed to update student')
      throw error
    }
  }

  // Delete student
  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id)

      if (error) throw error

      setStudents(prev => prev.filter(s => s.id !== id))
      toast.success('Student deleted successfully')
    } catch (error) {
      console.error('Error deleting student:', error)
      toast.error('Failed to delete student')
      throw error
    }
  }

  // Approve student
  const approveStudent = async (id: string) => {
    return updateStudent(id, { status: 'approved' })
  }

  // Reject student
  const rejectStudent = async (id: string) => {
    return updateStudent(id, { status: 'rejected' })
  }

  useEffect(() => {
    fetchStudents()

    // Set up real-time subscription
    const subscription = supabase
      .channel('students_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'students' },
        (payload) => {
          console.log('Real-time update:', payload)
          fetchStudents() // Refetch data on any change
        }
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
