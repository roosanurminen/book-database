const db = require('../db');
const { getAuthorIds, getSeriesId, getGroupId, getGenreIds } = require('../utils/fetchIds')

async function addBook (req, res) {
    try {
        const userId = req.user_id;
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

        const [bookData] = await db('books').returning('book_id').insert({
            user_id: userId,
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
            notes: notes
        });        

        for (let authorId of authorIds) {
            await db('books_authors').insert({
                book_id: bookData.book_id,
                author_id: authorId
            });
        }

        for (let genreId of genreIds) {
            await db('books_genres').insert({
                book_id: bookData.book_id,
                genre_id: genreId
            })
        }

        res.json({message: 'Book added'});

    } catch (err) {
        console.error('Error adding new book: ', err);
        res.status(500).json({error: 'Server error'})
    }
}

module.exports = { addBook }