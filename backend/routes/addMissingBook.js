const db = require('../db');
const { getAuthorIds, getSeriesId, getGroupId } = require('../utils/fetchIds')

async function addMissingBook (req, res) {
    try {
        const userId = req.user_id;
        const {
            title, 
            authors,
            seriesName,
            seriesPart,
            seriesTotalBooks,
            group
        } = req.body;

        const authorIds = await getAuthorIds(userId, authors);
        const seriesId = await getSeriesId(userId, seriesName, seriesTotalBooks);
        const groupId = await getGroupId(userId, group);
        
        let actualSeriesPart = seriesPart;
        
        if (seriesId === null) {
            actualSeriesPart = null;
        }

        const [bookData] = await db('missing_books').returning('book_id').insert({
            user_id: userId,
            book_title: title,
            series_id: seriesId,
            series_part: actualSeriesPart,
            group_id: groupId
        });        

        for (let authorId of authorIds) {
            await db('missing_books_authors').insert({
                book_id: bookData.book_id,
                author_id: authorId
            });
        }

        res.json({message: 'Book added'});

    } catch (err) {
        res.status(500).json({error: 'Server error'})
    }
}

module.exports = { addMissingBook }