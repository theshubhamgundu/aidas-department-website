import React, { useEffect, useState } from "react";
import { X, User, Shield, Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/hooks/useStudents";
import { supabase } from "@/lib/supabaseClient";

/* --------------------------------------------------------------------- */
/*                               TYPES                                   */
/* --------------------------------------------------------------------- */
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "student" | "admin";
}

interface StudentFormData {
  name: string;
  rollNumber: string;      // H.T. No.
  email: string;
  phone: string;
  year: string;
  semester: string;
  address: string;
  parentName: string;
  parentPhone: string;
  emergencyContact: string;
}

/* --------------------------------------------------------------------- */
/*                             COMPONENT                                 */
/* --------------------------------------------------------------------- */
export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { addStudent } = useStudents();

  /* ---------------- STATE ---------------- */
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

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* ---------------- HANDLERS ---------------- */
  // --- Login ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await signIn(loginData.email.trim(), loginData.password);
      if (error) throw error;

      if (type === "student") {
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("status")
          .eq("id", data.user?.id)
          .single();
        if (profileError) throw profileError;
        if (profile?.status !== "approved") {
          throw new Error("Your profile is pending approval. Please wait for admin confirmation.");
        }
      }

      toast.success("Logged in successfully 🚀");
      onClose();
      setTimeout(
        () => navigate(type === "admin" ? "/admin-dashboard" : "/student-dashboard"),
        300
      );
    } catch (err: any) {
      toast.error(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Registration ---
  const handleStudentRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Eligibility check
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

      // 2️⃣ Create Auth user (default pwd `student123`)
      const { error: signUpError, data: signUpData } = await signUp(
        studentData.email.trim(),
        "student123",
        { name: studentData.name, roll_number: studentData.rollNumber }
      );
      if (signUpError) throw signUpError;

      // 3️⃣ Insert profile row (pending)
      await addStudent({
        id: signUpData.user!.id,
        roll_number: studentData.rollNumber,
        name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        year: studentData.year,
        semester: studentData.semester,
        cgpa: "0.0",
        attendance: "0%",
        status: "pending",
        address: studentData.address,
        parent_name: studentData.parentName,
        parent_phone: studentData.parentPhone,
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

  // --- Generic input handler ---
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

  /* ---------------- RENDER ---------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-2">
              {type === "admin" ? (
                <Shield className="h-5 w-5 text-white" />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {type === "admin"
                  ? "Admin Login"
                  : isRegistering
                  ? "Student Registration"
                  : "Student Login"}
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
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="p-6">
          {type === "admin" || !isRegistering ? (
            /* -------- LOGIN FORM -------- */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
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
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                {loading
                  ? "Signing in..."
                  : type === "admin"
                  ? "Login as Admin"
                  : "Login as Student"}
              </Button>

              {type === "student" && (
                <div className="text-center">
                  <p className="mb-2 text-sm text-gray-600">
                    Don't have an account?
                  </p>
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
            </form>
          ) : (
            /* ----- REGISTRATION FORM ----- */
            <form onSubmit={handleStudentRegistration} className="space-y-4">
              {/* Name & Roll */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name *
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
                  <Label
                    htmlFor="rollNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    H.T. No. *
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
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleInputChange}
                    placeholder="student@vit.ac.in"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone *
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={studentData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              {/* Year & Semester */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="year"
                    className="text-sm font-medium text-gray-700"
                  >
                    Year *
                  </Label>
                  <select
                    id="year"
                    name="year"
                    value={studentData.year}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label
                    htmlFor="semester"
                    className="text-sm font-medium text-gray-700"
                  >
                    Semester *
                  </Label>
                  <select
                    id="semester"
                    name="semester"
                    value={studentData.semester}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem.toString()}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address *
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={studentData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  required
                />
              </div>

              {/* Parent details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="parentName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Parent / Guardian *
                  </Label>
                  <Input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={studentData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent name"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="parentPhone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Parent Phone *
                  </Label>
                  <Input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={studentData.parentPhone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <Label
                  htmlFor="emergencyContact"
                  className="text-sm font-medium text-gray-700"
                >
                  Emergency Contact *
                </Label>
                <Input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={studentData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistering(false)}
                  className="flex-1"
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {loading ? "Registering..." : "Submit Registration"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
