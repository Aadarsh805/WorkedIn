const mongoose = require("mongoose");
const User = require('./userModel')

const postSchema = new mongoose.Schema({
    author: {
       type: mongoose.Schema.ObjectId,
       ref: User,
       required: [true, "Post must belong to a User"]
    },
    description: {
        type: String,
        required: [true, "A post cannot be empty"]
    },
    image: {
        type: String
    },
    tags: {
        type: Array,
    },
    like: [
        {
            type: mongoose.Schema.ObjectId,
            ref: User
        }
    ],
    comments: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
})

postSchema.pre(/^find/, function (next) {
    this.populate({
      path: "author",
      select: "name photo",
    });
    next();
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;

//  Authors Pic, Name, Tagline, Post Desc, Post Image, Tags, Like, Share, Comments, Three Dots --> Report, Delete, Update
