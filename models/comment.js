const Joi = require("joi");
const mongoose = require("mongoose");
const {replySchema} = require('./reply');

const commentSchema = new mongoose.Schema({
    videoID:{type:String, required:true},
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: [{ type: replySchema }],
});

function validateComment(comment) {
    const schema = Joi.object({
      videoID: Joi.string().min(1).max(255).required(),
      text: Joi.string().min(1).max(255).required(),
      likes: Joi.number(),
      dislikes: Joi.number(),
      replies: Joi.array(),
    });
    return schema.validate(comment);
  }

const Comment = mongoose.model("Comment", commentSchema);

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
