module.exports = {
    helpCmdPerPage: 10,
    lyricsMaxResults: 5,
    adminId: process.env.ADMIN_ID ,
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    port: process.env.PORT || 4200,
    scopes: ["identify", "guilds", "applications.commands"],
    inviteScopes: ["bot", "applications.commands"],
    serverDeafen: true,
    defaultVolume: 100,
    supportServer: process.env.SUPPORT_SERVER || "https://discord.gg/sbySMS7m3v",
    Issues: "https://github.com/SudhanPlayz/Discord-MusicBot/issues",
    permissions: 277083450689,
    disconnectTime: 30000,
    twentyFourSeven: true,
    autoQueue: false,
    autoPause: true,
    autoLeave: true,
    debug: process.env.DEBUG === 'true',
    cookieSecret: process.env.COOKIE_SECRET || "CookieSecret",
    website: process.env.WEBSITE || "https://worker-production-cfbc.up.railway.app",
    nodes: [
        {
            identifier: "Main Node",
            host: process.env.LAVALINK_HOST,
            port: parseInt(process.env.LAVALINK_PORT),
            password: process.env.LAVALINK_PASSWORD,
            retryAmount: 200,
            retryDelay: 40,
            secure: process.env.LAVALINK_SECURE === 'true',
        },
    ],
    embedColor: "#2f3136",
    presence: {
        status: "online",
        activities: [
            {
                name: "Toni Storaro",
                type: "Sviri",
            },
        ],
    },
    iconURL: "https://cdn.darrennathanael.com/icons/spinning_disk.gif",
};
