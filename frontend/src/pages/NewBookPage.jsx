import axios from 'axios';
import { useRef, useState, useEffect} from 'react';
import BookForm from '../components/BookForm'
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
    const [options, setOptions] = useState([]);
    const [activeField, setActiveField] = useState('');


    let dropdownRef = useRef();
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOptions([]);
                setActiveField('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])


    const normalize = (name) => {
        return name
            .replace(/\./g, '')
            .replace(/\-/g, '')
            .replace(/\'/g, '')
            .replace(/\s+/g, '')
            .toLowerCase()
            .trim();
    }

    const fetchMatchingData = async (category, value) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search/${category}`, {
                withCredentials: true,
                params: {search: value}
            });

            const data = response.data;
            let options = [];

            if (category === 'author') {
                const input = normalize(value);
                const authorNames = [];

                data.forEach(book => {
                    const normAuthors = book.norm_authors.split(',').map(name => name.trim());
                    const authors = book.author_names.split(',').map(name => name.trim());

                    normAuthors.forEach((normAuthors, idx) => {
                        if (normAuthors.includes(input)) {
                            authorNames.push(authors[idx]);
                        }
                    });
                });
                options = [...new Set(authorNames)];
            } else if (category === 'series') {
                const series = data.map(opt => opt.series_name);
                options = [...new Set(series)]
            } else if (category === 'group') {
                const group = data.map(opt => opt.group_name)
                options = [...new Set(group)]
            }

            setOptions(options);
            

        } catch (error) {
            console.log('fetchMatchingData', error);
        }
    }


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

            if (value !== '') {
                setActiveField('author-' + index);
                await fetchMatchingData('author', value);
            } else {
                setActiveField('');
            }
        
        } else if (name === 'seriesName') {
            setBookDetails(prev => ({
                ...prev,
                [name]: value
            }));

            if (value !== '') {
                setActiveField('series');
                await fetchMatchingData('series', value);
            } else {
                setActiveField('');
            }

        } else if (name === 'group') {
            setBookDetails(prev => ({
                ...prev,
                [name]: value
            }));

            if (value !== '') {
                setActiveField('group');
                await fetchMatchingData('group', value);
            } else {
                setActiveField('');
            }

        } else {
            setActiveField('');
            setBookDetails({
                ...bookDetails,
                [name]: value
            });
            setOptions([]);
        }
    }

    const handleOptionSelect = async (option, field) => {
        if (field.startsWith('author-')) {
            const index = parseInt(field.split('-')[1], 10);
            setBookDetails(prev => {
                const updatedAuthors = [...prev.authors];
                updatedAuthors[index] = option;
                return {
                    ...prev,
                    authors: updatedAuthors
                };
            });
        } else if (field === 'series') {
            setBookDetails(prev => ({
                ...prev,
                seriesName: option
            }));

        } else if (field === 'group') {
            setBookDetails(prev => ({
                ...prev,
                group: option
            }));
        }

        setOptions([]);
        setActiveField('');
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
                    options={options}
                    activeField={activeField}
                    handleOptionSelect={handleOptionSelect}
                    dropdownRef={dropdownRef}
                />
            </div>
        </div>
    )
}

export default NewBook;