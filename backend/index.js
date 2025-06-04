const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin:"*"}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('', routes);

app.get('/', (req, res) => {
    res.send('API is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});