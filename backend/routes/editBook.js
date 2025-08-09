const db = require('../db');
const { getAuthorIds, getSeriesId, getGroupId, getGenreIds } = require('../utils/fetchIds')
const { deleteAuthorsWithoutBooks, deleteSeriesWithoutBooks, deleteGroupsWithoutBooks } = require('../utils/dbCleanup')

async function editBook(req, res) {
    try {
        const userId = req.user_id;
        const bookId = req.query.bookId;

        console.log(userId)
        console.log(bookId)

        // Check that user has that book
        const isUsersBook = await db('books').where({ book_id: bookId, user_id: userId }).first();
        if (!isUsersBook) {
            return res.status(404).json({ message: 'Book not found or access denied' });
        }

        const {
            title, 
            authors,
            seriesName,
            seriesPart,
            seriesTotalBooks,
            group,
            releaseYear,
            genres,
            bookType,
            pages,
            condition,
            coverType,
            edition,
            language,
            isPerfect,
            notes
        } = req.body;

  
        const authorIds = await getAuthorIds(userId, authors);
        const seriesId = await getSeriesId(userId, seriesName, seriesTotalBooks);
        const groupId = await getGroupId(userId, group);
        const genreIds = await getGenreIds(genres);

        let actualSeriesPart = seriesPart;
        if (seriesId === null) {
            actualSeriesPart = null;
        }

        await db('books').where({ book_id: bookId, user_id: userId }).update({
            book_title: title, 
            series_id: seriesId,
            series_part: actualSeriesPart,
            group_id: groupId,
            book_language: language,
            book_type: bookType,
            release_date: releaseYear,
            page_count: pages,
            book_condition: condition,
            book_cover_type: coverType,
            book_edition: edition,
            is_perfect: isPerfect,
            notes: notes,
        });
        
        await db('books_authors').where({book_id: bookId}).del();
        for (let authorId of authorIds) {
            await db('books_authors').insert({
                book_id: bookId,
                author_id: authorId
            });
        }

        await db('books_genres').where({ book_id: bookId }).del();
        for (let genreId of genreIds) {
            await db('books_genres').insert({
                book_id: bookId,
                genre_id: genreId
            })
        }

        await deleteAuthorsWithoutBooks();
        await deleteSeriesWithoutBooks();
        await deleteGroupsWithoutBooks();

        res.json({ message: 'Book updated successfully' });

    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({error: 'Server error while updating book'});
    }

}

module.exports = { editBook }