import axios from 'axios';
import { useState } from 'react';
import BookForm from './NewBookForm'
import './NewBookPage.css'
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';

const NewBook = () => {
      const [bookDetails, setBookDetails] = useState({
        title: '',
        authors: [''],
        seriesName: '',
        seriesPart: '',
        seriesTotalBooks: '',
        group: '',
        releaseYear: '',
        genres: [],
        bookType: '',
        pages: '',
        condition: '',
        coverType: '',
        edition: '',
        language: '',
        isPerfect: '',
        notes: ''
    });

    const [isSeriesChecked, setSeriesIsChecked] = useState(false);
    const [isGroupChecked, setGroupIsChecked] = useState(false);

    const handleChange = async (e) => {
        const {name, value, id} = e.target;

        if (name === 'authors') {
            const index = parseInt(id, 10);
            setBookDetails(prev => {
                const updatedAuthors = [...prev.authors];
                updatedAuthors[index] = value;
                return {
                    ...prev,
                    authors: updatedAuthors
                };
            });
        } else {
            setBookDetails({
                ...bookDetails,
                [name]: value
            });
        }
    }

    const onSeriesChange = async (e) => {
        setSeriesIsChecked(!isSeriesChecked);
    }

    const onGroupChange = async (e) => {
        setGroupIsChecked(!isGroupChecked);
    }

    const addAuthorField = async (e) => {
        setBookDetails(prev => ({
            ...prev,
            authors: [...prev.authors, '']
        }));
    }

    const removeAuthorField = async (index) => {
        setBookDetails(prev => {
            const updatedAuthors = [...prev.authors];
            updatedAuthors.splice(index, 1);
            return {
                ...prev,
                authors: updatedAuthors
            }
        });
    }

    const handleGenreChange = async (selectedValues) => {
        const selectedGenres = selectedValues.map(option => option.value);
        setBookDetails(prev => ({
            ...prev,
            genres: selectedGenres
        }));
    }

    const clearForm = () => {
        setBookDetails({
                title: '',
                authors: [''],
                seriesName: '',
                seriesPart: '',
                seriesTotalBooks: '',
                group: '',
                releaseYear: '',
                genres: [],
                bookType: '',
                pages: '',
                condition: '',
                coverType: '',
                edition: '',
                language: '',
                isPerfect: '',
                notes: ''
        });
            
        setSeriesIsChecked(false);
        setGroupIsChecked(false);
    }

    const isFormValid = () => {
        const {
            title,
            authors,
            releaseYear,
            language,
            pages,
            edition,
            genres,
            bookType,
            condition,
            coverType,
            isPerfect,
            notes
        } = bookDetails;

        const required = (
            title.trim() &&
            authors.every(author => author.trim()) &&
            releaseYear &&
            language.trim() &&
            pages &&
            edition &&
            genres.length > 0 &&
            bookType &&
            condition &&
            coverType &&
            isPerfect
        );
        
        const seriesRequired = !isSeriesChecked || (
            bookDetails.seriesName.trim() &&
            bookDetails.seriesPart &&
            bookDetails.seriesTotalBooks
        );

        const groupRequired = !isGroupChecked || bookDetails.group.trim();

        const notesRequired = isPerfect === 'true' || notes.trim();

        return required && seriesRequired && groupRequired && notesRequired;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = bookDetails;

            const response = await axios.post('http://localhost:5000/api/add-new-book', requestBody, {
                withCredentials: true,
            });
            toast.success('Kirja lisätty!');

            clearForm();

        } catch (error) {
            console.log('handlesubmit newbook err:', error);
        }
    }
    return (
        <div className='new-book-page'>
            <NavBar />
            <div className='new-book-container'>
                <BookForm 
                    bookDetails={bookDetails} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    isSeriesChecked={isSeriesChecked} 
                    onSeriesChange={onSeriesChange} 
                    isGroupChecked={isGroupChecked} 
                    onGroupChange={onGroupChange} 
                    addAuthorField={addAuthorField}
                    removeAuthorField={removeAuthorField}
                    handleGenreChange={handleGenreChange}
                    isFormValid={isFormValid}
                />
            </div>
        </div>
    )
}

export default NewBook;