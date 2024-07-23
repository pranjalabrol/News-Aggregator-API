const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];
const secret = 'your_jwt_secret';

const register = async (req, res) => {
    const { name, email, password, preferences } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword, preferences: preferences || [] });
    res.status(200).send('User registered successfully');
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    res.json({ token });
};

const getPreferences = (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json({ preferences: user.preferences });
};

const updatePreferences = (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).send('User not found');
    }
    if (!Array.isArray(req.body.preferences)) {
        return res.status(400).send('Preferences must be an array');
    }
    user.preferences = req.body.preferences;
    res.status(200).send('Preferences updated');
};

module.exports = { register, login, getPreferences, updatePreferences };
