const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');

// User registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, role: user.role, id: user._id }, // Payload
            process.env.JWT_SECRET_KEY // Secret key from environment variables
            // No `expiresIn` option means the token won't expire
        );
        
        

        res.status(201).json({ success: true, token, role:user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, role: user.role, id: user._id }, // Payload
            process.env.JWT_SECRET_KEY // Secret key from environment variables
            // No `expiresIn` option means the token won't expire
        );
        

        res.status(200).json({ success: true, token, role:user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get user profile
exports.getprofile = async (req, res) => {
    try {
        // Log user information

        const Data = await User.findOne({email:req.user.email}).select('-password');
        res.status(200).json({ success: true, user: Data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Get all users (admin only)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
