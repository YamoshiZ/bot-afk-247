const http = require('http');
const mineflayer = require('mineflayer');

// Servidor para que Koyeb no se apague
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot 1.21.11 Activo");
}).listen(process.env.PORT || 8080);

const botArgs = {
    host: 'hardcoremood.falixsrv.me', 
    port: 31514,
    username: 'GuardianAFK',
    // IMPORTANTE: Al poner false, el bot intenta negociar el protocolo con el server
    version: false, 
    checkTimeoutInterval: 60000
};

function initBot() {
    console.log("Intentando conectar al servidor 1.21.11...");
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log("¡Bot conectado exitosamente!");
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
        // Si el error de versión persiste, el bot se reiniciará para intentar un nuevo apretón de manos
        if (err.message.includes('version')) {
            console.log("Reintentando bypass de versión...");
        }
        setTimeout(initBot, 20000);
    });

    bot.on('end', () => {
        setTimeout(initBot, 10000);
    });
}

initBot();

