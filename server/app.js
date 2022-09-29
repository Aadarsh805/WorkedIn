const express = require('express');
const userRouter = require('./Routes/userRoutes')


const app = express();

app.use(express.static());

app.use('/api/v1/users', userRouter);

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})