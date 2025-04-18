const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const connectDB = require('./db'); // Import the DB connection utility
const User = require('./models/User'); // Import the User model
const cors = require('cors');
const Feedback = require('./models/feedback');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors({
    origin: '*', 
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
}));


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory within 'frontend'
app.use(express.static(path.join(__dirname, '../Frontend/public')));
// Connect to MongoDB
connectDB();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || '7409d09dd16b416cc13cca7b89194824393d105bad8c37b639f8dbf21c054ea046137d93d1aae05a369e2d29fc5d1dfdc6909c25b61714597b6ab502a4b21d89';
// Sign Up Endpoint
app.post('/auth/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username);
        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with success
        res.json({ success: true });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Login Endpoint
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username);
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username , name: user.name  }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with success and token
        res.json({ success: true, token , name: user.username });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/submit-feedback', async (req, res) => {
    const { name, email, message, rating } = req.body;

    try {
        // Create a new feedback instance and save to the database
        const feedback = new Feedback({ name, email, message, rating });
        await feedback.save();

        // Respond with success
        res.status(200).json({ message: 'Feedback received successfully!' });
    } catch (error) {
        // Handle any errors during saving
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving feedback.' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});