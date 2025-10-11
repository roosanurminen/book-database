import './LoginPage.css'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        err: ''
    })

    const emailChange = (e) => {
        setEmail(e.target.value);

        if (e.target.value.trim().length === 0) {
            setErrors(prev => ({ ...prev, email: 'Sähköposti vaaditaan'}));
        } else {
            setErrors(prev => ({ ...prev, email: ''}));
        }
    }

    const passwrodChange = (e) => {
        setPassword(e.target.value);

        if (e.target.value.trim().length === 0) {
            setErrors(prev => ({ ...prev, password: 'Salasana vaaditaan'}));
        } else {
            setErrors(prev => ({ ...prev, password: ''}));
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0) {
            setErrors({
                email: email.trim().length === 0 ? 'Säköposti vaaditaan' : '', 
                password: password.trim().length === 0 ? 'Salasana vaaditaan' : ''
            });
            return;
        }
        try {
            const requestBody = {email, password};
            const response = await axios.post('http://localhost:5000/api/login', requestBody, {
                withCredentials: true 
            });
            setAuthState({
                isAuthenticated: true,
                user: response.data.user
            });
            navigate('/')
        } catch (error) {
            if (error.response && error.response.data?.message) {
                setErrors(prev => ({ ...prev, err: error.response.data.message }));
                if (error.response.status !== 401) {
                    toast.error(error.response.data.message, {autoClose: 3000});
                }
            } else {
                toast.error('Tapahtui palvelinvirhe', {autoClose: 3000});
            }
        }
    }
    return (
        <div className='login-page'>
            <h1 className='login-header'>Kirjahyllysi</h1>
            <p className='login-desc'>- kaikki kirjasi yhdessä paikassa</p>
            <div className='login-container'>
                <h3 className='login-form-title'>Kirjaudu sisään</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type='email'
                        value={email}
                        onChange={emailChange}
                        placeholder='Sähköposti'
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className='error-p'>{errors.email}</p>}
                    <input
                        type='password'
                        value={password}
                        onChange={passwrodChange}
                        placeholder='Salasana'
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className='error-p'>{errors.password}</p>}
                    {errors.err && <p className='err-error'>{errors.err}</p>} 
                    <button type='submit'>Kirjaudu sisään</button>
                </form>
                <Link to='/register'>Ei tunnuksia? Luo tili</Link>
            </div>
        </div>
    )
}

export default LoginPage;