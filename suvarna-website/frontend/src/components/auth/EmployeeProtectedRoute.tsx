import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { Employee } from '@/lib/authApi';

interface EmployeeProtectedRouteProps {
  children: React.ReactNode;
}

export default function EmployeeProtectedRoute({ children }: EmployeeProtectedRouteProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check if employee is logged in from localStorage
        const storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
          const emp = JSON.parse(storedEmployee);
          setEmployee(emp);
        }
      } catch (error) {
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/employee/login" replace />;
  }

  return <>{children}</>;
}

