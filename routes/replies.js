const { Reply, validateReply } = require("../models/reply");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reply = await Reply.find();
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reply = await reply.findById(req.params.id);
    if (!reply)
      return res.status(400).send(`The reply with id "${req.params.id}" d
   oes not exist.`);
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);

    const reply = new reply({
      text: req.body.name,
      like: req.body.description,
      dislike: req.body.category,
    });
    await reply.save();
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);
    const reply = await reply.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      },
      { new: true }
    );
    if (!reply)
      return res.status(400).send(`The reply with id "${req.params.id}" does not exist.`);
    await reply.save();
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reply = await Reply.findByIdAndRemove(req.params.id);
    if (!reply)
      return res.status(400).send(`The reply with id "${req.params.id}" does not exist.`);
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
