import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
//import axios from 'axios';
import './SearchPanel.css';
import axiosInstance from '../api/axiosInstance';

const SearchPanel = ({ setBooks, category, setCategory, searchValue, setSearchValue, setSubmitValue, setHasSearched  }) => {

    const [options, setOptions] = useState([]);
    

    const isSeriesFull = async (value) => {
        try {
            
            const response = await axiosInstance.get(`/series-full/${category}`, { params: {search: value} });
            return response.data;

        } catch (error) {
             console.log('isSeriesFull', error);
        }

    }

    const missingBooks = async (value) => {
        try {
            const response = await axiosInstance.get(`/missing/${category}`, {
                params: {search: value}
            });

            return response.data;

        } catch (error) {
             console.log('isSeriesFull', error);
        }
    }

    const fetchSearch = async (value) => {
        try {
            const response = await axiosInstance.get(`/search/${category}`, {
                params: {search: value, exact: true}
            });

            const data = response.data;

            if (category === 'author') {
                const input = normalize(value);
                let author = input;
                const seriesArray = await isSeriesFull(value);
                const mbooksArray = await missingBooks(value);

                console.log("missing:", mbooksArray)
                for (const book of data) {
                    const normAuthors = book.norm_authors.split(',').map(name => name.trim());
                    const authors = book.author_names.split(',').map(name => name.trim());

                    normAuthors.forEach((norm, idx) => {
                        if (norm.includes(input)) {
                            author = authors[idx];
                        }
                    });
                }
                setBooks({ books: data, authorName: author, seriesFull: seriesArray, missingBooks: mbooksArray});
            } else if (category === 'series' || category === 'group') {
                const seriesArray = await isSeriesFull(value);
                const mbooksArray = await missingBooks(value);

                console.log("missing:", mbooksArray)
                setBooks({ books: data, authorName: '', seriesFull: seriesArray, missingBooks: mbooksArray});
            } else {
                setBooks({ books: data, authorName: '', seriesFull: [], missingBooks: [] });
            }

        } catch (error) {
            console.log('fetchSearch', error);
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

    const fetchMatchingData = async (value) => {
        try {
            const response = await axiosInstance.get(`/search/${category}`, {
                params: {search: value}
            });

            const data = response.data;
            let options = [];

            if (category === 'title') {
                options = data.map(opt => opt.book_title);
            } else if (category === 'author') {
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

    const handleInputChange = (value) => {
        setSearchValue(value);
        if (value !== '') {
            fetchMatchingData(value);
        } else {
            setOptions([]);
        }
    }

    const handleSearch = (value) => {
        if (!value || value.trim() === "") {
            return;
        }
        
        setSearchValue(value);
        setSubmitValue(value);      
        fetchSearch(value);
        setOptions([]);
        setHasSearched(true);
    };

    useEffect(() => {
        if (category === 'all' || category === 'missing') {
            fetchSearch();
        }
    }, [category]);

    const onCategoryChange = (value) => {
        setCategory(value);
        setSearchValue('');
        setOptions([]);
        setHasSearched(false);
    }

    return (
        <div className='search-container'>
            <div className='search-panel'>
                <Dropdown className='dropdown' 
                    value={category} 
                    onCategoryChange={onCategoryChange} 
                />
                <SearchBar className='searchbar' 
                    category={category} 
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue} 
                    handleSearch={handleSearch} 
                    handleInputChange={handleInputChange}
                />
            </div>
            {options.length > 0 && (
                <div className='search-results'>
                    {options.map((value) => (
                        <div
                            key={value} className='search-option' onClick={() => handleSearch(value)}
                        >
                            {value} 
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchPanel;