import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import authorsRoutes from './authors/index.js'

const server = express()
const PORT = 3001

server.use(cors())

server.use(express.json())

// ROUTES

server.use("/authors", authorsRoutes)

console.table(listEndpoints(server))

server.listen(PORT, () => console.log('server is running on PORT ', PORT))

server.on("error", (error) => console.log(`server is not running due to ${error}`))