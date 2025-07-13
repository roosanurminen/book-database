const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');
const path = require('path');
const { addBook } = require('./addBook')
const { getAllBooks, getBooksByTitle, getBooksByAuthor, getBooksBySeries, getBooksByGroup } = require('./search')

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
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const result = await db('users').where({email}).first();

        if (!result || !(await bcrypt.compare(password, result.password))) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const accessToken = jwt.sign({user_id: result.user_id}, process.env.JWT_SECRET, { expiresIn: '5m' });

        const refreshToken = jwt.sign({ user_id: result.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // In production true
            sameSite: 'lax', // In production strict
            maxAge: 300000 // 5 min
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // In production true
            sameSite: 'lax', // In production strict
            path: '/api/refresh',
            maxAge: 172800000 // 2 days
        });
        res.json({message: 'Logged in', user: { user_name: result.user_name }});
    } catch (err) {
        console.error('Error logging in:', err);
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
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        
        // Create new access token
        const accessToken = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        
        // Set new access token cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, //True in production
            sameSite: 'lax', // In production strict
            maxAge: 300000 // 5 min
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
        console.error(err);
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
        console.log(userData)
        res.json({
            username: userData.user_name,
            email: userData.email});
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});


// Get all books
router.get('/api/books', authMiddleware, async(req, res) => {
    try {
        console.log("oolalaa")
        const userId = req.user_id;
        const usersBooks = await db('user_books_detail').where('user_id', userId);
        console.log(usersBooks);        
        res.json(usersBooks);
    } catch (error) {
        console.error(error);
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




module.exports = router;