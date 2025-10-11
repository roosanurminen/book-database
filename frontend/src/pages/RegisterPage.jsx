import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'
import { toast } from 'react-toastify';


const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const validateName = (value) => {
        if (!value.trim() || value.length < 2) {
            return 'Vähintään 2 merkkiä';
        }
    }

    // https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim() || !emailRegex.test(value)) {
            return 'Virheellinen sähköpostimuoto';
        }
    }

    const validatePassword = (value) => {
        if (value.trim().length < 8 || !/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
            return 'Salasanan tulee sisältää: 1 pieni kirjain, 1 iso kirjain, 1 numero ja olla 8 merkkiä pitkä';
        }
    }

    const nameChange = (e) => {
        setName(e.target.value);
        setErrors({...errors, name: validateName(e.target.value)})
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
        setErrors({...errors, email: validateEmail(e.target.value)})
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
        setErrors({...errors, password: validatePassword(e.target.value)})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameInvalid = validateName(name) || '';
        const emailInvalid = validateEmail(email) || '';
        const passwordInvalid = validatePassword(password) || '';

        setErrors({
            name: nameInvalid,
            email: emailInvalid,
            password: passwordInvalid
        });

        if (nameInvalid || emailInvalid || passwordInvalid) {
            return;
        }

        try {
            const requestBody = {name, email, password};
            const response = await axios.post('http://localhost:5000/api/register', requestBody, {
                withCredentials: true 
            });
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data?.message) {
                setErrors(prev => ({ ...prev, email: error.response.data.message }));
                toast.error(error.response.data.message, {autoClose: 3000})
            } else {
                toast.error('Tapahtui palvelinvirhe', {autoClose: 3000});
            }
        }
    }
    return (
        <div className='register-page'>
            <h1 className='register-header'>Kirjahyllysi</h1>
            <p className='register-desc'>- kaikki kirjasi yhdessä paikassa</p>
            <div className='register-container'>
                <h3 className='register-form-title'>Rekisteröidy</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type='text'
                        value={name}
                        onChange={nameChange}
                        placeholder='Nimi'
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <p className='error-p'>{errors.name}</p>}
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
                        onChange={passwordChange}
                        placeholder='Salasana'
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className='error-p'>{errors.password}</p>}
                    <button type='submit'>Luo</button>
                </form>
            </div>
        </div>
    )

}

export default RegisterPage;