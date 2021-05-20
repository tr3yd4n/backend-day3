import express from "express"

const router = express.Router()

server.get('/', (req, res) => {
    res.status(200).send('<h1> hiya </h1>')
})

server.get('/authors', (req, res) => {
    res.status(200).send('<h1>authors</h1>')
})

server.get('/authors/:id', (req, res) => {
    res.status(200).send(`<h1> author = ${req.params.id} </h1>`)
})

export default router