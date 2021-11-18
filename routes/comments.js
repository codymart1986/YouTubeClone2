const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");
const express = require("express");
const router = express.Router();


//gets all comments
router.get("/", async (req, res) => {
    try {
      const comment = await Comment.find();
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//get a single comment
router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment)
        return res.status(400).send(`The reply with id "${req.params.id}" d
     oes not exist.`);
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
  

//post a comment
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

//edit a comment
router.put("/:id", async (req, res) => {
    try {
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          videoID: req.body.videoID,
          text: req.body.text,
          likes: req.body.likes,
          dislikes: req.body.dislikes,
        },
        { new: true }
      );
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
      await comment.save();
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

//delete a comment
router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndRemove(req.params.id);
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//gets all replies of a comment
router.get("/:commentId/replies/", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment)
          return res
            .status(400)
            .send(`The comment with id "${req.params.commentId}" does not exist.`);
    const reply = await Reply.find();
      return res.send(comment.replies);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get("/:commentId/replies/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
        if (!comment)
          return res
            .status(400)
            .send(`The comment with id "${req.params.commentId}" does not exist.`);
    const reply = await comment.replies.id(req.params.id);
    if (!reply)
      return res.status(400).send(`The reply with id "${req.params.id}" d
   oes not exist.`);
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

//delete a reply
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

module.exports = router;
