//import axios from 'axios';
import { useRef, useState, useEffect} from 'react';
import BookForm from '../components/BookForm'
import './NewBookPage.css'
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const MissingBookPage = () => {
    const [bookDetails, setBookDetails] = useState({
        title: '',
        authors: [''],
        seriesName: '',
        seriesPart: '',
        seriesTotalBooks: '',
        group: ''
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
    });

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
            console.log('fetchMatchingData', error);
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

        const numberFields = ['seriesPart', 'seriesTotalBooks'];
        if (numberFields.includes(name) && value && isNaN(Number(value))) {
            msg = 'Vain numerot sallittu';
        }

        if (value === null || value === undefined) {
            msg = 'Pakollinen kenttä';
        } else if (typeof value === 'string' && !value.trim()) {
            msg = 'Pakollinen kenttä';
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
        //setSeriesIsChecked(!isSeriesChecked);
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
        //setGroupIsChecked(!isGroupChecked);
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

    const clearForm = () => {
        setBookDetails({
                title: '',
                authors: [''],
                seriesName: '',
                seriesPart: '',
                seriesTotalBooks: '',
                group: ''
        });
            
        setSeriesIsChecked(false);
        setGroupIsChecked(false);
    }

    const isFormValid = () => {
        const {
            title,
            authors,
        } = bookDetails;

        const required = (
            title.trim() &&
            authors.every(author => author.trim())
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

        return required && seriesRequired && groupRequired && noErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        Object.entries(bookDetails).forEach(([name, value]) => {
            if (name === 'authors') {
                value.forEach((author, idx) => validation(name, author, idx))
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
            const requestBody = bookDetails;

            const response = await axiosInstance.post('/add-missing-book', requestBody);
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
                    options={options}
                    activeField={activeField}
                    handleOptionSelect={handleOptionSelect}
                    dropdownRef={dropdownRef}
                    isMissing={true}
                    errors={errors}
                />
            </div>
        </div>
    )
}

export default MissingBookPage;