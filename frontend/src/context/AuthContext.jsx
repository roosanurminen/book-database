import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

//https://stackoverflow.com/questions/76448002/react-returns-the-login-page-by-default-if-the-user-isnt-authenticatied-if-i-su

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null
    });

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const requiresAuthentication = location.pathname !== "/login" && location.pathname !== "/register";

    const checkAuth = async () => {
        try {
            const authRes = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
            console.log('checkAuth log', authRes);

            if (authRes.data.authenticated) {
                setAuthState({
                    isAuthenticated: true,
                    user: authRes.data.user
                });
            } else {
                throw new Error("Not authenticated");
            }
        } catch (error) {
            try {
                const refreshRes = await axios.post('http://localhost:5000/api/refresh', {}, {withCredentials: true});
                
                if (refreshRes) {
                    const authRes = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
                    setAuthState({
                        isAuthenticated: true,
                        user: authRes.data.user
                    });
                } else {
                    throw new Error("Refresh failed");
                }
            } catch (error) {
                console.log('User not authenticated', error);
                setAuthState({ 
                    isAuthenticated: false, 
                    user: null });
            }
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