const { Comment, validateComment } = require("../models/comment");
const { Reply } = require("../models/reply");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
  
      const comment = new Comment({
        videoID: req.body.videoID,
        text: req.body.text,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        replies: req.body.replies
      });
  
      await comment.save();
  
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

// router.post("/:commentId/replies/:userId", async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment)
//       return res
//         .status(400)
//         .send(`The comment with id "${req.params.commentId}" does not exist.`);

//     const reply = await Reply.findById(req.params.replyId);
//     if (!reply)
//       return res
//         .status(400)
//         .send(`The reply with id "${req.params.replyId}" does not exist.`);

//     comment.replies.push(reply);

//     await comment.save();
//     return res.send(comment.replies);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.put("/:commentId/replies/:replyId", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error);

//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment)
//       return res
//         .status(400)
//         .send(`The comment with id "${req.params.commentId}" does not exist.`);

//     const reply = comment.replies.id(req.params.replyId);
//     if (!reply)
//       return res
//         .status(400)
//         .send(
//           `The reply with id "${req.params.replyId}" does not in the users shopping cart.`
//         );

//     comment.videoID = req.body.videoID;
//     comment.text = req.body.text;
//     comment.likes = req.body.likes;
//     comment.dislikes = req.body.dislikes;
//     comment.replies = req.body.replies;

//     await comment.save();
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.delete("/:commentId/replies/:replyId", async (req, res) => {
//   try {
      
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment)
//       return res
//         .status(400)
//         .send(`The comment with id "${req.params.commentId}" does not exist.`);

//     let reply = user.replies.id(req.params.replyId);
//     if (!reply)
//       return res
//         .status(400)
//         .send(
//           `The reply with id "${req.params.replyId}" does not in the users shopping cart.`
//         );

//     comment = await comment.remove();

//     await comment.save();
//     return res.send(reply);

//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;
