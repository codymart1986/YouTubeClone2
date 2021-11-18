const { Reply, validateReply } = require("../models/reply");
const express = require("express");
const {Comment} = require("../models/comment");
const router = express.Router();



//gets all replies of a comment
router.get("/:commentId/replies/", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment)
          return res
            .status(400)
            .send(`The comment with id "${req.params.commentId}" does not exist.`);
    const reply = await Reply.find();
      return res.send(reply);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//post a reply
router.post("/:commentId/replies/", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = new Reply({
        text: req.body.text,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      });

    comment.replies.push(reply);

    await comment.save();
    return res.send(comment.replies);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//edit a reply
router.put("/:commentId/replies/:replyId", async (req, res) => {
  try {
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);

    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = comment.replies.id(req.params.replyId);
    if (!reply)
      return res
        .status(400)
        .send(
          `The reply with id "${req.params.replyId}" does not in the users replies.`
        );

    reply.text = req.body.text;
    reply.likes = req.body.likes;
    reply.dislikes = req.body.dislikes;

    await comment.save();
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

  //delete a comment
//   router.delete("/:commentId/replies/:replyId", async (req, res) => {
//     try {
//         const comment = await Comment.findById(req.params.commentId);
//         if (!comment)
//           return res
//             .status(400)
//             .send(`The comment with id "${req.params.commentId}" does not exist.`);
    

//      const reply = await Reply.findByIdAndRemove(req.params.replyId);
//       if (!reply)
//         return res.status(400).send(`The reply with id "${req.params.replyId}" does not exist.`);
//       return res.send(reply);
//     } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
// });

router.delete("/:commentId/replies/:replyId", async (req, res) => {
    try {
        
      const comment = await Comment.findById(req.params.commentId);
      if (!comment)
        return res
          .status(400)
          .send(`The comment with id "${req.params.commentId}" does not exist.`);
  
      let reply = comment.replies.id(req.params.replyId);
      if (!reply)
        return res
          .status(400)
          .send(
            `The reply with id "${req.params.replyId}" does not in the users shopping cart.`
          );
  
      reply = await reply.remove();
  
      await comment.save();
      return res.send(reply);
  
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });










// router.get("/", async (req, res) => {
//   try {
//     const reply = await Reply.find();
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const reply = await Reply.findById(req.params.id);
//     if (!reply)
//       return res.status(400).send(`The reply with id "${req.params.id}" d
//    oes not exist.`);
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.post("/replies/", async (req, res) => {
//   try {
//     const { error } = validateReply(req.body);
//     if (error) return res.status(400).send(error);

//     const reply = new reply({
//       text: req.body.name,
//       like: req.body.description,
//       dislike: req.body.category,
//     });
//     await reply.save();
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const { error } = validateReply(req.body);
//     if (error) return res.status(400).send(error);
//     const reply = await reply.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         description: req.body.description,
//         category: req.body.category,
//         price: req.body.price,
//       },
//       { new: true }
//     );
//     if (!reply)
//       return res.status(400).send(`The reply with id "${req.params.id}" does not exist.`);
//     await reply.save();
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const reply = await Reply.findByIdAndRemove(req.params.id);
//     if (!reply)
//       return res.status(400).send(`The reply with id "${req.params.id}" does not exist.`);
//     return res.send(reply);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;
