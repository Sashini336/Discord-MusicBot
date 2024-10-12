//JotaroKujo0525 note, this is a deed that i should've done a long time ago
require('dotenv').config();
console.log('Environment variables loaded');

const DiscordMusicBot = require("./lib/DiscordMusicBot");
const { exec } = require("child_process");
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 3000;

if (process.env.REPL_ID) {
	console.log("Replit system detected, initiating special `unhandledRejection` event listener.")
	process.on('unhandledRejection', (reason, promise) => {
		promise.catch((err) => {
			if (err.status === 429) {
				console.log("something went wrong whilst trying to connect to discord gateway, resetting...");
				exec("kill 1");
			}
		});
	});
}

const client = new DiscordMusicBot();

console.log("Make sure to fill in the config.js before starting the bot.");

const getClient = () => client;

// Add this new code
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    lastDeployment: client.readyAt ? client.readyAt.toISOString() : null,
    guildCount: client.guilds.cache.size
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    status: client.isReady() ? 'online' : 'offline',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    guilds: client.guilds.cache.size,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/login', (req, res) => {
  // Here you should implement proper authentication logic
  // For now, we'll just return a mock response
  res.json({
    success: true,
    token: 'mock_token',
    user: {
      id: '123',
      username: 'testuser'
    }
  });
});

const path = require('path');

// Serve dashboard static files
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard', 'out')));

// For dashboard routes, serve the index.html file
app.get('/dashboard/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard', 'out', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = {
	getClient,
};
