import { useAuth } from '../context/AuthContext';
import SearchPanel from '../components/SearhPanel';
import NavBar from '../components/NavBar';
import './HomePage.css';
import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { authState } = useAuth();
    //const user_name = authState.user?.user_name;

    const [books, setBooks] = useState({books: [], authorName: '', seriesFull: [], missingBooks: []});
    const [category, setCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showAlsoMissing, setShowAlsoMissing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowAlsoMissing(false);
    }, [category]);


    let showToggle = false;
    
    if (hasSearched && books.missingBooks.length > 0) {
        showToggle = true;
    }

    const handleEdit = async (book) => {
        const bookId = book.book_id;
        navigate(`/edit-book/${bookId}`)
    }

    const handleAdd = async (book) => {
        const bookId = book.book_id;
        navigate(`/claim-book/${bookId}`)
    }

    const handleDelete = async (book) => {
        try {
            const bookId = book.book_id;
            await axios.delete('http://localhost:5000/api/delete-book', {
                withCredentials: true,
                data: {bookId}
            });

            setSelectedBook(null);
            
            setBooks(prev => ({
                ...prev,
                books: prev.books.filter(b => b.book_id !== bookId)
            }));
                
            toast.success('Kirja poistettu!');
           
        } catch (error) {
            console.log('handledelete err:', error);
        }
    }

    const handleMissingDelete = async (book) => {
        try {
            const bookId = book.book_id;
            await axios.delete('http://localhost:5000/api/delete-missing', {
                withCredentials: true,
                data: {bookId}
            });

            setSelectedBook(null);
            
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
                    seriesFull={books.seriesFull}
                    missingBooks={books.missingBooks}
                    category={category}
                    searchValue={searchValue}
                    hasSearched={hasSearched}
                    handleEdit={handleEdit}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleMissingDelete={handleMissingDelete}
                    setSelectedBook={setSelectedBook}
                    selectedBook={selectedBook}
                    showAlsoMissing={showAlsoMissing}
                    setShowAlsoMissing={setShowAlsoMissing}
                    showToggle={showToggle}
                />
            </div>
        </div>
    )
}

export default HomePage;