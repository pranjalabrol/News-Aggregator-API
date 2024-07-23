const axios = require('axios');
const users = require('./users'); // Ensure you import the users array or replace it with the correct source

const getNews = async (req, res) => {
    try {
        const user = users.find(u => u.email === req.user.email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const preferences = user.preferences;
        const news = [];

        for (const preference of preferences) {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${preference}&apiKey=your_news_api_key`);
            news.push(...response.data.articles);
        }

        if (news.length === 0) {
            return res.status(404).send('No news articles found');
        }

        res.json({ news });
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
};

module.exports = { getNews };
