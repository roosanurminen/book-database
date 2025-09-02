import BookForm from '../components/BookForm'
import NavBar from '../components/NavBar';
import { useEffect, useState, useRef } from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const EditBookPage = () => {

    const { bookId } = useParams();
    const navigate = useNavigate();
    const [isFormEdited, setIsFormEdited] = useState(false);
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

    const [originalBookDetails, setOriginalBookDetails] = useState({
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
    })


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
    }, []);



    useEffect(() => {
        const getBookData = async () => {
            try {
                const response = await axiosInstance.get(`/edit-book?bookId=${bookId}`);

                const data = {
                    title: response.data.title,
                    authors: response.data.authors
                            ? response.data.authors.split(',').map(a => a.trim())
                            : [''],
                    seriesName: response.data.seriesName || '',
                    seriesPart: response.data.seriesPart || '',
                    seriesTotalBooks: response.data.seriesTotalBooks || '',
                    group: response.data.group || '',
                    releaseYear: response.data.releaseYear,
                    genres: response.data.genres
                        ? response.data.genres.split(',').map(g=> g.trim())
                        : [''],
                    bookType: response.data.bookType,
                    pages: response.data.pages,
                    condition: response.data.condition,
                    coverType: response.data.coverType,
                    edition: response.data.edition,
                    language: response.data.language,
                    isPerfect: response.data.isPerfect.toString(),
                    notes: response.data.notes || ''
                };

                setBookDetails(data);
                setOriginalBookDetails(data);

                if (data.seriesName !== '') {
                    setSeriesIsChecked(true)
                }

                if (data.group !== '') {
                    setGroupIsChecked(true)
                }
                
            } catch (error) {
                console.log("hahhaaa", error);
            }
        }
        getBookData();
    }, []);


    useEffect(() => {
        const normalizeNumbers = (obj) => ({
            ...obj,
            seriesPart: obj.seriesPart ? Number(obj.seriesPart) : '',
            seriesTotalBooks: obj.seriesTotalBooks ? Number(obj.seriesTotalBooks) : '',
            releaseYear: obj.releaseYear ? Number(obj.releaseYear) : '',
            pages: obj.pages ? Number(obj.pages) : '',
            edition: obj.edition ? Number(obj.edition) : '',
        });

        const normOriginal = normalizeNumbers(originalBookDetails);
        const normNew = normalizeNumbers(bookDetails);


        setIsFormEdited(JSON.stringify(normNew) !== JSON.stringify(normOriginal))
    }, [bookDetails, originalBookDetails])


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
            console.log('fetchMatchingData', error);
        }
    }

    const normalize = (name) => {
        return name
            .replace(/\./g, '')
            .replace(/\-/g, '')
            .replace(/\'/g, '')
            .replace(/\s+/g, '')
            .toLowerCase()
            .trim();
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
        setSeriesIsChecked(!isSeriesChecked);

        if (!isSeriesChecked) {
            setBookDetails(prev => ({
                ...prev,
                seriesName: '',
                seriesPart: '',
                seriesTotalBooks: ''
            }));
            setErrors(prevErr => ({
                ...prevErr,
                seriesName: '',
                seriesPart: '',
                seriesTotalBooks: ''
            }));
        }
    }

    const onGroupChange = async (e) => {
        setGroupIsChecked(!isGroupChecked);

        if (!isGroupChecked) {
            setBookDetails(prev => ({
                ...prev,
                group: ''            
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                group: ''
            }));
        }
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
        })
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

        const notesRequired = isPerfect === 'true' || notes.trim();

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
            const response = await axiosInstance.put(`/edit-book?bookId=${bookId}`, bookDetails);

            toast.success('Kirjan tiedot päivitetty!');
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
            setTouched(false);
            navigate('/');

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
                    isEditMode={true}
                    isFormEdited={isFormEdited}
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
    );
}

export default EditBookPage;