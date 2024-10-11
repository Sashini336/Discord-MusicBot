//JotaroKujo0525 note, this is a deed that i should've done a long time ago
require('dotenv').config();
console.log('Environment variables loaded');

const DiscordMusicBot = require("./lib/DiscordMusicBot");
const { exec } = require("child_process");
const express = require('express');
const app = express();
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

app.listen(port, () => {
  console.log(`Status server listening at http://localhost:${port}`);
});

module.exports = {
	getClient,
};
