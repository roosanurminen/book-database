import { useState } from 'react';

const SearchBar = ({ category, handleSearch }) => {
    const { searchValue, setSearchValue} = useState('');
    


    return (
        <div className='searchbar'>
            <input
                type='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                    category === 'all' 
                        ? 'Näytetään kaikki kirjasi'
                        : category === 'author'
                            ? 'Hae kirjailijan nimellä...'
                            : category === 'title'
                                ? 'Hae kirjan nimellä...'
                                : category === 'series'
                                    ? 'Hae sarjan nimellä...'
                                    : 'Hae ryhmän nimellä...'
                }
                disabled={category === 'all'}
            />
            <button className='search-button' type='submit' disabled={category==='all'} onClick={handleSearch}>Hae</button>
        </div>
    )
}

export default SearchBar;