import './BookCard.css'

const BookCard = ({ book }) => {

    return (
        <div className='book-cards'>
            <div className='book-card'>
                <h3>{book.book_title}</h3>
                <p>{book.author_names}</p>
            </div>
        </div>
    )
}

export default BookCard;