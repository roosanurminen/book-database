const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await db('users').where({email}).first();
        
        if (!result || !(await bcrypt.compare(password, result.password))) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({userId: result.user_id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // later true?
            maxAge: 86400000
        })

        res.status(200).json({message: 'Logged in', token});
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({error: 'Server error'})
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie('token', {

    }).status(200)
        .json({message: "You're now logged out."});
});

// Edit book's data
router.put('/edit-book-data', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

    } catch (err) {
        console.error('Error editing book data: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Delete existing book
router.delete('/:bookId', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const bookId = req.params.bookId;

    } catch (err) {
        console.error('Error deleting book: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Add new book
router.post('/add-new-book', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const {title, author, series } = req.body;

    } catch (err) {
        console.error('Error adding new book: ', err);
        res.status(500).json({error: 'Server error'})
    }
}); 

// Get books
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        

    } catch (err) {
        console.error('Error getting user books: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

// Get specific book's data
router.get('/book-data/:bookId', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        

    } catch (err) {
        console.error('Error getting book data: ', err);
        res.status(500).json({error: 'Server error'})
    }
});

module.exports = router;