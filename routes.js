const express = require('express');
const { register, login, getPreferences, updatePreferences } = require('./users');
const { authenticate } = require('./middleware');
const { getNews } = require('./news');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/preferences', authenticate, getPreferences);
router.put('/preferences', authenticate, updatePreferences);
router.get('/news', authenticate, getNews);

module.exports = router;
