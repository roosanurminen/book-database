const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');
const path = require('path');
const { addBook } = require('./addNewBook')
const { getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksBySeries, getBooksByGroup, getAllMissingBooks } = require('./search')
const { editBook } = require('./editBook');
const { deleteAuthorsWithoutBooks, deleteSeriesWithoutBooks, deleteGroupsWithoutBooks } = require('../utils/dbCleanup')
const { addMissingBook } = require('./addMissingBook');
const { getAuthorsSeries, getSeries, getGroupsSeries } = require('./seriesFull')
const { getMissingByAuthor, getMissingBySeries, getMissingByGroup } = require('./getMissingBooks');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// https://www.wisp.blog/blog/ultimate-guide-to-securing-jwt-authentication-with-httponly-cookies

router.post('/api/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db('users').insert({
            user_name: name,
            email,
            password: hashedPassword
        });

        res.status(200).json({message: 'Added user'});
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ message: 'Sähköposti on jo käytössä' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const result = await db('users').where({email}).first();

        if (!result || !(await bcrypt.compare(password, result.password))) {
            return res.status(401).json({message: 'Sähköposti tai salasana virheellinen'})
        }

        const accessToken = jwt.sign({user_id: result.user_id}, process.env.JWT_SECRET, { expiresIn: '5m' });
        const refreshToken = jwt.sign({ user_id: result.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // In production true
            sameSite: 'lax', // In production strict
            maxAge: 300000 //5 min
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // In production true
            sameSite: 'lax', // In production strict
            path: '/api/refresh',
            maxAge: 172800000 //2 days
        });
        res.json({message: 'Logged in', user: { user_name: result.user_name }});
    } catch (err) {
        res.status(500).json({error: 'Server error'})
    }
});


router.post('/api/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({message: 'Refresh token required'});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if (err) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        
        // Create new access token
        const accessToken = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        
        // Set new access token cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, //True in production
            sameSite: 'lax', // In production strict
            maxAge: 300000 //5 min
        });

        res.json({message: 'Access token refreshed'});
    });
});

router.get('/api/check-auth', authMiddleware, async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await db('users').where('user_id', userId).first();
        res.json({
            authenticated: true,
            user: { user_name: user.user_name }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/api/logout', async (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,  // true production
        sameSite: 'lax', // strict production
        path: '/'
    });
    res.clearCookie('refreshToken', { 
        httpOnly: true,
        secure: false, // true production
        sameSite: 'lax', // strict production
        path: '/api/refresh'
    });
    res.json({message: 'Logged out succesfully'});
});

// Add new book
router.post('/api/add-new-book', authMiddleware, addBook);
 

// Get user data
router.get('/api/profile', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const userData = await db('users').where('user_id', userId).first();
        res.json({
            username: userData.user_name,
            email: userData.email});
    } catch (error) {
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// Update user data
router.put('/api/profile', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const {user_name} = req.body;
        const result = await db('users').where('user_id', userId).update({
            user_name,
        });        
        res.json({message: 'User data updated correctly'});
    } catch (error) {
        res.status(500).json({ message: 'Server error updating profile' });
    }
});


// Get all books
router.get('/api/books', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const usersBooks = await db('user_books_detail').where('user_id', userId);
        res.json(usersBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// Get all books
router.get('/api/search/all', authMiddleware, getAllBooks);

// Get books by title
router.get('/api/search/title', authMiddleware, getBooksByTitle);

// Get books by author
router.get('/api/search/author', authMiddleware, getBooksByAuthor);

// Get books by series
router.get('/api/search/series', authMiddleware, getBooksBySeries);

// Get books by group
router.get('/api/search/group', authMiddleware, getBooksByGroup);

// Get all missing books
router.get('/api/search/missing', authMiddleware, getAllMissingBooks);

// Get missing books by author
router.get('/api/missing/author', authMiddleware, getMissingByAuthor);

// Get missing books by series
router.get('/api/missing/series', authMiddleware, getMissingBySeries);

// Get missing books by group
router.get('/api/missing/group', authMiddleware, getMissingByGroup);




// Delete book
router.delete('/api/delete-book', authMiddleware, async(req, res) => {
    try {
        const {bookId} = req.body;
        
        await db('books').where('book_id', bookId).del();
        
        await deleteAuthorsWithoutBooks();
        await deleteSeriesWithoutBooks();
        await deleteGroupsWithoutBooks();

        res.json('Book deleted succesfully');

    } catch (error) {
        res.status(500).json({ message: 'Server error deleting book' });
    }
});


// Get book's data
router.get('/api/edit-book', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const bookId = req.query.bookId;

        const bookData = await db('user_books_detail').where('user_id', userId).andWhere('book_id', bookId).first();
        if (!bookData) {
            return res.status(404).json({ message: 'Book not found or access denied' });
        }

        res.json({
            title: bookData.book_title,
            authors: bookData.author_names,
            seriesName: bookData.series_name,
            seriesPart: bookData.series_part,
            seriesTotalBooks: bookData.total_books,
            group: bookData.group_name,
            releaseYear: bookData.release_date,
            genres: bookData.genre_names,
            bookType: bookData.book_type,
            pages: bookData.page_count,
            condition: bookData.book_condition,
            coverType: bookData.book_cover_type,
            edition: bookData.book_edition,
            language: bookData.book_language,
            isPerfect: bookData.is_perfect,
            notes: bookData.notes
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving book' });
    }
});


// Update book data
router.put('/api/edit-book', authMiddleware, editBook);
    
// Add missing book
router.post('/api/add-missing-book', authMiddleware, addMissingBook);

// Get claiming books data
router.get('/api/claim-book', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const bookId = req.query.bookId;

        const bookData = await db('user_missing_books').where('user_id', userId).andWhere('book_id', bookId).first();
        if (!bookData) {
            return res.status(404).json({ message: 'Book not found or access denied' });
        }

        res.json({
            title: bookData.book_title,
            authors: bookData.author_names,
            seriesName: bookData.series_name,
            seriesPart: bookData.series_part,
            seriesTotalBooks: bookData.total_books,
            group: bookData.group_name
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving book' });
    }
});


// Delete missing book when claimed
router.delete('/api/delete-missing', authMiddleware, async(req, res) => {
    try {
        const userId = req.user_id;
        const bookId = req.query.bookId || req.body.bookId;

        const isUsersBook = await db('missing_books').where('user_id', userId).andWhere('book_id', bookId).first();
        if (!isUsersBook) {
            return res.status(404).json({ message: 'Book not found or access denied' });
        }

        await db('missing_books').where('book_id', bookId).del();
        res.json('Book deleted succesfully');
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting book' });
    }
});

// Authors series full or not
router.get('/api/series-full/author', authMiddleware, getAuthorsSeries);

// Is the series full
router.get('/api/series-full/series', authMiddleware, getSeries);

// Groups series full or not
router.get('/api/series-full/group', authMiddleware, getGroupsSeries);



module.exports = router;