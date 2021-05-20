import express from "express"
import fs from "fs"
import { join, dirname, parse } from "path"
import { fileURLToPath } from "url"
import uniqid from 'uniqid'

//create an express function declared as a router
const router = express.Router()
// folder path containing src converts path to url including json
const authorsPath = join(dirname(fileURLToPath(import.meta.url)), "authors.json")

// // Question 1
router.get('/', (req, res) => { // /authors

    //1. target authors.json grab entire list of authors from authors.json
    const authors = fs.readFileSync(authorsPath)
    console.log(authors)

    //2. convert into readable array
    const parsedAuthors = JSON.parse(authors)

    //3. send back to the front as response
    res.send(parsedAuthors)

})

// // Question 3
router.post('/', (req, res) => {

    //1. read the body of the request
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
    console.log(newAuthor)

    //2. read content of chosen json file (authors.json)
    const authorsJSON = fs.readFileSync(authorsPath)
    const authorsList = JSON.parse(authorsJSON)

    //3. push the new author into the authors.json array
    authorsList.push(newAuthor)

    //4. write the array back into the JSON file as a string
    fs.writeFileSync(authorsPath, JSON.stringify(authorsList))

    //5. provide a response 201 = created
    console.log(authorsList)
    res.status(201).send(newAuthor.id)

})

// Question 2
router.get('/:id', (req, res) => {

    //1. target authors.json grab entire list of authors from authors.json
    const authors = fs.readFileSync(authorsPath)
    console.log(authors)

    //2. convert into readable array
    const parsedAuthors = JSON.parse(authors)

    //3. select author based on uniqid value
    const author = parsedAuthors.find(a => a.id === req.params.id)

    //4. send back to the front as response
    res.status(200).send(author)

})

// // router.get('/:name', (req, res) => {
// //     //1. target authors.json grab entire list of authors from authors.json
// //     const authors = fs.readFileSync(authorsPath)
// //     console.log(authors)

// //     //2. convert into readable array
// //     const parsedAuthors = JSON.parse(authors)

// //     //3. select author based on id value eg. "id" : "3"
// //     const author = parsedAuthors.find(a => a.name === req.params.name)

// //     //4. send back to the front as response
// //     res.status(200).send(author)
// // })

// Question 4
router.put('/:id', (req, res) => {

    //1. target authors.json grab entire list of authors from authors.json
    const authors = fs.readFileSync(authorsPath)

    //2. convert into readable array
    const parsedAuthors = JSON.parse(authors)

    //3. modify specified author and add to new array
    const remainingAuthors = parsedAuthors.filter(author => author.id !== req.params.id)
    const updatedAuthor = { ...req.body, id: req.params.id }
    remainingAuthors.push(updatedAuthor)

    //4. write (save) file with modified author
    fs.writeFileSync(authorsPath, JSON.stringify(remainingAuthors))

    //5. send response
    res.send(updatedAuthor)

})


// Question 5
router.delete('/:id', (req, res) => {

    //1. target authors.json grab entire list of authors from authors.json
    const authors = fs.readFileSync(authorsPath)

    //2. convert into readable array
    const parsedAuthors = JSON.parse(authors)

    //3. filter out specified id
    const remainingAuthors = parsedAuthors.filter(author => author.id !== req.params.id)

    //4. write the array back into the JSON file as a string
    fs.writeFileSync(authorsPath, JSON.stringify(remainingAuthors))
    res.status(204).send()

})

export default router