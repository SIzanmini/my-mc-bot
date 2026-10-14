const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. LIGHTWEIGHT HTTP SERVER FOR RENDER & CRON-JOB (UNTOUCHED) ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Minecraft Bot is running 24/7!\n');
});

// Render free plan port deployment configuration
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Web Server successfully initialized on port ${PORT}!`);
});

// --- 2. MINECRAFT BOT SETTINGS (WITH ECONNRESET NETWORK PACKET PATCH) ---
const botOptions = {
    host: 'dawoodiansmp.mcsh.gg', 
    port: 25565,                
    username: 'ServerBot_247',  
    hideErrors: true,
    checkTimeoutInterval: 60000 // Boost network chunk handler interval to bypass ECONNRESET
};

function startBot() {
    console.log('--- Attempting to boot up the bot ---');
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`${bot.username} has successfully spawned in the server!`);
        
        // Auto-login dispatch sequence exactly after 2 seconds (Untouched)
        setTimeout(() => {
            bot.chat('/register BotPass1234 BotPass1234');
            setTimeout(() => bot.chat('/login BotPass1234'), 1000);
        }, 2000);

        // Advanced Anti-AFK engine loop running smoothly (Untouched)
        setInterval(() => {
            if (!bot.entity) return;
            
            // Random camera look and movements
            const rx = Math.random() * 2 - 1;
            const rz = Math.random() * 2 - 1;
            bot.look(rx, rz);
            
            bot.setControlState('forward', true);
            bot.setControlState('jump', true);
            
            setTimeout(() => {
                bot.setControlState('forward', false);
                bot.setControlState('jump', false);
                bot.setControlState('back', true);
                
                setTimeout(() => {
                    bot.setControlState('back', false);
                }, 800);
            }, 1200);
            
        }, 15000);
    });

    bot.on('end', (reason) => {
        console.log(`Bot disconnected. Reason: ${reason}`);
        console.log('Attempting automated reconnection in 5 seconds...');
        setTimeout(startBot, 5000);
    });

    bot.on('error', (err) => {
        // Silently catch network reset drops and auto-reinitialize connection boundaries
        if (err.code === 'ECONNRESET') {
            console.log('[Network] Suppressing socket network threshold reset. Reconnecting...');
        } else {
            console.error('Bot Error Exception:', err.message);
        }
    });
}

// Fire up the patched instance
startBot();
