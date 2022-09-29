const express = require('express');

const userRouter = require('./Routes/userRoutes')
const AppError = require('./Utils/appError')
const globalErrorHandle = require('./Controllers/errorController')

const app = express();

app.use(express.static());

app.use('/api/v1/users', userRouter);

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle)

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})