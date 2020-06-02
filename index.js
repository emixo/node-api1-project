const express = require('express')

const server = express()

server.use(express.json())

let users = [
    {
        id: "1",
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane",
    },
    {
        id: "2",
        name: "John Doe",
        bio: "Random dude"
    }
]

// GET REQUESTS
server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(500).json({errorMessage: 'The users information can not be recieved'})
    }
})

// GET REQUEST TO /API/USER/:ID

server.get('/api/users:id', (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === Number(id))

    if(!user) {
        res.status(404).send({message:'This user does not exist'})
    } else {
        try {
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({errorMessage: 'The user information can not be recieved'})
        }
    }
})


// POST REQUESTS

server.post('/api/users', (req , res) => {
    const user = req.body

    if (!user.name || !user.bio) {
        res.status(400).json({errorMessage: 'Please provide a name and bio for the user'})
    } else {
        try {
            users.push(user)
            res.status(201).json(users)
        } catch (err) {
            res.status(500).json({errorMessage: 'There was an error with the server'})
        }
    }
})

//DELETE REQUESTS

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    users = users.filter(user => user.id !== id)
    if (users) {
        res.status(404).send({message: 'This user does not exist'})
    } else {
        try {
            res.status(201).json(users)
        } catch (err) {
            res.status(500).json({errorMessage: 'The user can not be removed'})
        }
    }
})

// PUT REQUESTS 

server.put('/api/users/:id', (req, res) => {
    const updatedUser = req.body
    if (!updatedUser) {
        res.status(404).send({message : 'This user does not exist'})
    } else if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).send({errorMessage: 'Please provide a name and bio for the user'})
    } try {
        users.push(updatedUser)
        res.status(200)
        res.send({message: 'User has been updated'})
    } catch (err) {
        res.status(500).json({ errorMessage: 'The user could not be updated'})
    }
})



const port = 8000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))


