import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import NewBookPage from './pages/NewBookPage';
import ToastProvider from './components/ToastProvider';
import Profile from './pages/ProfilePage';
import EditBookPage from './pages/EditBookPage';
import MissingBookPage from './pages/MissingBookPage';
import ClaimBookPage from './pages/ClaimBookPage';

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
                <NewBookPage /> 
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
          <Route 
            path="/edit-book/:bookId" 
            element={
              <ProtectedRoute access="authorized">
                <EditBookPage /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-missing-book" 
            element={
              <ProtectedRoute access="authorized">
                <MissingBookPage /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/claim-book/:bookId" 
            element={
              <ProtectedRoute access="authorized">
                <ClaimBookPage /> 
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