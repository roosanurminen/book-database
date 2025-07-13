import BookCard from './BookCard';
import './BookList.css'


const BookList = ({ books }) => {

    return (
        <div className='book-list'>
            {books.map(book => (
                <BookCard key={book.book_id} book={book} />
            ))}
        </div>
    )
}

export default BookList;