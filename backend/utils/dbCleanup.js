const db = require('../db');


async function deleteAuthorsWithoutBooks() {
    await db('authors')
        .whereNotIn('author_id', db('books_authors').select('author_id'))
        .whereNotIn('author_id', db('missing_books_authors').select('author_id'))
        .del();
}

async function deleteSeriesWithoutBooks() {
    await db('series')
        .whereNotIn('series_id', db('books').whereNotNull('series_id').select('series_id'))
        .whereNotIn('series_id', db('missing_books').whereNotNull('series_id').select('series_id'))
        .del();
}

async function deleteGroupsWithoutBooks() {
    await db('groups')
    .whereNotIn('group_id', db('books').whereNotNull('group_id').select('group_id'))
    .whereNotIn('group_id', db('missing_books').whereNotNull('group_id').select('group_id'))
    .del();
}

module.exports = { deleteAuthorsWithoutBooks, deleteSeriesWithoutBooks, deleteGroupsWithoutBooks};