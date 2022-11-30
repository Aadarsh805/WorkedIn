const mongoose = require("mongoose");


const chatModel = mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean, 
        default: false 
    },
    chatPhoto: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    },
    users: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    contracted: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat