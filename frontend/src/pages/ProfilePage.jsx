//import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import './ProfilePage.css'
import axiosInstance from '../api/axiosInstance';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: ''
    });

    const [formData, setFormData] = useState({
        username: '',
        email: '',

    })

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axiosInstance.get('/profile');
                const data = {
                    username: response.data.username,
                    email: response.data.email,
                };

                setUserData(data);
                setFormData(data);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        const originalName = userData.username;
        const newName = formData.username;
        
        return (newName.trim() !== '' && newName !== originalName);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/profile', {
                user_name: formData.username,
            });
            toast.success('Profiili päivitetty onnistuneesti!');
            setUserData((prev) => ({...prev, username: formData.username}))
        } catch (error) {
            console.log(error); 
        }
    }
        

    return (
        <div className='profile-page'>
            <NavBar />
            <div className='profile-container'>
                <form className='profile-form' onSubmit={handleSubmit}>
                    <h1>Profiili</h1>
                    <div className='field'>
                        <label htmlFor='username'>Nimi</label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete='off'
                                required
                            />
                    </div>
                    <div className='field'>
                        <label htmlFor='email'>Sähköposti</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={formData.email}
                                disabled 
                            />
                    </div>
                    <button className='submit-btn' type='submit' disabled={!isFormValid()}>Tallenna muutokset</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;