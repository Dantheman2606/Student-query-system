import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import VerifyEmail from './pages/VerifyEmail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />

          <Route path='/verifyEmail' element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
