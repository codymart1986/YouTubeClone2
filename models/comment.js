const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    videoID:{type:String, required:true},
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: [{ type: replySchema }],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports.Comment = Comment;
