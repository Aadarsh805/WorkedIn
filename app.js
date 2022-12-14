const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./Routes/userRoutes')
const postRouter = require('./Routes/postRoutes')
const chatRouter = require('./Routes/chatRoutes')
const contractRouter = require('./Routes/contractRoutes')

const AppError = require('./utils/appError')
const globalErrorHandle = require('./controllers/errorController')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/contracts', contractRouter);

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

mongoose.set("strictQuery", true);
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
// Group Chats / Single Chats APIs --> DONE
// Messaging APIs --> DONE
//  Contract API --> PENDING


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


// Make contract API's
// Update and Complete Contract
// NotifiCation API --> Contract  

// Contract --> Send --> Notification --> Approve

// share post API
// message delete API
// message update API

