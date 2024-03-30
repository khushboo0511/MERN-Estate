const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.route.js');
const { authRouter } = require('./routes/auth.route.js')

mongoose.connect('mongodb://0.0.0.0:27017/mernestate').then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const stautsCode = err.stautsCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(stautsCode).json({
        success: false,
        stautsCode: stautsCode,
        message
    })
})