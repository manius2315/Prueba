import pkg from "@adiwajshing/baileys"

const { makeWASocket, useMultiFileAuthState, DisconnectReason } = pkg

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info")
  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { connection } = update
    if (connection === "open") {
      console.log("✅ Bot conectado a WhatsApp")
    }
    if (connection === "close") {
      console.log("⚠️ Conexión cerrada, intentando reconectar...")
      start()
    }
  })

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return
    const text = msg.message.conversation?.toLowerCase()
    const from = msg.key.remoteJid

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
