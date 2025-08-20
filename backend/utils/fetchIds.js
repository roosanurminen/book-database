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


async function getAuthorIds(userId, authors) {
    const authorsIds = [];

    for (let author of authors) {

        const authorExist = await db('authors').where({author_name: author, user_id: userId}).first();
        if (!authorExist) {
            const normalized = normalizeAuthor(author);
            
            const [authorData] = await db('authors').returning('author_id').insert({user_id: userId, author_name: author, normalized_author: normalized});
            authorsIds.push(authorData.author_id);
        } else {
            authorsIds.push(authorExist.author_id);
        }
    }
    return authorsIds;
}

async function getSeriesId(userId, seriesName, seriesTotalBooks) {
    if (!seriesName && !seriesTotalBooks) {
        return null;
    }

    const seriesExist = await db('series').where({series_name: seriesName, user_id: userId}).first();
    if (!seriesExist) {
        const [seriesData] = await db('series').returning('series_id').insert({user_id: userId, series_name: seriesName, total_books: seriesTotalBooks});
        return seriesData.series_id;
    } else {
        await db('series').where({ series_id: seriesExist.series_id }).update({user_id: userId, series_name: seriesName, total_books: seriesTotalBooks})
        return seriesExist.series_id
    }
}

async function getGroupId(userId, group) {
    if (!group) {
        return null;
    }
    const groupExist = await db('groups').where({group_name: group, user_id: userId}).first();
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


module.exports = { getAuthorIds, getSeriesId, getGroupId, getGenreIds, normalizeAuthor };