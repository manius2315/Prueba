import makeWASocket from "@adiwajshing/baileys"

async function start() {
  const sock = makeWASocket({})

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update
    if (connection === "open") {
      console.log("✅ Bot conectado a WhatsApp")
    } else if (connection === "close") {
      console.log("⚠️ Conexión cerrada, intentando reconectar...")
      start()
    }
  })

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation?.toLowerCase()

    if (text === "hola") {
      await sock.sendMessage(from, { text: "¡Hola! Soy tu bot 🤖" })
    }

    if (text === "cita") {
      await sock.sendMessage(from, { text: "📅 Claro, dime la fecha y hora de tu cita" })
    }

    if (text === "productos") {
      await sock.sendMessage(from, { text: "🛍️ Tenemos Laptop, Mouse y Teclado disponibles." })
    }
  })
}

start()
