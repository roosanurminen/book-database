const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');
const path = require('path');

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
        const user_id = req.user_id;
        const user = await db('users').where('user_id', user_id).first();
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

// Edit book's data
router.put('/edit-book-data', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user_id;

    } catch (err) {
        console.error('Error editing book data: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Delete existing book
router.delete('/:bookId', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user_id;
        const bookId = req.params.bookId;

    } catch (err) {
        console.error('Error deleting book: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Add new book
router.post('/add-new-book', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user_id;
        const {title, author, series } = req.body;

    } catch (err) {
        console.error('Error adding new book: ', err);
        res.status(500).json({error: 'Server error'})
    }
}); 

// Get books
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user_id;
        

    } catch (err) {
        console.error('Error getting user books: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Get specific book's data
router.get('/book-data/:bookId', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user_id;
        

    } catch (err) {
        console.error('Error getting book data: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

module.exports = router;