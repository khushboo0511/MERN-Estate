const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.route.js');

mongoose.connect('mongodb://0.0.0.0:27017/mernestate').then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
