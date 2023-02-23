const express = require("express");
const router = express.Router();
const { Comments } = require('../models');

const { validateToken } = require("../middlewares/AuthMiddleware")

router.get("/:quoteId", async (req, res) => {
    const quoteId = req.params.quoteId;
    const comments = await Comments.findAll({where: {QuoteId: quoteId }});
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username
    comment.username = username;
    const newComment = await Comments.create(comment);
    res.json(newComment);
})

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({where: {
        id: commentId
    }})

    res.json("deleted")
})


module.exports = router