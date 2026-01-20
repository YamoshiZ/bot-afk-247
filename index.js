const http = require('http');
const mineflayer = require('mineflayer');

// SERVIDOR WEB PARA KOYEB (Evita el error Unhealthy)
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot de Seguridad 1.21.11 Activo");
}).listen(process.env.PORT || 8080);

// CONFIGURACIÓN CON TUS DATOS
const botArgs = {
    host: 'hardcoremood.falixsrv.me', 
    port: 31514,
    username: 'GuardianAFK',
    version: false // Al poner false, el bot detecta si es 1.21.1 o 1.21.11 solo
};

function initBot() {
    console.log("Conectando a hardcoremood.falixsrv.me...");
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("¡Bot conectado exitosamente!");
        // Anti-AFK: Saltar cada 30 segundos
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('end', () => {
        console.log("Conexión perdida. Reconectando en 15 segundos...");
        setTimeout(initBot, 15000);
    });

    bot.on('error', (err) => {
        console.log("Error en el bot: " + err.message);
    });
}

initBot();
