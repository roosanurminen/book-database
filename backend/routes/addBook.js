const db = require('../db');

function normalizeAuthor(name) {
    return name
        .replace(/\./g, '')
        .replace(/\-/g, '')
        .replace(/\'/g, '')
        .replace(/\s+/g, '')
        .toLowerCase()
        .trim()
}

async function getAuthorIds(authors) {
    const authorsIds = [];

    for (let author of authors) {
        const normalized = normalizeAuthor(author);

        const authorExist = await db('authors').where({normalized_author: normalized}).first();
        if (!authorExist) {
            const [authorData] = await db('authors').returning('author_id').insert({author_name: author, normalized_author: normalized});
            authorsIds.push(authorData.author_id);
        } else {
            authorsIds.push(authorExist.author_id);
        }
    }
    return authorsIds;
}

async function getSeriesId(seriesName, seriesTotalBooks) {
    if (!seriesName && !seriesTotalBooks) {
        return null;
    }

    const seriesExist = await db('series').where({series_name: seriesName}).first();
    if (!seriesExist) {
        const [seriesData] = await db('series').returning('series_id').insert({series_name: seriesName, total_books: seriesTotalBooks});
        return seriesData.series_id;
    } else {
        return seriesExist.series_id
    }
}

async function getGroupId(group) {
    if (!group) {
        return null;
    }
    const groupExist = await db('groups').where({group_name: group}).first();
    if (!groupExist) {
        const [groupData] = await db('groups').returning('group_id').insert({group_name: group});
        return groupData.group_id;
    } else {
        return groupExist.group_id
    }
}

async function getGenreIds(genres) {
    const genreIds = []
    for (let genre of genres) {
        const genreData = await db('genres').returning('genre_id').where({genre_name: genre}).first();
        genreIds.push(genreData.genre_id);
    }
    return genreIds;
}

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
            notes } = req.body;

        
        
        const authorIds = await getAuthorIds(authors);
        const seriesId = await getSeriesId(seriesName, seriesTotalBooks);
        const groupId = await getGroupId(group);
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