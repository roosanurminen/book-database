const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const db = require('./db');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

/* uncomment in prod and delete the upper one:
app.use(cors({
    origin: ['process.env.VITE_API_URL'], // or http://<your-server-ip> for testing
    credentials: true
}));*/

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('', routes);
app.get('/', (req, res) => {
    res.send('API is running')
})

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});