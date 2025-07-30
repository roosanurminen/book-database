import { useAuth } from '../context/AuthContext';
import SearchPanel from '../components/SearhPanel';
import NavBar from '../components/NavBar';
import './HomePage.css';
import { useState } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';
import { toast } from 'react-toastify';


const HomePage = () => {
    const { authState } = useAuth();
    //const user_name = authState.user?.user_name;

    const [books, setBooks] = useState({books: [], authorName: ''});
    const [category, setCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleEdit = (book) => {

    }

    const handleDelete = async (book) => {
        try {
            const bookId = book.book_id;
            await axios.delete('http://localhost:5000/api/delete-book', {
                withCredentials: true,
                data: {bookId}
            });

            setSelectedBook(null);
            //DO THIS
            setBooks(prev => ({
                ...prev,
                books: prev.books.filter(b => b.book_id !== bookId)
            }));
                
            toast.success('Kirja poistettu!');
           
        } catch (error) {
            console.log('handledelete err:', error);
        }
    }


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
                    books={books.books}
                    authorName={books.authorName}
                    category={category}
                    searchValue={searchValue}
                    hasSearched={hasSearched}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    setSelectedBook={setSelectedBook}
                    selectedBook={selectedBook}
                />
            </div>
            
        </div>
    )
}

export default HomePage;