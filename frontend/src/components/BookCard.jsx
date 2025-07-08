const BookCard = ({ book }) => {

    return (
        <div className='book-card'>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
        </div>
    )
}

export default BookCard;