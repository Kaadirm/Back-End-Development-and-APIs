const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Define a schema for your URL model
const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
});

// Create a model based on the schema
const Url = mongoose.model('Url', urlSchema);

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.use(express.urlencoded({ extended: true }));

app.post('/api/shorturl', function (req, res) {
    const { url } = req.body;
    const regex = /^(http|https):\/\/[^ "]+$/;

    if (!regex.test(url)) {
        res.json({ error: 'invalid url' });
    } else {
        // Generate short_url and save it to the database
        const short_url = generateShortUrl();
        saveToDatabase(url, short_url);
        res.json({ original_url: url, short_url });
    }
});

function generateShortUrl() {
    // Generate a unique short_url using a custom algorithm or library
    // For example, you can use a combination of timestamp and random number
    const timestamp = Date.now().toString();
    const randomNumber = Math.floor(Math.random() * 10000).toString();
    return timestamp + randomNumber;
}

async function saveToDatabase(url, short_url) {
    // Connect to your MongoDB database using Mongoose or any other library
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create a new URL document and save it to the database
        const newUrl = new Url({ original_url: url, short_url });

        await newUrl.save(); // Move this line inside the try block
    } catch (error) {
        console.error(error);
    }
}

app.get('/api/shorturl/:short_url', async function (req, res) {
    const { short_url } = req.params;

    try {
        // Find the original_url based on the short_url in the database
        const url = await Url.findOne({ short_url });

        if (url) {
            // Redirect to the original_url
            res.redirect(url.original_url);
        } else {
            res.json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'An error occurred' });
    }
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
