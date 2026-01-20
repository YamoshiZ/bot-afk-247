// ======================================================
// 1. CONFIGURACIÓN DEL SERVIDOR WEB (Para Koyeb)
// ======================================================
const http = require('http');

// Esto responde a la señal de Koyeb para que el bot no se apague
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Anti-Hibernacion FalixNodes Activo 24/7");
    res.end();
}).listen(process.env.PORT || 8080); // Koyeb usa el puerto 8080 por defecto

console.log("Servidor HTTP interno iniciado para Koyeb.");

// ======================================================
// 2. CONFIGURACIÓN DEL BOT DE MINECRAFT (Mineflayer)
// ======================================================
const mineflayer = require('mineflayer');

const botArgs = {
    host: 'hardcoremood.falixsrv.me', // <-- REEMPLAZA CON TU IP DE FALIX
    port: 31514,                     // <-- REEMPLAZA CON TU PUERTO (ej: 25565)
    username: 'GuardianAFK',         // Nombre que tendrá el bot dentro del juego
    version: '1.21.1'                // Tu versión del servidor
};

function initBot() {
    const bot = mineflayer.createBot(botArgs);

    // Evento cuando el bot entra exitosamente
    bot.on('spawn', () => {
        console.log("¡Bot conectado al servidor de Minecraft!");
        
        // Anti-AFK: El bot saltará cada 30 segundos para no ser expulsado
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // Auto-reconexión si el bot se cae o el servidor se reinicia
    bot.on('end', () => {
        console.log("Conexión perdida. Intentando reconectar en 15 segundos...");
        setTimeout(initBot, 15000);
    });

    // Manejo de errores para evitar que el bot se detenga por completo
    bot.on('error', (err) => {
        console.log("Error detectado:", err.message);
    });
}

// Lanzar el bot
initBot();
