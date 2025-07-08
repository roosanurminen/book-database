import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


const ProtectedRoute = ({ children, access }) => {
    const { authState, loading } = useAuth();

    if (loading) {
        return <div>Ladataan...</div>;
    }

    if (access === "unauthorized") {
        return !authState.isAuthenticated ? children : <Navigate to="/" />;
    } 
    
    if (access === "authorized") {
        return authState.isAuthenticated ? children : <Navigate to="/login" />;
    }

    return null;
};

export default ProtectedRoute;