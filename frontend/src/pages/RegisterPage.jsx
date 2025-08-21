import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState({
        name: '',
        email: '',
        password: ''
    });

    const validateName = (value) => {
        if (!value.trim() || value.length < 2) {
            return 'Nimen tulee olla vähintään 2 merkkiä pitkä';
        }
    }

    // https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim() || !emailRegex.test(value)) {
            return 'Virheellinen sähköpostiosoite';
        }
    }

    const validatePassword = (value) => {
        if (value.trim().length < 8 || !/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
            return 'Salasanan tulee sisältää: 1 pieni kirjain, 1 iso kirjain, 1 numero ja olla 8 merkkiä pitkä';
        }
    }

    const nameChange = (e) => {
        setName(e.target.value);
        setIsValid({...isValid, name: validateName(e.target.value)})
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
        setIsValid({...isValid, email: validateEmail(e.target.value)})
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
        setIsValid({...isValid, password: validatePassword(e.target.value)})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameInvalid = validateName(name) || '';
        const emailInvalid = validateEmail(email) || '';
        const passwordInvalid = validatePassword(password) || '';

        setIsValid({
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
                withCredentials: true,
            });
            console.log("handleSubmit log", response);
            navigate('/login')
        } catch (err) {
            console.log("handleSubmit err:", err);

            if (err.response && err.response.data?.message) {
                setIsValid(prev => ({ ...prev, email: err.response.data.message }));
            } else {
                alert('Tapahtui palvelinvirhe');
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
                        type='name'
                        value={name}
                        onChange={nameChange}
                        placeholder='Nimi'
                        className={isValid.name ? 'input-error' : ''}
                    />
                    {isValid.name && <p className='error-p'>{isValid.name}</p>}
                    <input
                        type='email'
                        value={email}
                        onChange={emailChange}
                        placeholder='Sähköposti'
                        className={isValid.email ? 'input-error' : ''}
                    />
                    {isValid.email && <p className='error-p'>{isValid.email}</p>}
                    <input
                        type='password'
                        value={password}
                        onChange={passwordChange}
                        placeholder='Salasana'
                        className={isValid.password ? 'input-error' : ''}
                    />
                    {isValid.password && <p className='error-p'>{isValid.password}</p>}
                    <button type='submit'>Luo</button>
                </form>
            </div>
        </div>
    )

}

export default RegisterPage;