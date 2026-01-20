const http = require('http');
const mineflayer = require('mineflayer');

// Mantener vivo el servicio en Koyeb
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot 1.21.11 Online");
}).listen(process.env.PORT || 8080);

const botArgs = {
    host: 'hardcoremood.falixsrv.me', 
    port: 31514,
    username: 'GuardianAFK',
    // IMPORTANTE: Si 1.21.11 no la reconoce el plugin, 
    // usa '1.21.1' que es compatible con el protocolo.
    version: '1.21.1' 
};

function initBot() {
    console.log("Iniciando bot para versión 1.21.11...");
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("¡Bot conectado en 1.21.11!");
        // Acción Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('error', (err) => {
        console.log("Error de conexión:", err.message);
    });

    bot.on('end', () => {
        console.log("Desconectado. Reintentando en 15 segundos...");
        setTimeout(initBot, 15000);
    });
}

initBot();
