const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, firstName, lastName });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'secretkey');
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'secretkey');
        res.json({ user, token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
