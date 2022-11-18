const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./Routes/userRoutes')
const postRouter = require('./Routes/postRoutes')
const chatRouter = require('./Routes/chatRoutes')
const contractRouter = require('./Routes/contractRoutes')

const AppError = require('./Utils/appError')
const globalErrorHandle = require('./Controllers/errorController')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/contract', contractRouter);

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
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


// Auth APIs Finish
// Like/Comment To be added
// Chat Rooms
// Chats and Messages API

// Things to do --> 
// Auth full API setup --> Today --> DONE
// Like and Comment API setup --> Today --> DONE
// Group Chats / Single Chats APIs --> Today
// Messaging APIs
//  Contract API --> Today


// Things to do in life
// --> Personal Website
// --> WorkedIn
// --> Open Source
// --> DSA
// --> Electronics Study


// Documentation Content 
// --> What is WorkedIn
// --> Content
//  --> About --> Tagline, DemoVideo
// Glimpse of the site
// How it works
// Getting Started --> Directory Layout, Run on local server
// Tools and Packages



// Group Chat

// 4team --> Group Chat --> Contract  --> Profile

// Profile --> Past Contracts --> 