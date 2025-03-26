

const express = require('express')

const userRoute = require('./Routers/userRoute')
const postRoute = require('./Routers/postRoute')
const commentRoute = require('./Routers/commentRoute')
const cors = require('cors')
require('dotenv').config({ path: '../server/.env' });

const mongoose = require('mongoose')
const path = require('path')
const app = express()
const atlasUrl = process.env.MONGO_ATLAS_URI
const port = process.env.PORT || 5000
const clientUrl= "http://localhost:5173"

app.use(express.json())

app.use(cors({
    origin: clientUrl, 
    credentials: true               
}));

app.use('/users',userRoute)
app.use('/posts',postRoute)
app.use('/comments',commentRoute)


mongoose.connect(atlasUrl).then(()=>{
    console.log('successfully mongoose')
}).catch((e)=>{
    console.log('failed mongoose:',e.message)
})



app.listen(port,()=>{
    console.log('connected port:',port)
})

module.exports = clientUrl 


