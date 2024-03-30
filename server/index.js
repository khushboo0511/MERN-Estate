const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/mernestate').then(() => {
    console.log('Connected to MongoDB!');
    }).catch((err) => {
        console.log(err);
})

const app = express() 

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})

