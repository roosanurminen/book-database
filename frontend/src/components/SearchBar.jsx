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
                                    : category === 'group'
                                        ? 'Hae ryhmän nimellä...'
                                        : 'Näytetään puuttuvat kirjasi'
                }
                disabled={category === 'all' || category === 'missing'}
                onKeyDown={(e) => {
                    console.log(e.key)
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (category !== 'all' && category !== 'missing') {
                           handleSearch(searchValue);
                        }
                    } 
                }} 
            />
            <button 
                className='search-button' 
                type='submit' 
                disabled={category==='all' || category === 'missing'} 
                onClick={() => handleSearch(searchValue)}
                >
                Hae
            </button>
        </div>
    )
}

export default SearchBar;