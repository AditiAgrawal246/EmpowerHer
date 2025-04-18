const express = require('express');
// const mongoose = require('mongoose');
const Feedback = require('./models/feedback'); // Adjust path as per your structure

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// // Connect to MongoDB Atlas
// mongoose.connect('mongodb+srv://Aditi:Krishna$246@cluster0.vyqiwlo.mongodb.net/EmpowerHer', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB Atlas');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB Atlas:', error.message);
// });

// Route to handle feedback submissions
app.post('/feedback', async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;

        // Validate input
        if (!name || !email || !message || !rating) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Create a new Feedback instance
        const newFeedback = new Feedback({
            name,
            email,
            message,
            rating,
        });

        // Save feedback to MongoDB
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

// // Utility function to validate email format
// function isValidEmail(email) {
//   // Use a regular expression or a library like 'email-validator'
//   // Example using a simple regular expression:
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
