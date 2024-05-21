const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Failed to connect to the database:', error);
    });

// api connections will be made available here
app.post('/api/users', (req, res) => {
    // Handle creating a new user
});

app.post('/api/users/:_id/exercises', (req, res) => {
    // Handle adding exercises for a specific user
});

app.get('/api/users/:_id/logs', (req, res) => {
    // Handle retrieving exercise logs for a specific user
    // You can access query parameters using req.query
    const { from, to, limit } = req.query;
    // Implement the logic to retrieve exercise logs based on the provided query parameters
});

///////////////////////////////////

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
