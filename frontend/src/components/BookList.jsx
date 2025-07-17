import BookCard from './BookCard';
import './BookList.css'


const BookList = ({ books, category, searchValue, hasSearched }) => {

    if (!books || books.length === 0) {
        return (
            <div>Ei vielä kirjoja :(</div>
        )
    }

    if (category === 'all') {
        const sortBooks = books;
        /*sortBooks.sort(function(a, b) {
            return a.author_names.localeCompare(b.author_names) || a.book_title.localeCompare(b.book_title);
        })*/
        sortBooks.sort(function(a, b) {
            return a.book_title.localeCompare(b.book_title);
        })

        return (
            <div>
                <h2>Kaikki kirjasi</h2>
                {sortBooks.map(book => (
                    <BookCard key={book.book_id} book={book} />
                ))}
            </div>
        )
    } else if (category === 'title') {
        if (!hasSearched) return null;
        return (
            <div>
                <h2>Hakutulos: {searchValue}</h2>
                {books.map(book => (
                    <BookCard key={book.book_id} book={book} />
                ))}
            </div>
        )
    } else if (category === 'author') {
        if (!hasSearched) return null;

        const copy = books.map(book => ({
            ...book,
            series_name: book.series_name || 'Ööö', // Just to make the single books to appear last in list
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
        console.log(sortBooks)
        
        let prevSeries = null;
        
        return (
            <div>
                <h2>{searchValue} -kirjat</h2>
                {sortBooks.map(book => {
                    const order = [];
                    if (book.series_name !== prevSeries) {
                        let header = book.series_name;
                        if (header === 'Ööö') {
                            header = 'Muut';
                        }
                        console.log(book)
                        order.push(<h3 key={`${header}-${book.book_id}`}>{header}:</h3>)
                        prevSeries=book.series_name;
                    }
                    
                    order.push(<BookCard key={book.book_id} book={book} showAuthor={false}/>)
                    return order;
                })}
            </div>
        )
    } else if (category === 'series') {
        if (!hasSearched) return null;

        return (
            <div>
                <h2>{searchValue}:</h2>
                {books.map(book => (
                    <BookCard key={book.book_id} book={book} showSeriesPart={true}/>
                ))}
            </div>
        )
    } else {
        if (!hasSearched) return null;

        return (
            <div>
                <h2>{searchValue}:</h2>
                {books.map(book => (
                    <BookCard key={book.book_id} book={book} />
                ))}
            </div>
        )
    }



    
}

export default BookList;