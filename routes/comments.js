const { Comment, validateComment } = require("../models/comment");
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

module.exports = router;
