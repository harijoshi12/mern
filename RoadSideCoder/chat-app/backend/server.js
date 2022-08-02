const express = require('express')
const dotenv = require('dotenv')
const chats  = require('./data/data')
const app = express()

dotenv.config()
const port = process.env.PORT || 4000

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.get('/api/chat', (req, res)=>{
    res.send(chats)
})

app.get('/api/chat/:id', (req,res)=>{
    const singleChat = chats.find((c)=>c._id === req.params.id)
    res.send(singleChat)
})

app.listen(port, ()=>{
    console.log(`listening h on port ${port}`)
})
