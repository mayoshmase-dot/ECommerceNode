import 'dotenv/config'

import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import initApp from './src/index.router.js'

const app = express()
const PORT = process.env.PORT || 3000

initApp(app, express)

app.listen(PORT, () => {
    console.log(`server is running ...${PORT}`)
})