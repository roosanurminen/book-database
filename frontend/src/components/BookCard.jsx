import './BookCard.css'

const BookCard = ({ book, showAuthor=true, showSeriesPart=false, onClick }) => {
    return (
        <div className='book-cards'>
            <div className='book-card' onClick={onClick}>
                <h3 className='book-title'>{book.book_title}</h3>
                {showSeriesPart && <h3 className='series-nro'>({book.series_part})</h3>}
                {showAuthor && <p className='author'>{book.author_names}</p>}
            </div>
        </div>
    )
}

export default BookCard;