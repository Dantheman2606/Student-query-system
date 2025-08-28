import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './utils/ProtectedRoute'
import ProtectedFacultyRoute from './utils/ProtectedFacultyRoute'
import VerifyEmail from './pages/VerifyEmail'
import CreateAnnouncements from './pages/CreateAnnouncements'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/verifyEmail' element={<VerifyEmail />} />


          <Route element={<ProtectedRoute />}>

            <Route path='/home' element={<HomePage />} />

            <Route element={<ProtectedFacultyRoute />}>
              <Route path='/createAnnouncements' element={<CreateAnnouncements />} />
            </Route>

            
          </Route>

          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
