const http = require('http');
const mineflayer = require('mineflayer');

// Servidor web para que Koyeb no apague el bot
http.createServer((req, res) => {
    res.write("Bot activo 24/7");
    res.end();
}).listen(8080);

const botArgs = {
    host: 'hardcoremood.falixsrv.me', // <-- CAMBIA ESTO
    port: 31514,                     // <-- CAMBIA TU PUERTO
    username: 'GuardianAFK',
    version: '1.21.1'
};

function initBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("Bot en el servidor. Saltando para evitar AFK...");
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000); // Salta cada 30 seg
    });

    bot.on('end', () => {
        console.log("Desconectado. Reintentando en 10s...");
        setTimeout(initBot, 10000);
    });

    bot.on('error', (err) => console.log("Error:", err));
}

initBot();
