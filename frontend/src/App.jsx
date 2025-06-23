import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
//import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route 
            path="/register" 
            element={
              <ProtectedRoute access="unauthorized">
                <RegisterPage /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <ProtectedRoute access="unauthorized">
                <LoginPage /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute access="authorized">
                <HomePage /> 
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App