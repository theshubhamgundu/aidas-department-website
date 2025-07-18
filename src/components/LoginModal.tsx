import React, { useEffect, useState } from "react";
import { X, User, Shield, Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/hooks/useStudents";
import { supabase } from "@/lib/supabase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "student" | "admin";
}

interface StudentFormData {
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  year: string;
  semester: string;
  address: string;
  parentName: string;
  parentPhone: string;
  emergencyContact: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { addStudent } = useStudents();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [studentData, setStudentData] = useState<StudentFormData>({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    year: "1st Year",
    semester: "1",
    address: "",
    parentName: "",
    parentPhone: "",
    emergencyContact: "",
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(loginData.email.trim(), loginData.password);
      
      // For admin, no profile check needed
      if (type === "student") {
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("status")
          .eq("email", loginData.email.trim())
          .single();
        if (profileError) throw profileError;
        if (profile?.status !== "approved") {
          throw new Error("Your profile is pending approval. Please wait for admin confirmation.");
        }
      }

      toast.success("Logged in successfully 🚀");
      onClose();
      setTimeout(() => navigate(type === "admin" ? "/admin-dashboard" : "/student-dashboard"), 300);
    } catch (err: any) {
      toast.error(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: verified, error: verifyError } = await supabase
        .from("verified_students")
        .select("roll_number")
        .eq("roll_number", studentData.rollNumber.trim())
        .eq("name", studentData.name.trim())
        .eq("year", studentData.year)
        .maybeSingle();

      if (verifyError) throw verifyError;
      if (!verified) {
        toast.error("You are not in the list of verified students. Please contact admin.");
        return;
      }

      await signUp(
        studentData.email.trim(),
        "student123",
        { name: studentData.name, roll_number: studentData.rollNumber }
      );

      await addStudent({
        roll_number: studentData.rollNumber,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        year: studentData.year,
        section: "A",
        semester: studentData.semester,
        cgpa: "0.0",
        attendance: "0%",
        status: "pending",
        address: studentData.address,
        parent_name: studentData.parentName,
        parent_phone: studentData.parentPhone,
        date_of_birth: "1990-01-01",
        blood_group: "O+",
        category: "General",
        admission_date: new Date().toISOString().split('T')[0],
        hostel_details: "N/A",
        emergency_contact: studentData.emergencyContact,
      });

      toast.success("Request sent to Admin for approval. 🎉", { duration: 6000 });
      setStudentData({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        year: "1st Year",
        semester: "1",
        address: "",
        parentName: "",
        parentPhone: "",
        emergencyContact: "",
      });
      setIsRegistering(false);
    } catch (err: any) {
      toast.error(err.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-2">
              {type === "admin" ? <Shield className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {type === "admin" ? "Admin Login" : isRegistering ? "Student Registration" : "Student Login"}
              </h2>
              <p className="text-sm text-gray-600">
                {type === "admin"
                  ? "Access administrative dashboard"
                  : isRegistering
                  ? "Create your student profile"
                  : "Access your student dashboard"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <form
            onSubmit={type === "admin" || !isRegistering ? handleLoginSubmit : handleStudentRegistration}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={isRegistering ? studentData.email : loginData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {(type === "admin" || !isRegistering) && (
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {isRegistering && type === "student" && (
              <>
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700">
                    H.T. No.
                  </Label>
                  <Input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={studentData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 21BCT001"
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              {loading
                ? isRegistering
                  ? "Registering..."
                  : "Signing in..."
                : isRegistering
                ? "Submit Registration"
                : type === "admin"
                ? "Login as Admin"
                : "Login as Student"}
            </Button>

            {!isRegistering && type === "student" && (
              <div className="text-center">
                <p className="mb-2 text-sm text-gray-600">Don't have an account?</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistering(true)}
                  className="flex w-full items-center justify-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Create New Profile</span>
                </Button>
              </div>
            )}

            {isRegistering && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRegistering(false)}
                className="w-full"
              >
                Back to Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
