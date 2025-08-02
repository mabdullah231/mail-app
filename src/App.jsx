import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import AdminLayout from './layouts/AdminLayout'
import { ConfirmMail, ForgetPassword, SignIn, SignUp } from './screens'
import NotFound404 from './screens/NotFound404'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>

        <Route path="auth/sign-in" element={<SignIn />} />
        <Route path="auth/sign-up" element={<SignUp />} />
        <Route path="auth/confirm-mail" element={<ConfirmMail />} />
        <Route path="auth/forget-password" element={<ForgetPassword />} />
        </Route>
        <Route path="*" element={<NotFound404/>} />
        
        {/* 404 route */}
      </Routes>
    </Router>
  )
}

export default App