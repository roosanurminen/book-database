import { useState } from 'react';

const SearchBar = () => {
    const { searchValue, setSearchValue} = useState("");

    return (
        <div className='container'>
            <input
                type='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='search'
            />
        </div>
    )
}

export default SearchBar;