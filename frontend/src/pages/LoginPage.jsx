import './LoginPage.css'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {email, password};
            console.log(email, password);
            const response = await axios.post('http://localhost:5000/api/login', requestBody, {
                withCredentials: true,
            });
            console.log("handleSubmit log", response);
            setAuthState({
                isAuthenticated: true,
                user: response.data.user
            });
            navigate('/')
        } catch (error) {
            console.log("handleSubmit err:", error);
        }
    }
    return (
        <div className='login-page'>
            <h1 className='login-header'>Kirjahylly jutksa</h1>
            <div className='login-container'>
                <h3 className='login-form-title'>Kirjaudu sisään</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Sähköposti'
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Salasana'
                    />
                    <button type="submit">Kirjaudu sisään</button>
                </form>
                <Link to="/register">Ei tunnuksia? Luo sellainen</Link>
            </div>
        </div>
    )
}

export default LoginPage;