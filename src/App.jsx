import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Profile from './pages/profile/Profile'
import Fees from './pages/fees/Fees'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/fees' element={<Fees />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App