import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import Fees from './pages/fees/Fees';
import StudyMaterials from './pages/studyMaterials/StudyMaterials';
import Attendance from './pages/attendence/Attendance';
import Notifications from './pages/notification/Notifications';
import Reports from './pages/reports/Reports';
import Promotions from './pages/promotions/Promotions';
import Home from './pages/home/Home';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import StudentApprovals from './components/StudentApprovals';
import ResetPassword from './pages/auth/ResetPassword';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route (always accessible) */}
        <Route path="/home" element={<Home />} />

        {/* Public-only routes (hidden when logged in) */}
        <Route
          path="/login"
          element={
            <ProtectedRoute isPublicOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isPublicOnly>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected routes (require login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute isProtected>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isProtected>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute isProtected>
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-materials"
          element={
            <ProtectedRoute isProtected>
              <StudyMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute isProtected>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isProtected>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute isProtected>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promotions"
          element={
            <ProtectedRoute isProtected>
              <Promotions />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/approvals"
  element={
    <ProtectedRoute isProtected allowedRoles={['admin']}>
      <StudentApprovals />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
