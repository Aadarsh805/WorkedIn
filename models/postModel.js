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
        type: String,
        default: ''
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
}, 
{timestamps: true}
)

postSchema.pre(/^find/, function (next) {
    this.populate({
      path: "author",
      select: "name photo tagline",
    });
    next();
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;