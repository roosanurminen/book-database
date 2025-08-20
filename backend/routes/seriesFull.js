const db = require('../db');
const {normalizeAuthor} = require('../utils/fetchIds');

async function getAuthorsSeries (req, res) {
    try {
        const userId = req.user_id;
        const author = req.query.search;
        const response = await db('series_full').where('user_id', userId).andWhere('is_full', true).whereILike('author_names', `%${author}%`).select('series_name');
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getSeries (req, res) {
    try {
        const userId = req.user_id;
        const series = req.query.search;
        const response = await db('series_full').where('user_id', userId).andWhere('series_name', series).select('is_full');
        console.log("ggg", response);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getGroupsSeries (req, res) {
    try {
        const userId = req.user_id;
        const group = req.query.search;
        const response = await db('series_full').where('user_id', userId).andWhere('group_name', group).andWhere('is_full', true).select('series_name', 'is_full');
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getAuthorsSeries, getSeries, getGroupsSeries }