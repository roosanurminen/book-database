import { useState } from 'react';

const SearchBar = () => {
    const { searchValue, setSearchValue} = useState("");

    return (
        <div className='searchbar'>
            <input
                type='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Hae...'
            />
            <button className='search-button' type="submit">Hae</button>
        </div>
    )
}

export default SearchBar;