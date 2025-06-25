import './NewBookForm.css'

const BookForm = ({ bookDetails, handleChange, handleSubmit }) => {
    return (
        <form className="book-form" onSubmit={handleSubmit}>

            <div className='basic-info'>
                <h3 className="basic-title">Perustiedot</h3>
                <div className='field'>
                    <label className='title-label'>Kirjan nimi</label>
                    <input
                        type='text'
                        name='title'
                        value={bookDetails.title}
                        onChange={handleChange}
                        placeholder='Esim. Sormuksen ritarit'
                    />
                    <label className='author-label'>Kirjailija</label>
                    <input
                        type='text'
                        name='author'
                        value={bookDetails.author}
                        onChange={handleChange}
                        placeholder='Esim. J.R.R. Tolkien'
                    />
                </div>
            </div>


            <div className='series-info'>
                <h3 className="series-title">Sarjan tiedot</h3>
                <div className='field'>
                    <label className='series-label'>Sarjan nimi</label>
                    <input
                        type='text'
                        name='series'
                        value={bookDetails.series}
                        onChange={handleChange}
                        placeholder='Esim. Taru sormusten herrasta'
                    />
                    <label className='part-label'>Sarjan osa</label>
                    <input
                        type='number'
                        name='seriesPart'
                        min="0"
                        value={bookDetails.seriesPart}
                        onChange={handleChange}
                        placeholder='1'
                    />
                    <label className='total-books-label'>Kuinka monta osaa?</label>
                    <input
                        type='number'
                        min="1"
                        name='seriesTotalBooks'
                        value={bookDetails.seriesTotalBooks}
                        onChange={handleChange}
                        placeholder='3'
                    />
                </div>
            </div>


            <div className='group-info'>
                <h3 className="group-title">Ryhmän tiedot</h3>
                <div className='field'>
                    <label className='group-label'>Ryhmä</label>
                    <input
                        type='text'
                        name='group'
                        value={bookDetails.group}
                        onChange={handleChange}
                        placeholder='Esim. Keski-Maa'
                    />
                </div>
            </div>


            <div className='details-info'>
                <h3 className="details-title">Tarkemmat tiedot</h3>
                <div className='field'>
                    <label className='genre-label'>Tyylilaji</label>
                    <input
                        type='text'
                        name='genre'
                        value={bookDetails.genre}
                        onChange={handleChange}
                        placeholder='Tyylilajit'
                    />
                    <label className='language-label'>Kieli</label>
                    <input
                        type='text'
                        name='language'
                        value={bookDetails.language}
                        onChange={handleChange}
                        placeholder='Esim. Suomi'
                    />
                    <label className='pages-label'>Sivumäärä</label>
                    <input
                        type='number'
                        name='pages'
                        value={bookDetails.pages}
                        onChange={handleChange}
                        placeholder='Määrä'
                    />
                    <label className='year-label'>Julkaisuvuosi</label>
                    <input
                        type='number'
                        name='releaseYear'
                        value={bookDetails.releaseYear}
                        onChange={handleChange}
                        placeholder='Vuosiluku'
                    />
                    <label className='type-label'>Kirjantyyppi</label>
                    <select 
                        className='type-dropdown'
                        name="bookType"
                        value={bookDetails.bookType}
                        onChange={handleChange}
                    >
                        <option value="novel">Romaani</option>
                        <option value="poetry">Runo</option>
                        <option value="short_story">Novelli</option>
                        <option value="comic">Sarjakuva</option>
                        <option value="nonfiction">Tietokirja</option>
                        <option value="biography">Elämäkerta / Muistelmat</option>
                        <option value="essay">Essee</option>
                        <option value="play">Näytelmä</option>
                    </select>
                </div>
            </div>


            <div className='physical-info'>
                <h3 className="physical-title">Kirjan ulkonäkö</h3>
                <div className='field'>
                    <label className='cover-label'>Kansityyppi</label>
                    <select 
                        className='cover-dropdown' 
                        name="coverType"
                        value={bookDetails.coverType}
                        onChange={handleChange}
                    >
                        <option value="hardcover">Kovakantinen</option>
                        <option value="softcover">Pehmeäkantinen</option>
                        <option value="paperback">Pokkari</option>
                    </select>
                    <label className='condition-label'>Kunto</label>
                    <select 
                        className='condition-dropdown' 
                        name="condition"
                        value={bookDetails.condition}
                        onChange={handleChange}
                    >
                        <option value="new">Uusi</option>
                        <option value="excellent">Erinomainen</option>
                        <option value="good">Hyvä</option>
                        <option value="fair">Tyydyttävä</option>
                        <option value="poor">Heikko</option>                    </select>
                    <label className='perfect-label'>Täydellinen?</label>
                    <select 
                        className='perfect-dropdown' 
                        name="isPerfect"
                        value={bookDetails.isPerfect}
                        onChange={handleChange}
                    >
                        <option value='perfect'>Kyllä</option>
                        <option value='imperfect'>Ei</option>
                    </select>
                    <label className='notes-label'>Huomiot</label>
                    <input
                        type='text'
                        name='notes'
                        value={bookDetails.notes}
                        onChange={handleChange}
                        placeholder='Esim. Kansipaperit puuttuu'
                    />
                </div>
            </div>


            <button type="submit">Lisää kirja</button>
        </form>
    )
}

export default BookForm;