const SearchBar = ({ category, searchValue, handleInputChange, handleSearch }) => {    
    return (
        <div className='searchbar'>
            <input
                type='search'
                value={searchValue}
                onChange={(e) => handleInputChange(e.target.value)}
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
            <button className='search-button' type='submit' disabled={category==='all'} onClick={() => handleSearch(searchValue)}>Hae</button>
        </div>
    )
}

export default SearchBar;