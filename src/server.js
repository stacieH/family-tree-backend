const express = require('express');
const  bodyParser = require('body-parser')
const  cors = require('cors')

const mongoose = require('mongoose')
const  {routes} = require('./routes')

const app = express()
const PORT = 3020;

mongoose.connect('mongodb://localhost/members',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

routes(app)

app.get('/',(_,res)=>{
    res.send(`Running on Port ${PORT}`)
})
app.listen(PORT, ()=>{
    console.log('Server started at localhost:3020')
})