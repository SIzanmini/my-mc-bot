const mineflayer = require('mineflayer');
const http = require('http');

// --- ১. Render-এর জন্য ফ্রি ওয়েব সার্ভার তৈরি (যাতে বোট স্লিপ না করে) ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Minecraft Bot is running 24/7!\n');
});

// Render ফ্রি প্ল্যানের পোর্ট ১০০০০ ব্যবহার করবে
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`ওয়েব সার্ভার সফলভাবে পোর্ট ${PORT} এ চালু হয়েছে!`);
});

// --- ২. মাইনক্রাফট বোটের সেটিংস ---
const botOptions = {
    host: 'friends324.mcsh.io', 
    port: 25565,                
    username: 'ServerBot_247',  
    version: '1.21.1'           
};

function startBot() {
    console.log('--- বোট চালু করার চেষ্টা করা হচ্ছে ---');
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`${bot.username} সফলভাবে সার্ভারে জয়েন করেছে!`);
        
        // জয়েন করার ২ সেকেন্ড পর অটো-লগইন কমান্ড পাঠানো (LoginSecurity-এর জন্য)
        setTimeout(() => {
            bot.chat('/register BotPass1234 BotPass1234');
            setTimeout(() => bot.chat('/login BotPass1234'), 1000);
        }, 2000);

        // অ্যাডভান্সড অ্যান্টি-AFK মুভমেন্ট (সার্ভারকে ফাঁকি দেওয়ার জন্য)
        setInterval(() => {
            if (!bot.entity) return;
            
            // এলোমেলোভাবে মাথা ঘোরানো ও নড়াচড়া
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
        console.log(`বোট ডিসকানেক্ট হয়েছে। কারণ: ${reason}`);
        console.log('৫ সেকেন্ড পর আবার জয়েন করার চেষ্টা করা হচ্ছে...');
        setTimeout(startBot, 5000);
    });

    bot.on('error', (err) => console.error('বোট এরর:', err.message));
}

// বোট চালু করুন
startBot();
