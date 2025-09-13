import { useRef, useState, useEffect} from 'react';
import BookForm from '../components/BookForm'
import './NewBookPage.css'
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const NewBookPage = () => {
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
    const [errors, setErrors] = useState({
        title: '',
        authors: [''],
        seriesName: '',
        seriesPart: '',
        seriesTotalBooks: '',
        group: '',
        releaseYear: '',
        genres: '',
        bookType: '',
        pages: '',
        condition: '',
        coverType: '',
        edition: '',
        language: '',
        isPerfect: '',
        notes: ''
    });
    const [touched, setTouched] = useState(false);


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
            const response = await axiosInstance.get(`/search/${category}`, {
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
            toast.error('Ehdotusten haku epäonnistui', {autoClose: 3000});
        }
    }

    const validation = (name, value, id) => {
        let msg = '';

        if (name === 'authors') {
            const index = parseInt(id, 10);
            setErrors(prev => {
                    const updatedAuthors = [...prev.authors];
                    updatedAuthors[index] = value.trim() ? '' : 'Pakollinen kenttä';
                    return {
                        ...prev,
                        authors: updatedAuthors
                    };
            });
            return;
        }

        
        if (name === 'notes') {
            if ((bookDetails.isPerfect === 'false' || bookDetails.isPerfect === null) && !value.trim()) {
                msg = 'Pakollinen kenttä';
            }
        }

        if (name === 'isPerfect') {
            if (value === 'true' || value === null) {
                setErrors(prev => ({ ...prev, notes: '' }));
            }
        }

        const numberFields = ['seriesPart', 'seriesTotalBooks', 'releaseYear', 'pages', 'edition'];
        if (numberFields.includes(name) && value && isNaN(Number(value))) {
            msg = 'Vain numerot sallittu';
        }

        const dropdowns = ['bookType', 'condition', 'coverType', 'isPerfect']
        if (dropdowns.includes(name) && !value) {
            msg = 'Pakollinen kenttä';
        }


        if (name !== 'notes') {
            if (value === null || value === undefined) {
                msg = 'Pakollinen kenttä';
            } else if (typeof value === 'string' && !value.trim()) {
                msg = 'Pakollinen kenttä';
            } else if (Array.isArray(value) && value.length === 0) {
                msg = 'Pakollinen kenttä';
            }
        }

        if ((name === 'seriesName' || name === 'seriesPart' || name === 'seriesTotalBooks') && !isSeriesChecked) {
            msg = '';
        }

        if (name === 'group' && !isGroupChecked) {
            msg = '';
        }

        setErrors(prev => ({ 
            ...prev, 
            [name]: msg
        }));

    }


    const handleChange = async (e) => {
        const {name, value, id} = e.target;

        validation(name, value, id);

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
        setSeriesIsChecked(prev => {
            const newValue = !prev;
            if (!newValue) {
                setErrors(prevErr => ({
                    ...prevErr,
                    seriesName: '',
                    seriesPart: '',
                    seriesTotalBooks: ''
                }));
                setBookDetails(prev => ({
                    ...prev,
                    seriesName: '',
                    seriesPart: '',
                    seriesTotalBooks: ''
                }));
            }
            return newValue;
        })
    }

    const onGroupChange = async (e) => {
        setGroupIsChecked(prev => {
            const newValue = !prev;
            if (!newValue) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    group: ''
                }));
                setBookDetails(prev => ({
                    ...prev,
                    group: ''
                }));
            }
            return newValue;
        });
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

        setErrors(prev => {
            const updatedErrors = [...prev.authors];
            updatedErrors.splice(index, 1);
            return {
                ...prev,
                authors: updatedErrors
            }
        });
    }

    const handleGenreChange = async (selectedValues) => {
        const selectedGenres = selectedValues.map(option => option.value);
        setErrors(prev => ({
            ...prev,
            genres: selectedGenres.length === 0 ? 'Pakollinen kenttä' : ''
        }));
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

        const noErrors = Object.values(errors).every(val => {
            if (Array.isArray(val)) {
                return val.every(e => e === '');
            }
            return val === '';
        });

        const groupRequired = !isGroupChecked || bookDetails.group.trim();

        const notesRequired = isPerfect === 'false' ? notes.trim() !== '' : true;

        return required && seriesRequired && groupRequired && notesRequired && noErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        Object.entries(bookDetails).forEach(([name, value]) => {
            if (name === 'authors') {
                value.forEach((author, idx) => validation(name, author, idx))
            } else if (name === 'genres') {
                if (bookDetails.genres.length === 0) {
                    setErrors(prev => ({ ...prev, genres: 'Pakollinen kenttä' }));
                    setTouched(true);
                }
            } else if ((name.startsWith('series') && !isSeriesChecked) || (name === 'group' && !isGroupChecked)) {
                return;
            } else {
                validation(name, value);
            }
        });

        if (!isFormValid()) {
            return;
        }
        
        try {

            const response = await axiosInstance.post('/add-new-book', bookDetails);
            toast.success('Kirja lisätty!');

            clearForm();
            setTouched(false);
            setErrors({
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
        } catch (error) {
            toast.error('Kirjan lisääminen epäonnistui.', {autoClose: 3000});
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
                    options={options}
                    activeField={activeField}
                    handleOptionSelect={handleOptionSelect}
                    dropdownRef={dropdownRef}
                    errors={errors}
                    touched={touched}
                    setTouched={setTouched}
                    isFormValid={isFormValid}
                />
            </div>
        </div>
    )
}

export default NewBookPage;