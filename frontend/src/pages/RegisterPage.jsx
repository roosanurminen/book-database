import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {name, email, password};
            const response = await axios.post('http://localhost:5000/api/register', requestBody, {
                withCredentials: true,
            });
            console.log("handleSubmit log", response);
            navigate('/login')
        } catch (error) {
            console.log("handleSubmit err:", error);
        }
    }
    return (
        <div className='register-page'>
            <div className='register-container'>
                <h3 className='register-form-title'>Rekisteröidy</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Nimi'
                    />
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
                    <button type="submit">Luo</button>
                </form>
            </div>
        </div>
    )

}

export default RegisterPage;