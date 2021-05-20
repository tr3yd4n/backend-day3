import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

const server = express()
const PORT = 3001

server.use(cors())

server.use(express.json())

console.log(listEndpoints(server))

server.get('/', (req, res) => {
    res.status(200).send('<h1> hiya </h1>')
})

server.get('/authors', (req, res) => {
    res.status(200).send('<h1>authors</h1>')
})

server.get('/authors/:id', (req, res) => {
    res.status(200).send(`<h1> author = ${req.params.id} </h1>`)
})

server.listen(PORT, () => console.log('server is running on PORT ', PORT))

server.on("error", (error) => console.log(`server is not running due to ${error}`))