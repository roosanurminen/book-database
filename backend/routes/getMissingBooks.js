const db = require('../db');

async function getMissingByAuthor (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;
        const response = await db('user_missing_books').where('user_id', userId).andWhere('author_names', 'ilike', `%${search}%`);
                
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getMissingBySeries (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;

        const response = await db('user_missing_books').where('user_id', userId).andWhere('series_name', 'ilike', `%${search}%`);
        res.json(response);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getMissingByGroup (req, res) {
    try {
        const userId = req.user_id;
        const search = req.query.search;

        const response = await db('user_missing_books').where('user_id', userId).andWhere('group_name', 'ilike', `%${search}%`);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getMissingByAuthor, getMissingBySeries, getMissingByGroup }