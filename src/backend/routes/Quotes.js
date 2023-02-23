const express = require("express");
const router = express.Router();
const { Quotes } = require('../models');

router.get("/", async (req, res) => {
    const listOfQuotes = await Quotes.findAll()
    res.json(listOfQuotes);
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const quote = await Quotes.findByPk(id);
    res.json(quote);
});

router.post("/", async (req, res) => {
    console.log(JSON.stringify(req.body))
    const quote = req.body;
    await Quotes.create(quote);
    res.json({"status": "ok"});
})

module.exports = router