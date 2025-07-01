import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Profile from './pages/profile/Profile'
import Fees from './pages/fees/Fees'
import StudyMaterials from './pages/studyMaterials/StudyMaterials'
import Attendance from './pages/attendence/Attendance'
import Notifications from './pages/notification/Notifications'
import Reports from './pages/reports/Reports'
import Promotions from './pages/promotions/Promotions'
import Home from './pages/home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/fees' element={<Fees />} />
        <Route path='/study-materials' element={<StudyMaterials />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/promotions' element={<Promotions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App