import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useLocation, useNavigate  } from "react-router-dom";

//https://stackoverflow.com/questions/76448002/react-returns-the-login-page-by-default-if-the-user-isnt-authenticatied-if-i-su

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null
    });

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const requiresAuthentication = location.pathname !== '/login' && location.pathname !== '/register';
    const navigate = useNavigate();

    const logout = async () => {
        setAuthState({
            isAuthenticated: false,
            user: null
        });
        setLoading(false);
        navigate('/login')

        try {
            await axiosInstance.post('./logout');
            console.log("Logged out")
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };
    
    const checkAuth = async () => {
        try {
            const authRes = await axiosInstance.get('/check-auth');
            console.log('checkAuth log', authRes);

            setAuthState({
                isAuthenticated: true,
                user: authRes.data.user
            });
        } catch (error) {
            await logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (requiresAuthentication) {
                checkAuth();
        } else {
            setLoading(false);
        }
    }, [location.pathname]);


    return (
        <AuthContext.Provider value={{authState, setAuthState, loading}}> { children } </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);