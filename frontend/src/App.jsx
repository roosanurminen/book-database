import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import NewBook from './pages/NewBookPage';
import ToastProvider from './components/ToastProvider';
import Profile from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ToastProvider />
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
          <Route 
            path="/add-new-book" 
            element={
              <ProtectedRoute access="authorized">
                <NewBook /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute access="authorized">
                <Profile /> 
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