const mineflayer = require('mineflayer');

// আপনার সার্ভারের সঠিক তথ্য এখানে সেট করা হয়েছে
const botOptions = {
    host: 'friends324.mcsh.io', // আপনার MCServerHost সার্ভারের IP
    port: 25565,                // ডিফল্ট পোর্ট
    username: 'ServerBot_247',  // বোটের গেমের নাম (যা গেমে দেখাবে)
    version: '1.21.1'           // আপনার সার্ভারের সঠিক ভার্সন
};

function startBot() {
    console.log('--- বোট চালু করার চেষ্টা করা হচ্ছে ---');
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`${bot.username} সফলভাবে সার্ভারে জয়েন করেছে!`);
        
        // --- LoginSecurity অটো-লগইন সিস্টেম ---
        // বোট জয়েন করার ২ সেকেন্ড পর নিজে নিজেই রেজিস্টার এবং লগইন করার চেষ্টা করবে
        setTimeout(() => {
            // বোট যদি প্রথমবার ঢুকে থাকে, তবে এই কমান্ডটি তাকে রেজিস্টার করবে
            bot.chat('/register BotPass1234 SizanErBot24/7');
            
            // বোট যদি আগে থেকেই রেজিস্টার থাকে, তবে এই কমান্ডটি তাকে লগইন করাবে
            setTimeout(() => {
                bot.chat('/login SizanErBot24/7');
            }, 1000);
        }, 2000);

        // অ্যান্টি-AFK মুভমেন্ট লুপ (প্রতি ২০ সেকেন্ডে বোটটি সামনে-পিছনে হাঁটবে ও লাফাবে)
        setInterval(() => {
            if (!bot.entity) return;
            
            // একটু সামনে হাঁটো এবং লাফাও
            bot.setControlState('forward', true);
            bot.setControlState('jump', true);
            
            setTimeout(() => {
                bot.setControlState('forward', false);
                bot.setControlState('jump', false);
                
                // আবার একটু পিছনে হাঁটো
                bot.setControlState('back', true);
                setTimeout(() => bot.setControlState('back', false), 1000);
            }, 1500);
            
        }, 20000);
    });

    // চ্যাটে কেউ বোটকে ডাকলে বা মেসেজ দিলে কনসোলে দেখা যাবে
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`[Chat] ${username}: ${message}`);
    });

    // সার্ভার রিস্টার্ট হলে বা বোট কিক খেলে অটো-রিস্টার্ট হবে
    bot.on('end', (reason) => {
        console.log(`বোট ডিসকানেক্ট হয়েছে। কারণ: ${reason}`);
        console.log('৫ সেকেন্ড পর আবার জয়েন করার চেষ্টা করা হচ্ছে...');
        setTimeout(startBot, 5000);
    });

    // কোনো এরর আসলে বোট ক্র্যাশ করা আটকাবে
    bot.on('error', (err) => {
        console.error('বোট এরর:', err.message);
    });
}

// বোট চালু করুন
startBot();
