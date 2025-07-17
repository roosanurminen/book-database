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
    const [category, setCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    return (
        <div className='home-page'>
            <NavBar />
            {/*<h2 className='home-header'>Helloota {user_name}</h2>*/}
            <div className='search'>
                <SearchPanel 
                    setBooks={setBooks}
                    category={category}
                    setCategory={setCategory}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setHasSearched={setHasSearched}
                />
            </div>
            <div className='books'>
                <BookList 
                    books={books}
                    category={category}
                    searchValue={searchValue}
                    hasSearched={hasSearched}
                />
            </div>
            
        </div>
    )
}

export default HomePage;