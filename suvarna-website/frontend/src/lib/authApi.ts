const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';

export interface RegisterData {
  email: string;
  password: string;
  companyName: string;
  firstName: string;
  lastName: string;
  location: string;
  state: string;
  mobile: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  location?: string;
  state?: string;
  mobile?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'manager' | 'agent';
  phone?: string;
  managerId?: string;
  active: boolean;
}

export interface EmployeeAuthResponse {
  success: boolean;
  message: string;
  data: {
    employee: Employee;
    token: string;
  };
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Registration failed');
  }

  return response.json();
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Login failed');
  }

  return response.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const result = await response.json();
  return result.data.user;
}

// Employee authentication functions
export async function loginEmployee(data: LoginData): Promise<EmployeeAuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/employees/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Employee login failed');
  }

  return response.json();
}

export async function getCurrentEmployee(): Promise<Employee> {
  const response = await fetch(`${API_BASE_URL}/api/employees/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const result = await response.json();
  return result.data;
}

