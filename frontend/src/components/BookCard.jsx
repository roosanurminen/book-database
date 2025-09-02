import './BookCard.css'

const BookCard = ({ book, showAuthor=true, showSeriesPart=false, isMissing=false, onClick }) => {
    const showPart = showSeriesPart && book.series_part !== null;

    return (
        <div className='book-cards'>
            <div className='book-card' onClick={onClick}>
                <h3 className='book-title'>{book.book_title} {showPart ? <span className='series-nro'>{" "}({book.series_part}{"/"}{book.total_books})</span> : null}</h3>
                {showAuthor && <p className='author'>{book.author_names}</p>}
            </div>
        </div>
    )
}

export default BookCard;