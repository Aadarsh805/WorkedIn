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