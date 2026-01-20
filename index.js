const http = require('http');
const mineflayer = require('mineflayer');

// SERVIDOR WEB PARA EL HEALTH CHECK DE KOYEB
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Bot Online");
}).listen(process.env.PORT || 8080);

// CONFIGURACIÓN CON TUS DATOS
const botArgs = {
    host: 'hardcoremood.falixsrv.me', 
    port: 31514, // <--- REVISIÓN: El puerto de Java suele ser 31XXX en Falix
    username: 'GuardianAFK',
    version: '1.21.1'
};

function initBot() {
    console.log("Intentando conectar a hardcoremood.falixsrv.me...");
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("¡Bot conectado con éxito!");
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('end', () => {
        console.log("Conexión perdida. Reintentando en 20 segundos...");
        setTimeout(initBot, 20000);
    });

    bot.on('error', (err) => {
        console.log("Error de conexión:", err.message);
    });
}

initBot();
