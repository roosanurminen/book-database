import BookCard from './BookCard';
import './BookList.css'
import BookModal from './BookModal';
import { useState } from 'react';



const BookList = ({ books, authorName, category, searchValue, hasSearched, handleEdit, handleDelete, setSelectedBook, selectedBook}) => {

    const bookSeries = () => {
        const copy = books.map(book => ({
            ...book,
            series_name: book.series_name || 'Ööö', // Just to make the single books to appear last in the list
            series_part: book.series_part || 0      
        }));

        const groupedObj = Object.groupBy(copy, book => book.series_name);
        const groupedArray = Object.entries(groupedObj);
        
        groupedArray.sort((a, b) => a[0].localeCompare(b[0]));
        
        const sortBooks = groupedArray.flatMap(([series, books]) => {
            const sorted = [...books].sort((a, b) => {
                if (series === 'Ööö') {
                    return a.book_title.localeCompare(b.book_title);
                } else {
                    return a.series_part - b.series_part;
                }
            });
            return sorted;
        });
        return sortBooks;
    }

    let content;

    if (category === 'all') {

        if (!books || books.length === 0) {
            return ( <div>Ei vielä kirjoja :(</div>)
        }

        const sortBooks = books;
        /*sortBooks.sort(function(a, b) {
            return a.author_names.localeCompare(b.author_names) || a.book_title.localeCompare(b.book_title);
        })*/
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
                    <h2>Hakutulos: {searchValue}</h2>
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

        const sortBooks = bookSeries();
        
        
        let series = 'Ööö'
        for (let i = 0; i < sortBooks.length; ++i) {
            if (sortBooks[i].series_name !== 'Ööö') {
                series = sortBooks[i].series_name
            }
        }
        if (series === 'Ööö') {
            return (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <h2>{authorName} -kirjat</h2>
                        {sortBooks.map(book => (
                            <BookCard key={book.book_id} book={book} showAuthor={false} onClick={() => setSelectedBook(book)}/>
                        ))}
                    </div>
                </div>
            )
        }

        let prevSeries = null; 
        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <h2>{authorName} -kirjat</h2>
                    {sortBooks.map(book => {
                        const order = [];
                        if (book.series_name !== prevSeries) {
                            let header = book.series_name;
                            if (header === 'Ööö') {
                                header = 'Muut';
                            }
                            order.push(<h3 key={`${header}-${book.book_id}`}>{header}:</h3>)
                            prevSeries=book.series_name;
                        }
                        
                        order.push(<BookCard key={book.book_id} book={book} showAuthor={false} onClick={() => setSelectedBook(book)}/>)
                        return order;
                    })}
                </div>
            </div>
        )
    } else if (category === 'series') {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return ( <div>Haullasi ei löytynyt yhtään sarjaa :(</div>)
        }

        const seriesName = books[0].series_name;

        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <h2>{seriesName}:</h2>
                    {books.map(book => (
                        <BookCard key={book.book_id} book={book} showSeriesPart={true} onClick={() => setSelectedBook(book)}/>
                    ))}
                </div>
            </div>
        )
    } else {
        if (!hasSearched) return null;

        if (!books || books.length === 0) {
            return ( <div>Haullasi ei löytynyt yhtään ryhmää :(</div>)
        }

        const groupName = books[0].group_name;
        

        // Sort books by the series
        const sortBooks = bookSeries();
        let series = 'Ööö'
        for (let i = 0; i < sortBooks.length; ++i) {
            if (sortBooks[i].series_name !== 'Ööö') {
                series = sortBooks[i].series_name
            }
        }
        if (series === 'Ööö') {
            return (
                <div className='book-list'>
                    <div className='book-list-content'>
                        <h2>{groupName}:</h2>
                        {sortBooks.map(book => (
                            <BookCard key={book.book_id} book={book} onClick={() => setSelectedBook(book)}/>
                        ))}
                    </div>
                </div>
            )
        }

        let prevSeries = null; 
        content = (
            <div className='book-list'>
                <div className='book-list-content'>
                    <h2>{groupName}:</h2>
                    {sortBooks.map(book => {
                        const order = [];
                        if (book.series_name !== prevSeries) {
                            let header = book.series_name;
                            if (header === 'Ööö') {
                                header = 'Muut';
                            }
                            order.push(<h3 key={`${header}-${book.book_id}`}>{header}:</h3>)
                            prevSeries=book.series_name;
                        }
                        
                        order.push(<BookCard key={book.book_id} book={book} onClick={() => setSelectedBook(book)}/>)
                        return order;
                    })}
                </div>
            </div>
        )
    }


    return (
        <>
            {content}
            {selectedBook && (
                <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
        </>
    )
}

export default BookList;