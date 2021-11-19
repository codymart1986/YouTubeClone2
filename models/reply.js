const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

function validateReply(reply) {
    const schema = Joi.object({
      text: Joi.string().min(1).max(255).required(),
      likes: Joi.number(),
      dislikes: Joi.number(),
    });
    return schema.validate(reply);
  }



const Reply = mongoose.model("Reply", replySchema);



module.exports.Reply = Reply;
module.exports.replySchema = replySchema;
module.exports.validateReply = validateReply;