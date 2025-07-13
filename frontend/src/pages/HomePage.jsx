import { useAuth } from '../context/AuthContext';
import SearchPanel from '../components/SearhPanel';
import NavBar from '../components/NavBar';
import './HomePage.css';
import { useState } from 'react';
import BookList from '../components/BookList';


const HomePage = () => {
    const { authState } = useAuth();
    //const user_name = authState.user?.user_name;

    const [books, setBooks] = useState([]);

    return (
        <div className='home-page'>
            <NavBar />
            {/*<h2 className='home-header'>Helloota {user_name}</h2>*/}
            <div className='search'>
                <SearchPanel setBooks={setBooks}/>
            </div>
            <div className='books'>
                <BookList books={books}></BookList>
            </div>
            
        </div>
    )
}

export default HomePage;