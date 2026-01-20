const http = require('http');
const mineflayer = require('mineflayer');

// Servidor para Koyeb
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot 1.21 Online");
}).listen(process.env.PORT || 8080);

const botArgs = {
    host: 'hardcoremood.falixsrv.me', 
    port: 31514,
    username: 'GuardianAFK',
    version: '1.21.1' // Forzamos la versión 1.21.1
};

function initBot() {
    console.log("Conectando con soporte para 1.21...");
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("¡Bot conectado en la versión 1.21.1!");
        // Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('error', (err) => {
        console.log("Error detallado: " + err.message);
        // Si el servidor dice que es 1.21 y el bot no puede, reintentamos
        if (err.message.includes('supported')) {
            setTimeout(initBot, 20000);
        }
    });

    bot.on('end', () => {
        console.log("Conexión cerrada, reconectando...");
        setTimeout(initBot, 15000);
    });
}

initBot();
