const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. LIGHTWEIGHT HTTP SERVER FOR RENDER & CRON-JOB (UNTOUCHED) ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('System Status: Minecraft Bot Optimized and Running 24/7!\n');
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`[Web Server] Active on port ${PORT}`);
});

// --- 2. MINECRAFT BOT CONFIGURATION ---
const botOptions = {
    host: 'friends324.mcsh.io', 
    port: 25565,                
    username: 'ServerBot_247',  
    version: '1.21.1'           
};

// Global variables for Math Quiz
let currentAnswer = null;
let quizActive = false;

function startBot() {
    console.log('[Bot] Initializing deployment...');
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`[Bot] ${bot.username} has successfully spawned in the server.`);
        
        // --- AUTHME / LOGINSECURITY BYPASS (UNTOUCHED) ---
        setTimeout(() => {
            console.log('[Security] Dispatching authentication packets...');
            bot.chat('/register BotPass1234 BotPass1234');
            setTimeout(() => bot.chat('/login BotPass1234'), 1000);
        }, 2000);

        // --- SMART HUMAN-LIKE ANTI-AFK ENGINE (UNTOUCHED) ---
        setInterval(() => {
            if (!bot.entity) return;
            const actionPool = ['look', 'jump', 'sneak', 'idle'];
            const randomAction = actionPool[Math.floor(Math.random() * actionPool.length)];

            switch (randomAction) {
                case 'look':
                    const yaw = Math.random() * Math.PI * 2;
                    const pitch = (Math.random() * Math.PI / 2) - (Math.PI / 4);
                    bot.look(yaw, pitch);
                    break;
                case 'jump':
                    bot.setControlState('jump', true);
                    setTimeout(() => bot.setControlState('jump', false), 500);
                    break;
                case 'sneak':
                    bot.setControlState('sneak', true);
                    setTimeout(() => bot.setControlState('sneak', false), 1000);
                    break;
                case 'idle':
                    break;
            }
        }, 12000);

        // --- OPTIMIZED AUTOMATED MATH QUIZ SYSTEM (Every 3 Minutes) ---
        setInterval(() => {
            if (!bot.entity || quizActive) return;

            const num1 = Math.floor(Math.random() * 50) + 1;
            const num2 = Math.floor(Math.random() * 50) + 1;
            const operators = ['+', '-'];
            const chosenOp = operators[Math.floor(Math.random() * operators.length)];

            if (chosenOp === '+') {
                currentAnswer = num1 + num2;
            } else {
                currentAnswer = num1 - num2;
            }

            quizActive = true;
            bot.chat(`[Quiz] First to solve wins: What is ${num1} ${chosenOp} ${num2}?`);
        }, 180000); // 180000ms = 3 minutes
    });

    // --- OPTIMIZED INTERACTIVE CHAT RESPOND ENGINE ---
    bot.on('chat', (username, message) => {
        // Prevent the bot from talking to itself
        if (username === bot.username) return;

        const cleanMessage = message.toLowerCase().trim();

        // 1. Check for Quiz Answers (Instant String Match Optimization)
        if (quizActive && currentAnswer !== null) {
            if (cleanMessage === currentAnswer.toString()) {
                bot.chat(`🎉 Congratulations @${username}! Correct answer was ${currentAnswer}.`);
                quizActive = false;
                currentAnswer = null;
                return;
            }
        }

        // 2. Automated Block Guide Questions
        if (cleanMessage.includes('!help') || cleanMessage.includes('how to get')) {
            if (cleanMessage.includes('diamond')) {
                bot.chat(`@${username}, Diamonds spawn deep underground! Strip mine around Y level -58.`);
            } else if (cleanMessage.includes('netherite')) {
                bot.chat(`@${username}, Mine for Ancient Debris in the Nether at Y level 15, then melt it!`);
            } else if (cleanMessage.includes('iron')) {
                bot.chat(`@${username}, Iron can be easily found in mountains or caves around Y level 16.`);
            } else {
                bot.chat(`@${username}, I am here 24/7. Ask me about diamonds, iron, or netherite!`);
            }
            return;
        }

        // 3. Casual Conversation Triggers
        if (cleanMessage === 'hi' || cleanMessage === 'hello' || cleanMessage === 'hey') {
            bot.chat(`Hello @${username}! Welcome back to the server. How can I help you today?`);
        } else if (cleanMessage.includes('how are you')) {
            bot.chat(`I am doing great, keeping this server online 24/7! Thanks for asking, @${username}.`);
        } else if (cleanMessage.includes(bot.username.toLowerCase())) {
            bot.chat(`Yes @${username}? I am active and keeping the server running! Type !help for tips.`);
        }
    });

    // --- AUTO EAT MANAGEMENT (UNTOUCHED) ---
    bot.on('health', () => {
        if (bot.food < 15) {
            const food = bot.inventory.items().find(item => item.name.includes('cooked') || item.name === 'bread' || item.name === 'apple');
            if (food) {
                bot.equip(food, 'hand', (err) => {
                    if (!err) {
                        bot.consume((consumeErr) => {
                            if (!consumeErr) console.log('[Survival] Bot consumed food.');
                        });
                    }
                });
            }
        }
    });

    // --- FAILSAFE AUTO-RECONNECT (UNTOUCHED) ---
    bot.on('end', (reason) => {
        console.log(`[Network] Disconnected: ${reason}`);
        setTimeout(startBot, 5000);
    });

    bot.on('error', (err) => console.error('[Error]', err.message));
}

startBot();
