import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import BookForm from './NewBookForm'


const NewBook = () => {
      const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        seriesName: '',
        seriesPart: '',
        seriesTotalBooks: '',
        group: '',
        releaseYear: '',
        genre: '',
        bookType: '',
        pages: '',
        condition: '',
        coverType: '',
        edition: '',
        language: '',
        isPerfect: '',
        notes: ''
    });

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setBookDetails({
            ...bookDetails,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = bookDetails;

            const response = await axios.post('http://localhost:5000/api/add-new-book', requestBody, {
                withCredentials: true,
            });

            console.log("handlesubmit newbook", response);

        } catch (error) {
            console.log("handlesubmit newbook err:", error);
        }
    }
    return (
        <div className='new-book-page'>
            <h1 className='new-book-title'>Lisää uusi kirja</h1>
            <BookForm bookDetails={bookDetails} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default NewBook;