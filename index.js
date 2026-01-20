// ==========================================
// SECCIÓN 1: SERVIDOR WEB PARA KOYEB
// Esto evita el error "Service Unhealthy"
// ==========================================
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Anti-Hibernación FalixNodes 2026 - Activo");
    res.end();
});

// Koyeb usa el puerto 8080 por defecto
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor HTTP interno escuchando en puerto ${PORT}`);
});

// ==========================================
// SECCIÓN 2: BOT DE MINECRAFT (MINEFLAYER)
// ==========================================
const mineflayer = require('mineflayer');

const botArgs = {
    host: 'hardcoremood.falixsrv.me', // <--- CAMBIA ESTO POR TU IP
    port: 31514,                // <--- CAMBIA ESTO POR TU PUERTO
    username: 'GuardianAFK',    // Nombre del bot en el juego
    version: '1.21.1'           // Versión de tu servidor
};

function initBot() {
    console.log("Iniciando conexión con el servidor de Minecraft...");
    const bot = mineflayer.createBot(botArgs);

    // Evento cuando el bot entra al mundo
    bot.on('spawn', () => {
        console.log("¡Bot conectado exitosamente!");
        
        // Anti-AFK: El bot saltará cada 30 segundos
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // Auto-reconexión si el servidor se reinicia o lo expulsa
    bot.on('end', () => {
        console.log("Conexión perdida con Minecraft. Reconectando en 15 segundos...");
        setTimeout(initBot, 15000);
    });

    // Evitar que el bot se cierre por errores internos
    bot.on('error', (err) => {
        console.log("Error de Mineflayer:", err.message);
    });
}

// Arrancar el bot
initBot();
