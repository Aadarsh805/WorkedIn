const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./Routes/userRoutes')
const AppError = require('./Utils/appError')
const globalErrorHandle = require('./Controllers/errorController')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle)

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})


// Auth --> Signup, Login, Forgot Password, Reset Password, Update Password
// USer --> Update details, update user profile, get details, get other user details
// Post --> Post post, update Post, get posts
// Contract API's --> Create Contract, Get Contract
// Chat API's
//  Message API's


// CONTRACT

//  Team Members | Role and Body | Expected Result | Signature --> Pending | Completed | Broken
// How Contract completed --> Actual Result | Actual Members Contribution | Signature | Project Links 