import { useState } from 'react';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import './SearchPanel.css';

const SearchPanel = () => {
    const [category, setCategory] = useState('all');


    const handleSearch = (e) => {
        
    }

    return (
        <div className='search-panel'>
           <Dropdown className='dropdown' value={category} onChange={setCategory} />
           <SearchBar className='searchbar' category={category} handleSearch={handleSearch}/>
        </div>
    )
}

export default SearchPanel;