const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        
    },
    description: {
        type: String,
        required: [true, "A post cannot be empty"]
    },
    image: {
        type: String
    },
    comments: {
        type: Array,
    },
})