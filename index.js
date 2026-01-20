const http = require('http');
const mineflayer = require('mineflayer');

// SERVIDOR WEB PARA KOYEB (Evita que el build falle)
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot funcionando");
});

server.listen(process.env.PORT || 8080, () => {
    console.log("Servidor HTTP listo");
});

// CONFIGURACIÓN DEL BOT
const botArgs = {
    host: 'hardcoremood.falixsrv.me', // REEMPLAZA ESTO
    port: 31514,                     // REEMPLAZA ESTO
    username: 'GuardianAFK',
    version: '1.21.1'
};

function initBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => console.log("Bot en el server"));
    
    // Anti-AFK
    bot.on('spawn', () => {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('error', (err) => console.log("Error:", err));
    bot.on('end', () => setTimeout(initBot, 10000));
}

initBot();
