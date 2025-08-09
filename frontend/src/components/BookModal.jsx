import { useEffect, useRef } from 'react';
import './BookModal.css'

const BookModal = ({ book, onClose, handleEdit, handleDelete }) => {


    if (!book) {
        return null;
    }

    // Close modal on outside click: https://www.youtube.com/watch?v=nCJEHMQ9tOw
    let modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [onClose])




    return (
        <div className='modal'>
            <div className='modal-content' ref={modalRef}>
                <button className='close-btn' onClick={onClose}>x</button>
                <h2>{book.book_title}</h2>
                <h4>Perustiedot:</h4>
                <p>Kirjailija(t): {book.author_names}</p>
                <p>Kieli: {book.book_language}</p>
                <p>Sivumäärä: {book.page_count}</p>
                <p>Julkaisuvuosi: {book.release_date}</p>
                <p>Painos: {book.book_edition}</p>
                <p>Kirjantyyppi: {book.book_type}</p>
                <p>Kirjallisuuslaji(t): {book.genre_names}</p>
                <p>Kuuluu sarjaan: {book.series_name !== null
                            ? book.series_name
                            : '-'}
                </p>
                <p>Sarjan osa: {book.series_part !== 0
                            ? book.series_part
                            : '-'}
                </p>
                <p>Kuuluu ryhmään: {book.group_name !== null
                            ? book.group_name
                            : '-'}
                </p>
                <h4>Ulkoasu:</h4>
                <p>Kunto: {book.book_condition}</p>
                <p>Kansityyppi: {book.book_cover_type}</p>
                <p>Onko täydellinen: {book.is_perfect === true
                            ? 'Kyllä'
                            : 'Ei'}
                </p>
                <p>Huomioita: {book.notes !== null
                            ? book.notes
                            : '-'}
                </p>
                
                <div className='buttons'>
                    <button className='edit-btn' onClick={() => handleEdit(book)}>Muokkaa</button>
                    <button className='delete-btn' onClick={() => handleDelete(book)}>Poista</button>
                </div>
            </div>
        </div>
    )
}

export default BookModal;