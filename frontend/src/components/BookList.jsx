import BookCard from './BookCard';
import './BookList.css'
import BookModal from './BookModal';
import ToggleSwitch from './ToggleSwitch';

const BookList = ({ books, authorName, seriesFull, missingBooks, category, searchValue, submitValue, hasSearched, handleEdit, handleAdd, handleDelete, handleMissingDelete, setSelectedBook, selectedBook, showAlsoMissing, setShowAlsoMissing, showToggle }) => {
    const bookSeries = (value = books) => {
        const copy = value.map(book => ({
            ...book,
            sort_series_name: book.series_name || 'Ööö', // Just to make the single books to appear last in the list
            sort_series_part: book.series_part || 0      
        }));

        const groupedObj = Object.groupBy(copy, book => book.sort_series_name);
        const groupedArray = Object.entries(groupedObj);
        
        groupedArray.sort((a, b) => a[0].localeCompare(b[0]));
        
        const sortBooks = groupedArray.flatMap(([series, value]) => {
            const sorted = [...value].sort((a, b) => {
                if (series === 'Ööö') {
                    return a.book_title.localeCompare(b.book_title);
                } else {
                    return a.sort_series_part - b.sort_series_part;
                }
            });
            return sorted;
        });
        return sortBooks.map(({ sort_series_name, sort_series_part, ...book }) => book);
    }

    let content;
    let hasSeries = false;

    if (category === 'all') {

        if (!books || books.length === 0) {
            return ( <div>Ei vielä kirjoja :(</div>)
        }

        const sortBooks = books;

        sortBooks.sort(function(a, b) {
            return a.book_title.localeCompare(b.book_title);
        })

        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <h2>Kaikki kirjasi</h2>
                    {sortBooks.map(book => (
                        <BookCard key={book.book_id} book={book} onClick={() => setSelectedBook(book)}/>
                    ))}
                </div>
            </div>
        )
    } else if (category === 'title') {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return (<div className='book-list'>Haullasi ei löytynyt yhtään kirjaa :(</div>)
        }
        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <h2>Hakutulos: {submitValue}</h2>
                    {books.map(book => (
                        <BookCard key={book.book_id} book={book} onClick={() => setSelectedBook(book)}/>
                    ))}
                </div>
            </div>
        )
    } else if (category === 'author') {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return ( <div>Haullasi ei löytynyt yhtään kirjailijaa :(</div>)
        }

        const combinedBooks = showAlsoMissing ? [...books.map(b=> ({...b,is_missing: false})), ...missingBooks.map(b=>({...b, is_missing: true}))] : [...books.map(b=> ({...b,is_missing: false}))]
        const sortBooks = bookSeries(combinedBooks);
        
        hasSeries = sortBooks.some(book => book.series_name !== null);

        if (!hasSeries) {
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <div className='book-list-header'>
                            <h2>{authorName} -kirjat</h2>
                            {showToggle && (
                                <ToggleSwitch
                                    checked={showAlsoMissing}
                                    onChange={() => setShowAlsoMissing(prev => !prev)}
                                />
                            )}
                        </div>
                        {sortBooks.map(book => (
                            <BookCard key={`${book.is_missing ? 'missing' : 'owned'}-${book.book_id}`} book={book} showAuthor={false} onClick={() => setSelectedBook(book)}/>
                        ))}
                    </div>
                </div>
            )
        } else {
            let prevSeries = null; 
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <div className='book-list-header'>
                            <h2>{authorName} -kirjat</h2>
                            {showToggle && (
                                <ToggleSwitch
                                    checked={showAlsoMissing}
                                    onChange={() => setShowAlsoMissing(prev => !prev)}
                                />
                            )}
                        </div>
                        {sortBooks.map(book => {
                            const order = [];
                            if (book.series_name !== prevSeries) {
                                let header = book.series_name;
                                if (header === null) {
                                    header = 'Erilliset';
                                }

                                const seriesNames = seriesFull.map(s => s.series_name);

                                if (seriesNames.includes(header)) {
                                    order.push(<h3 className='series' key={`${header}-${book.book_id}`}>{header}{" "}
                                                <span className='ready'>valmis</span>
                                                </h3>)
                                } else {
                                    order.push(<h3 className='series' key={`${header}-${book.book_id}`}>{header}</h3>)
                                }
                                
                                prevSeries=book.series_name;
                            }
                            
                            order.push(<BookCard key={`${book.is_missing ? 'missing' : 'owned'}-${book.book_id}`} book={book} showSeriesPart={true} showAuthor={false} onClick={() => setSelectedBook(book)}/>)
                            return order;
                        })}
                    </div>
                </div>
            )
        }

        
    } else if (category === 'series') {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return ( <div>Haullasi ei löytynyt yhtään sarjaa :(</div>)
        }

        const combinedBooks = showAlsoMissing ? [...books.map(b=> ({...b,is_missing: false})), ...missingBooks.map(b=>({...b, is_missing: true}))] : [...books.map(b=> ({...b,is_missing: false}))]
        const seriesName = combinedBooks[0].series_name;
        const isFull = seriesFull && seriesFull.length > 0 ? seriesFull[0].is_full : false;
        const sortedBooks = combinedBooks.sort((a, b) => a.series_part-b.series_part)

        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <div className='book-list-header'>
                            <h2>{seriesName} {isFull ? <span className='ready'>{" "}valmis</span> : null}</h2>
                            {showToggle && (
                                <ToggleSwitch
                                    checked={showAlsoMissing}
                                    onChange={() => setShowAlsoMissing(prev => !prev)}
                                />
                            )}
                        </div>
                    {sortedBooks.map(book => (
                        <BookCard 
                            key={`${book.is_missing ? 'missing' : 'owned'}-${book.book_id}`} 
                            book={book} 
                            showSeriesPart={true} 
                            isMissing={book.is_missing} 
                            onClick={() => setSelectedBook(book)}
                        />
                    ))}
                </div>
            </div>
        )
    } else if (category === 'group') {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return ( <div>Haullasi ei löytynyt yhtään ryhmää :(</div>)
        }

        const groupName = books[0].group_name;

        const combinedBooks = showAlsoMissing ? [...books.map(b=> ({...b,is_missing: false})), ...missingBooks.map(b=>({...b, is_missing: true}))] : [...books.map(b=> ({...b,is_missing: false}))]
        // Sort books by the series
        const sortBooks = bookSeries(combinedBooks);

        hasSeries = sortBooks.some(book => book.series_name !== null);

        if (!hasSeries) {
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <div className='book-list-header'>
                            <h2>{groupName}</h2>
                            {showToggle && (
                                <ToggleSwitch
                                    checked={showAlsoMissing}
                                    onChange={() => setShowAlsoMissing(prev => !prev)}
                                />
                            )}
                        </div>
                        {sortBooks.map(book => (
                            <BookCard 
                                key={`${book.is_missing ? 'missing' : 'owned'}-${book.book_id}`} 
                                book={book} 
                                onClick={() => setSelectedBook(book)}
                            />
                        ))}
                    </div>
                </div>
            )
        } else {
            let prevSeries = null; 
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <div className='book-list-header'>
                            <h2>{groupName}</h2>
                            {showToggle && (
                                <ToggleSwitch
                                    checked={showAlsoMissing}
                                    onChange={() => setShowAlsoMissing(prev => !prev)}
                                />
                            )}
                        </div>
                        {sortBooks.map(book => {
                            const order = [];
                            if (book.series_name !== prevSeries) {
                                let header = book.series_name;
                                if (header === null) {
                                    header = 'Erilliset';
                                }

                                const seriesNames = seriesFull.map(s => s.series_name);

                                if (seriesNames.includes(header)) {
                                    order.push(<h3 className='series' key={`${header}-${book.book_id}`}>{header}{" "}
                                                <span className='ready'>valmis</span>
                                            </h3>)
                                } else {
                                    order.push(<h3 className='series' key={`${header}-${book.book_id}`}>{header}</h3>)
                                }
                                
                                prevSeries=book.series_name;
                            }
                            
                            order.push(<BookCard key={`${book.is_missing ? 'missing' : 'owned'}-${book.book_id}`} book={book} showSeriesPart={true} onClick={() => setSelectedBook(book)}/>)
                            return order;
                        })}
                    </div>
                </div>
            )
        }
    } else {
        if (!books || books.length === 0) {
            return ( <div>Sinulla ei ole puuttuvia kirjoja :D</div>)
        }

        // Sort books by the series
        const sortBooks = bookSeries();

        hasSeries = sortBooks.some(book => book.series_name !== null);

        if (!hasSeries) {
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <h2>Puuttuvat kirjasi</h2>
                        {sortBooks.map(book => (
                            <BookCard key={book.book_id} book={book} onClick={() => setSelectedBook(book)}/>
                        ))}
                    </div>
                </div>
            )
        } else {
            let prevSeries = null; 
            content = (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <h2>Puuttuvat kirjasi</h2>
                        {sortBooks.map(book => {
                            const order = [];
                            if (book.series_name !== prevSeries) {
                                let header = book.series_name;
                                if (header === null) {
                                    header = 'Erilliset';
                                }
                                order.push(<h3 className='series' key={`${header}-${book.book_id}`}>{header}:</h3>)
                                prevSeries=book.series_name;
                            }
                            
                            order.push(<BookCard key={book.book_id} book={book} showSeriesPart={true} onClick={() => setSelectedBook(book)}/>)
                            return order;
                        })}
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {content}
            {selectedBook && (
                <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} handleEdit={handleEdit} handleAdd={handleAdd} handleDelete={handleDelete} handleMissingDelete={handleMissingDelete} isMissing={category === 'missing' || selectedBook.is_missing}/>
            )}
        </>
    )
}

export default BookList;