const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Define a schema for your User model
const userSchema = new mongoose.Schema({
    username: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Define a schema for your Exercise model
const ExerciseSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    description: String,
    duration: Number,
    date: Date
});

// Create a model based on the schema
const Exercise = mongoose.model('Exercise', ExerciseSchema);

// api connections will be made available here
app.post('/api/users', async (req, res) => {
    const { username } = req.body;
    const userObj = new User({ username });
    try {
        const newUser = await userObj.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

app.post('/api/users/:_id/exercises', (req, res) => {
    // Handle adding exercises for a specific user
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const newExercise = {
                description,
                duration,
                date: date ? new Date(date) : new Date()
            };

            user.exercises.push(newExercise);

            user.save()
                .then(() => {
                    res.json({ message: 'Exercise added successfully' });
                })
                .catch((error) => {
                    res.status(400).json({ error: 'Failed to add exercise' });
                });
        })
        .catch((error) => {
            res.status(400).json({ error: 'Failed to find user' });
        });
});

app.get('/api/users/:_id/logs', (req, res) => {
    const { from, to, limit } = req.query;
    User.findById(req.params._id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            let exercises = user.exercises;

            if (from) {
                exercises = exercises.filter(
                    (exercise) => exercise.date >= new Date(from)
                );
            }

            if (to) {
                exercises = exercises.filter(
                    (exercise) => exercise.date <= new Date(to)
                );
            }

            if (limit) {
                exercises = exercises.slice(0, parseInt(limit));
            }

            res.json({
                _id: user._id,
                username: user.username,
                count: exercises.length,
                log: exercises
            });
        })
        .catch((error) => {
            res.status(400).json({ error: 'Failed to find user' });
        });
});

///////////////////////////////////

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
