import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

const NavBar = () => {
    const { setAuthState } = useAuth();
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
    };


    return (
        <nav className='nav'>
            <div className="nav-left">
                <Link to="/">Kirjahyllyni</Link>
            </div>
            <div className='nav-right'>
                <Link to="/add-new-book">Lisää kirja</Link>
                <Link to="/profile">Profiili</Link>
                <button onClick={handleLogout}>Kirjaudu ulos</button>
            </div> 
        </nav>
    )
};

export default NavBar;