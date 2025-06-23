import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const { authState, setAuthState } = useAuth();
    const user_name = authState.user?.user_name;
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/logout', {}, {
                withCredentials: true,
            });
            console.log('handleLogout log', response);
            setAuthState({
                isAuthenticated: false,
                user: null
            });
            navigate('/login');
        } catch (error) {
            console.log('handleLogout err', error);
        }
    }
    return (
        <div className='HomePage'>
            <h2>Helloota {user_name}</h2>
            <button onClick={handleLogout}>Kirjaudu ulos</button>
            <SearchBar/>
        </div>
    )
}

export default HomePage;