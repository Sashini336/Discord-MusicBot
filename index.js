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

const dashboardLink = `${client.config.website}/dashboard`;

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
  res.json({ status: 'online', message: 'Bot is running' });
});
app.get('/health', (req, res) => {
  res.json({
    status: client.isReady() ? 'online' : 'offline',
    uptime: process.uptime() ? process.uptime() : 'offline',  
    memory: process.memoryUsage() ? process.memoryUsage() : 'offline', 
    guilds: client.guilds.cache.size ? client.guilds.cache.size : 'offline',
    timestamp: new Date().toISOString()  
  });
});

const path = require('path');

// Serve the React app
app.use(express.static(path.join(__dirname, 'dashboard', 'build')));
app.use(express.static(path.join(__dirname, 'dashboard', 'out')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dashboard', 'build', 'index.html'));
});

app.get('/api/current-track', (req, res) => {
  const player = client.manager.players.get(guildId);
  if (player && player.queue.current) {
    res.json({
      title: player.queue.current.title,
      artist: player.queue.current.author,
      isPlaying: player.playing
    });
  } else {
    res.json(null);
  }
});

app.get('/api/queue', (req, res) => {
  const player = client.manager.players.get(guildId);
  if (player) {
    res.json(player.queue.map(track => ({
      title: track.title,
      artist: track.author
    })));
  } else {
    res.json([]);
  }
});

app.post('/api/play-pause', (req, res) => {
  const player = client.manager.players.get(guildId);
  if (player) {
    player.pause(!player.paused);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/skip', (req, res) => {
  const player = client.manager.players.get(guildId);
  if (player) {
    player.stop();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/previous', (req, res) => {
  const player = client.manager.players.get(guildId);
  if (player && player.queue.previous) {
    player.queue.unshift(player.queue.previous);
    player.stop();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/add-track', async (req, res) => {
  const { url } = req.body;
  const player = client.manager.players.get(guildId);
  if (player) {
    try {
      const result = await player.search(url, req.user);
      player.queue.add(result.tracks);
      if (!player.playing && !player.paused && !player.queue.size) player.play();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add track' });
    }
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Status server listening at http://localhost:${port}`);
});

module.exports = {
	getClient,
};
