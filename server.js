const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:'config.env'})

const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT} `)
})

app.get('/',(req,res)=>{
    res.send('Welcome to express')
})