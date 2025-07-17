import './BookCard.css'

const BookCard = ({ book, showAuthor=true, showSeriesPart=false }) => {

    return (
        <div className='book-cards'>
            <div className='book-card'>
                <h3 className='book-title'>{book.book_title}</h3>
                {showSeriesPart && <h3 className='series-nro'>({book.series_part})</h3>}
                <p>{book.author_names}</p>
            </div>
        </div>
    )
}

export default BookCard;