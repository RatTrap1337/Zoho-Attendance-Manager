const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Store your credentials safely in .env file
const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const TOKEN_FILE = process.env.TOKEN_FILE || "access_token.json";

async function refreshAccessToken() {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        throw new Error('Missing required environment variables: ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN');
    }

    const url = "https://accounts.zoho.eu/oauth/v2/token";
    const params = new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token"
    });

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status === 200) {
            const tokenData = response.data;
            const accessToken = tokenData.access_token;

            await fs.writeFile(TOKEN_FILE, JSON.stringify({ access_token: accessToken }, null, 2));
            return accessToken;
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`Token refresh failed: ${error.response.data || error.response.statusText}`);
        } else {
            throw new Error(`Token refresh failed: ${error.message}`);
        }
    }
}

async function getAccessToken() {
    try {
        // Check if token file exists
        await fs.access(TOKEN_FILE);

        // Read the token file
        const tokenFileContent = await fs.readFile(TOKEN_FILE, 'utf8');
        const tokenData = JSON.parse(tokenFileContent);

        return tokenData.access_token;
    } catch (error) {
        // If file doesn't exist or can't be read, refresh the token
        return await refreshAccessToken();
    }
}

// Export functions for use in other modules
module.exports = {
    refreshAccessToken,
    getAccessToken
};

// Example usage (uncomment to test)
/*
(async () => {
    try {
        const token = await getAccessToken();
        console.log('Access token:', token);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
*/