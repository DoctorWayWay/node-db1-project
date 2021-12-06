// ===== IMPORTS =====
const express = require("express")
const accountsRouter = require("./accounts/accounts-router")

// ===== INSTANCE OF EXPRESS =====
const server = express()

// ===== MIDDLEWARE =====
server.use(express.json())
server.use("/api/accounts", accountsRouter)

module.exports = server
