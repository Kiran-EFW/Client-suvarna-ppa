import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import CodeOfConduct from './pages/CodeOfConduct';
import AntiBriberyPolicy from './pages/AntiBriberyPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingAB from './pages/LandingAB';
import SellerLanding from './pages/SellerLanding';
import EmployeeLogin from './pages/employee/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EmployeeProtectedRoute from './components/auth/EmployeeProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import BuyerDashboard from './pages/buyer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBuyers from './pages/admin/Buyers';
import AdminSellers from './pages/admin/Sellers';
import AdminMatches from './pages/admin/Matches';
import AdminLogin from './pages/admin/Login';
import CRMDashboard from './pages/crm/Dashboard';
import TableView from './pages/crm/TableView';
import KanbanView from './pages/crm/KanbanView';
import LeadDetail from './pages/crm/LeadDetail';
import EmployeeList from './pages/crm/EmployeeList';
import Tasks from './pages/crm/Tasks';
import Reports from './pages/crm/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/anti-bribery-policy" element={<AntiBriberyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing-ab" element={<LandingAB />} />
          <Route path="/seller-landing" element={<SellerLanding />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          
          {/* Protected Buyer Routes */}
          <Route path="/buyer/dashboard" element={
            <ProtectedRoute>
              <BuyerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/buyers" element={
            <AdminProtectedRoute>
              <AdminBuyers />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/sellers" element={
            <AdminProtectedRoute>
              <AdminSellers />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/matches" element={
            <AdminProtectedRoute>
              <AdminMatches />
            </AdminProtectedRoute>
          } />
          
          {/* CRM Routes */}
          <Route path="/crm/dashboard" element={
            <EmployeeProtectedRoute>
              <CRMDashboard />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/leads/table" element={
            <EmployeeProtectedRoute>
              <TableView />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/leads/kanban" element={
            <EmployeeProtectedRoute>
              <KanbanView />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/leads/:id" element={
            <EmployeeProtectedRoute>
              <LeadDetail />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/employees" element={
            <EmployeeProtectedRoute>
              <EmployeeList />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/tasks" element={
            <EmployeeProtectedRoute>
              <Tasks />
            </EmployeeProtectedRoute>
          } />
          <Route path="/crm/reports" element={
            <EmployeeProtectedRoute>
              <Reports />
            </EmployeeProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;