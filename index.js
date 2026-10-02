const mineflayer = require('mineflayer');

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
        
        // --- AuthMe/LoginSecurity পারফেক্ট অটো-লগইন টাইমার ---
        // বোট জয়েন করার ৩ সেকেন্ড পর নিজে নিজেই লগইন কমান্ড পাঠাবে
        setTimeout(() => {
            console.log('পাসওয়ার্ড দিয়ে লগইন করার চেষ্টা করা হচ্ছে...');
            bot.chat('/login BotPass1234'); 
        }, 3000);

        // অ্যান্টি-AFK মুভমেন্ট লুপ
        setInterval(() => {
            if (!bot.entity) return;
            bot.setControlState('forward', true);
            bot.setControlState('jump', true);
            
            setTimeout(() => {
                bot.setControlState('forward', false);
                bot.setControlState('jump', false);
                bot.setControlState('back', true);
                setTimeout(() => bot.setControlState('back', false), 1000);
            }, 1500);
        }, 20000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`[Chat] ${username}: ${message}`);
    });

    bot.on('end', (reason) => {
        console.log(`বোট ডিসকানেক্ট হয়েছে। কারণ: ${reason}`);
        console.log('৫ সেকেন্ড পর আবার জয়েন করার চেষ্টা করা হচ্ছে...');
        setTimeout(startBot, 5000);
    });

    bot.on('error', (err) => {
        console.error('বোট এরর:', err.message);
    });
}

startBot();
