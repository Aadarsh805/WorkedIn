const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Review can not be empty!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user"],
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: [true, "Comment must belong to a post"],
    }
})

reviewSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
      select: "name photo tagline",
    });
    next();
});


//  --> user name, pic, tagline, comment