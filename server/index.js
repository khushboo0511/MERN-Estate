const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.route.js');
const { authRouter } = require('./routes/auth.route.js')
var cors = require('cors')
const cookieParser = require('cookie-parser');
const { listingRouter } = require('./routes/listing.route.js');
const mailRoute = require('./routes/mail.route.js');


// 

// mongoose.connect('mongodb://0.0.0.0:27017/mernestate').then(() => {
//     console.log('Connected to MongoDB!');
// }).catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
// });


const uri = `mongodb+srv://khushboo0511:vNJurLVDuoMdiXDs@cluster0.d7wmjc7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…');
  })
  .catch(err => console.log(err));


const app = express();

app.use(express.json());

app.use(cors())

app.use(cookieParser())

app.use((req, res, next) => {
    res.set('Cross-Origin-Opener-Policy', 'allow-popups');
    next();
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/mail', mailRoute);
app.use((err, req, res, next) => {
    const stautsCode = err.stautsCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(stautsCode).json({
        success: false,
        stautsCode: stautsCode,
        message
    })
})