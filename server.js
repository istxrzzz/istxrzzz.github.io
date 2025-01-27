const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to handle form submissions
app.post('/send-message', async (req, res) => {
    const { token, channelIds, message, delay } = req.body;

    // Validate input
    if (!token || !channelIds || !message || !delay) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        for (const channelId of channelIds) {
            await new Promise(resolve => setTimeout(resolve, delay * 1000)); // Delay in milliseconds

            await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                content: message,
            }, {
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        res.status(200).json({ success: 'Messages sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send messages.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
