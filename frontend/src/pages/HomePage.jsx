import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchPanel from '../components/SearhPanel';
import NavBar from '../components/NavBar';
import './HomePage.css';


const HomePage = () => {
    const { authState } = useAuth();
    const user_name = authState.user?.user_name;

    return (
        <div className='home-page'>
            <NavBar />
            <h2 className='home-header'>Helloota {user_name}</h2>
            <div className='search'>
                <SearchPanel></SearchPanel>
            </div>
            
        </div>
    )
}

export default HomePage;