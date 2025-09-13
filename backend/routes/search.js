const db = require('../db');
const {normalizeAuthor} =  require('../utils/fetchIds');

async function getAllBooks (req, res) {
    try {
        const userId = req.user_id;
        const usersBooks = await db('user_books_detail').where('user_id', userId);
        res.json(usersBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByTitle (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const exact = req.query.exact === 'true';

        let titles;
        if (exact) {
            titles = await db('user_books_detail').where('user_id', userId).andWhereRaw('LOWER("book_title") = ?', search.toLowerCase().trim());
        } else {
            titles = await db('user_books_detail').where('user_id', userId).andWhere('book_title', 'ilike', `%${search}%`);
        }

        res.json(titles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByAuthor (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const normSearch = normalizeAuthor(search);
        const exact = req.query.exact === 'true';

        let authors;
        if (exact) {
            
            authors = await db('user_books_detail')
                .where('user_id', userId)
                .andWhereRaw(`? = ANY(string_to_array(norm_authors, ','))`, [normSearch]);
        } else {
            authors = await db('user_books_detail').where('user_id', userId).andWhere('norm_authors', 'ilike', `%${normSearch}%`);
        }
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksBySeries (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const exact = req.query.exact === 'true';

        let series;
        if (exact) {
            series = await db('user_books_detail').where('user_id', userId).andWhereRaw('LOWER("series_name") = ?', search.toLowerCase().trim());
        } else {
            series = await db('user_books_detail').where('user_id', userId).andWhere('series_name', 'ilike', `%${search}%`);
        }

        res.json(series);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByGroup (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const exact = req.query.exact === 'true';

        let groups;
        if (exact) {
            groups = await db('user_books_detail').where('user_id', userId).andWhereRaw('LOWER("group_name") = ?', search.toLowerCase().trim());
        } else {
            groups = await db('user_books_detail').where('user_id', userId).andWhere('group_name', 'ilike', `%${search}%`);
        }

        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getAllMissingBooks(req, res) {
    try {
        const userId = req.user_id;
        const missingBooks = await db('user_missing_books').where('user_id', userId);
        res.json(missingBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksBySeries, getBooksByGroup, getAllMissingBooks }