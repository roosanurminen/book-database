const Dropdown = ({value, onCategoryChange}) => {
    return (
        <div>
            <select className="dropdown" value={value} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="all">Kaikki</option>
                <option value="title">Kirjan nimi</option>
                <option value="author">Kirjailija</option>
                <option value="series">Sarja</option>
                <option value="group">Ryhmä</option>
            </select>
        </div>
    )
}

export default Dropdown;