const db = require('../db');
const { normalizeAuthor } = require('./addBook')

async function getAllBooks (req, res) {
    try {
        const userId = req.user_id;
        const usersBooks = await db('user_books_detail').where('user_id', userId);
        //console.log(usersBooks);        
        res.json(usersBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByTitle (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;

        const titles = await db('user_books_detail').where('user_id', userId).andWhere('book_title', 'ilike', `%${search}%`);
        res.json(titles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByAuthor (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const normSearch = normalizeAuthor(search);

        const authors = await db('user_books_detail').where('user_id', userId).andWhere('norm_authors', 'ilike', `%${normSearch}%`);
                
        console.log('authors', authors);
        res.json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksBySeries (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;

        const series = await db('user_books_detail').where('user_id', userId).andWhere('series_name', 'ilike', `%${search}%`);
        res.json(series);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getBooksByGroup (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;

        const groups = await db('user_books_detail').where('user_id', userId).andWhere('group_name', 'ilike', `%${search}%`);
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksBySeries, getBooksByGroup }