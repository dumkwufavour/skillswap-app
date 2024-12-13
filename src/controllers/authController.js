const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


// const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "User already exists" });

//         const user = await User.create({ name, email, password });
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

//         res.status(201).json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         console.log("Login request received for email:", email);

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("User not found");
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log("Incorrect password");
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Create JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         console.log("Login successful. Token created.");
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Server error", error: error.message });

//     }
// };

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Create new user with hashed password
        const user = await User.create({ name, email, password: hashedPassword });

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

        // Send response with user info and token
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login request received for email:", email);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login successful. Token created.");
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Create a password reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create a link for the reset password page (the user will click this)
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        // Step 2: Send the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password (or app-specific password)
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link to reset your password: ${resetLink}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Step 3: Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Step 3: Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(400).json({ message: 'User not found' });

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Save the new password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { requestPasswordReset, resetPassword, registerUser, loginUser };
