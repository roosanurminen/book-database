import './BookForm.css'
import Select from 'react-select';

const allGenres = [
  { value: 'Dekkari', label: 'Dekkari' },
  { value: 'Dystopia', label: 'Dystopia' },
  { value: 'Elämäkerta / Muistelmat', label: 'Elämäkerta / Muistelmat' },
  { value: 'Erotiikka', label: 'Erotiikka' },
  { value: 'Fantasia', label: 'Fantasia' },
  { value: 'Historia', label: 'Historia' },
  { value: 'Huumori', label: 'Huumori' },
  { value: 'Jännitys', label: 'Jännitys' },
  { value: 'Kauhu', label: 'Kauhu' },
  { value: 'Lapset', label: 'Lapset' },
  { value: 'Nuoret', label: 'Nuoret' },
  { value: 'Psykologinen', label: 'Psykologinen' },
  { value: 'Romantiikka', label: 'Romantiikka' },
  { value: 'Scifi', label: 'Scifi' },
  { value: 'Sota', label: 'Sota' },
  { value: 'Tietokirja', label: 'Tietokirja' },
  { value: 'Trilleri', label: 'Trilleri' }
];


const BookForm = ({ bookDetails, handleChange, handleSubmit, isSeriesChecked, onSeriesChange, isGroupChecked, onGroupChange, addAuthorField, removeAuthorField, handleGenreChange, isEditMode=false, isFormEdited=false, options, activeField, handleOptionSelect, dropdownRef, isMissing=false, isClaimed=false, errors, touched, setTouched}) => {
    return (
        <form 
            className='book-form' 
            onSubmit={handleSubmit} 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (isEditMode) {
                        if (isFormEdited) {
                            handleSubmit(e);
                        }
                    } else {
                        handleSubmit(e);
                    }
                } 
            }} 
            noValidate
            >
            <h1> {isEditMode
                    ? 'Muokkaa kirjan tietoja' 
                    : isMissing 
                        ? 'Lisää puuttuva kirja'
                        : isClaimed
                            ? 'Lisää kokoelmaan' 
                            : 'Lisää uusi kirja'
                }
            </h1>
            <div className='group'>
                <h3>Perustiedot</h3>
                <div className='basic-group'>
                    <div className='field'>
                    <label htmlFor='title'>Kirjan nimi</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={bookDetails.title}
                            onChange={handleChange}
                            placeholder='Esim. Sormuksen ritarit'
                            autoComplete='off'
                            className={errors.title ? 'input-error' : ''}
                        />
                        {errors.title && <p className='error-p'>{errors.title}</p>}
                    </div>

                    {bookDetails.authors.map((author, index) => (
                        <div className='author-field' key={index}>
                            <label htmlFor={`${index}`}>{index === 0 ? 'Kirjailija' : `Kirjailija ${index+1}`}</label>
                                <input
                                    type='text'
                                    name='authors'
                                    id={`${index}`}
                                    value={author}
                                    onChange={handleChange}
                                    placeholder='Esim. J.R.R. Tolkien'
                                    autoComplete='off'
                                    className={errors.authors[index] ? 'input-error' : ''}
                                />
                                {errors.authors[index] && <p className='error-p'>{errors.authors[index]}</p>}
                                {options.length > 0 && activeField === `author-${index}` && (
                                    <div className='option-dropdown' ref={dropdownRef}>
                                        {options.map((option) => (
                                            <div
                                                key={option} className='option' onClick={() => handleOptionSelect(option, `author-${index}`)}>
                                                {option} 
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {index !== 0 && (
                                    <button type='button' onClick={() => removeAuthorField(index)} className='remove-btn'>-</button>
                                )}
                        </div>
                    ))}
                        {(bookDetails.authors).length < 5 && (
                            <div className='field'>
                                <button className='author-btn' type='button' onClick={addAuthorField}>+</button>
                            </div>
                        )}
                    
                </div>
            </div>


            <div className='group'>
                <h3>Sarjan tiedot</h3>
                    <div className='radio'>
                        <label htmlFor='no-series-radio'>
                        <input
                                type='radio'
                                name='series-radio'
                                value='no'
                                id='no-series-radio'
                                checked={isSeriesChecked === false}
                                onChange={onSeriesChange} 
                            />
                            Ei
                        </label>
                        <label htmlFor='yes-series-radio'>
                            <input
                                type='radio'
                                name='series-radio'
                                value='yes'
                                id='yes-series-radio'
                                checked={isSeriesChecked === true}
                                onChange={onSeriesChange} 
                            />
                            Kyllä
                        </label>
                    </div>
                    <div className='series-group'>
                    {isSeriesChecked && (
                        <>
                            <div className='field'>
                                <label htmlFor='series-name'>Sarjan nimi</label>
                                <input
                                    type='text'
                                    name='seriesName'
                                    id='series-name'
                                    value={bookDetails.seriesName}
                                    onChange={handleChange}
                                    placeholder='Esim. Taru sormusten herrasta'
                                    autoComplete='off'
                                    required={Boolean(isSeriesChecked)}
                                    className={errors.seriesName ? 'input-error' : ''}
                                />
                                {errors.seriesName && <p className='error-p'>{errors.seriesName}</p>}
                                    
                                {options.length > 0 && activeField === 'series' && (
                                    <div className='option-dropdown' ref={dropdownRef}>
                                        {options.map((option) => (
                                            <div
                                                key={option} className='option' onClick={() => handleOptionSelect(option, 'series')}>
                                                {option} 
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='field'>
                                <label htmlFor='part'>Sarjan osa</label>
                                <input
                                    type='text'
                                    name='seriesPart'
                                    id='part'
                                    min='1'
                                    step='1'
                                    inputMode='numeric'
                                    value={bookDetails.seriesPart}
                                    onChange={handleChange}
                                    placeholder='1'
                                    autoComplete='off'
                                    required={Boolean(isSeriesChecked)}
                                    className={errors.seriesPart ? 'input-error' : ''}
                                />
                                {errors.seriesPart && <p className='error-p'>{errors.seriesPart}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='totalBooks'>Sarjan osien määrä</label>
                                <input
                                    type='text'
                                    name='seriesTotalBooks'
                                    id='totalBooks'
                                    min='1'
                                    step='1'
                                    inputMode='numeric'
                                    value={bookDetails.seriesTotalBooks}
                                    onChange={handleChange}
                                    placeholder='1'
                                    autoComplete='off'
                                    required={Boolean(isSeriesChecked)}
                                    className={errors.seriesTotalBooks ? 'input-error' : ''}
                                />
                                {errors.seriesTotalBooks && <p className='error-p'>{errors.seriesTotalBooks}</p>}
                            </div>
                        </>
                        )}
                </div>
            </div>


            <div className='group'>
                <h3>Ryhmän tiedot</h3>
                <div className='radio'>
                    <label htmlFor='no-group-radio'>
                    <input
                            type='radio'
                            name='group-radio'
                            value='no'
                            id='no-group-radio'
                            checked={isGroupChecked === false}
                            onChange={onGroupChange} 
                        />
                        Ei
                    </label>
                    <label htmlFor='yes-group-radio'>
                        <input
                            type='radio'
                            name='group-radio'
                            value='yes'
                            id='yes-group-radio'
                            checked={isGroupChecked === true}
                            onChange={onGroupChange} 
                        />
                        Kyllä
                    </label>
                </div>
                {isGroupChecked && (
                    <div className='field'>
                        <label htmlFor='group'>Ryhmä</label>
                        <input
                            type='text'
                            name='group'
                            id='group'
                            value={bookDetails.group}
                            onChange={handleChange}
                            placeholder='Esim. Keski-Maa'
                            autoComplete='off'
                            required={Boolean(isGroupChecked)}
                            className={errors.group ? 'input-error' : ''}
                        />
                        {errors.group && <p className='error-p'>{errors.group}</p>}
                        
                        {options.length > 0 && activeField === 'group' && (
                            <div className='option-dropdown' ref={dropdownRef}>
                                {options.map((option) => (
                                    <div
                                        key={option} className='option' onClick={() => handleOptionSelect(option, 'group')}>
                                        {option} 
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!isMissing && (
                <>
                    <div className='group'>
                        <h3>Tarkemmat tiedot</h3>
                        <div className='details-group'>
                            <div className='field'>
                                <label htmlFor='genres'>Tyylilaji</label>
                                <Select 
                                    classNamePrefix='dropdown'
                                    inputId='genres'
                                    options={allGenres}
                                    value={allGenres.filter(option => bookDetails.genres.includes(option.value))}
                                    onChange={(g) => {handleGenreChange(g), setTouched(true)}}
                                    isMulti
                                    placeholder=""
                                    className={errors.genres && touched ? 'input-error' : ''}
                                >
                                </Select>
                                {errors.genres && touched && <p className='error-p'>{errors.genres}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='bookType'>Kirjantyyppi</label>
                                <select 
                                    className={`dropdown ${errors.bookType ? 'input-error' : ''}`} 
                                    name='bookType'
                                    id='bookType'
                                    value={bookDetails.bookType}
                                    onChange={handleChange}
                                    
                                >
                                    <option value=''></option>
                                    <option value='Romaani'>Romaani</option>
                                    <option value='Runot'>Runot</option>
                                    <option value='Novelli'>Novelli</option>
                                    <option value='Sarjakuva'>Sarjakuva</option>
                                    <option value='Tietokirja'>Tietokirja</option>
                                    <option value='Esseet'>Esseet</option>
                                    <option value='Näytelmä'>Näytelmä</option>
                                    <option value='Kuvakirja'>Kuvakirja</option>
                                </select>
                                {errors.bookType && <p className='error-p'>{errors.bookType}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='releaseYear'>Julkaisuvuosi</label>
                                <input
                                    type='text'
                                    name='releaseYear'
                                    id='releaseYear'
                                    min='0'
                                    max='2100'
                                    step='1'
                                    inputMode='numeric'
                                    autoComplete='off'
                                    value={bookDetails.releaseYear}
                                    onChange={handleChange}
                                    placeholder='Esim. 1950'
                                    className={errors.releaseYear ? 'input-error' : ''}
                                />
                                {errors.releaseYear && <p className='error-p'>{errors.releaseYear}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='language'>Kieli</label>
                                <input
                                    type='text'
                                    name='language'
                                    id='language'
                                    value={bookDetails.language}
                                    onChange={handleChange}
                                    placeholder='Esim. Suomi'
                                    autoComplete='off'
                                    className={errors.language ? 'input-error' : ''}
                                />
                                {errors.language && <p className='error-p'>{errors.language}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='pages'>Sivumäärä</label>
                                <input
                                    type='text'
                                    name='pages'
                                    id='pages'
                                    min='0'
                                    step='1'
                                    inputMode='numeric'
                                    autoComplete='off'
                                    value={bookDetails.pages}
                                    onChange={handleChange}
                                    placeholder='Esim. 300'
                                    className={errors.pages ? 'input-error' : ''}
                                />
                                {errors.pages && <p className='error-p'>{errors.pages}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='edition'>Painos</label>
                                <input
                                    type='text'
                                    name='edition'
                                    id='edition'
                                    min='0'
                                    step='1'
                                    inputMode='numeric'
                                    autoComplete='off'
                                    value={bookDetails.edition}
                                    onChange={handleChange}
                                    placeholder='Esim. 1'
                                    className={errors.edition ? 'input-error' : ''}
                                />
                                {errors.edition && <p className='error-p'>{errors.edition}</p>}
                            </div>
                        </div>
                    </div>


                    <div className='group'>
                        <h3>Kirjan ulkonäkö</h3>
                        <div className='physical-group'>
                            <div className='field'>
                                <label htmlFor='coverType'>Kansityyppi</label>
                                <select 
                                    className={`dropdown ${errors.coverType ? 'input-error' : ''}`} 
                                    name='coverType'
                                    id='coverType'
                                    value={bookDetails.coverType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=''></option>
                                    <option value='Kovakantinen'>Kovakantinen</option>
                                    <option value='Pehmeäkantinen'>Pehmeäkantinen</option>
                                    <option value='Pokkari'>Pokkari</option>
                                </select>
                                {errors.coverType && <p className='error-p'>{errors.coverType}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='condition'>Kunto</label>
                                <select 
                                    className={`dropdown ${errors.condition ? 'input-error' : ''}`} 
                                    name='condition'
                                    id='condition'
                                    value={bookDetails.condition}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=''></option>
                                    <option value='Uusi'>Uusi</option>
                                    <option value='Erinomainen'>Erinomainen</option>
                                    <option value='Hyvä'>Hyvä</option>
                                    <option value='Tyydyttävä'>Tyydyttävä</option>
                                    <option value='Heikko'>Heikko</option>                    
                                </select>
                                {errors.condition && <p className='error-p'>{errors.condition}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='isPerfect'>Täydellinen</label>
                                <select 
                                    className={`dropdown ${errors.isPerfect ? 'input-error' : ''}`}
                                    name='isPerfect'
                                    id='isPerfect'
                                    value={bookDetails.isPerfect}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=''></option>
                                    <option value='true'>Kyllä</option>
                                    <option value='false'>Ei</option>
                                </select>
                                {errors.isPerfect && <p className='error-p'>{errors.isPerfect}</p>}
                            </div>
                            <div className='field'>
                                <label htmlFor='notes'>Huomiot</label>
                                <input
                                    type='text'
                                    name='notes'
                                    id='notes'
                                    value={bookDetails.notes}
                                    onChange={handleChange}
                                    placeholder={
                                        bookDetails.isPerfect === 'true' 
                                            ? 'Ei huomioita'
                                            : bookDetails.isPerfect === 'false'
                                                ? 'Esim. Kansipaperit puuttuu'
                                                : 'Valitse ensin täydellisyys'}
                                    required={bookDetails.isPerfect !== 'true'}
                                    disabled={bookDetails.isPerfect !== 'false'}
                                    autoComplete='off'
                                    className={errors.notes ? 'input-error' : ''}
                                />
                                {errors.notes && <p className='error-p'>{errors.notes}</p>}
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            <button className='submit-btn' type='submit' disabled={isEditMode && !isFormEdited}>{isEditMode ? 'Tallenna muutokset' : 'Lisää kirja'}</button>
        </form>
    )
}

export default BookForm;