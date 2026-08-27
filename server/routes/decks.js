const express = require("express");
const router = express.Router();

const decks = [];

router.get("/", (req, res) => {
    res.json({ decks: decks})
});

router.post("/", (req, res) => {
    const newDeck = req.body;
    decks.push(newDeck);
    console.log(newDeck);
    res.status(201).json(newDeck);
});

router.get("/:id", (req, res) => {
    const deckName = req.params.id;
    const requestedDeck = decks.find((d) => deckName === d.name);

    if (!requestedDeck) res.status(404);
    res.json(requestedDeck);
});

router.post("/:id", (req, res) => {
    const deckName = req.params.id;
    const updatedDeck = req.body;

    for (let index = 0; index < decks.length; index++) {
        if (deckName === decks[index].name) {
            decks[index] = updatedDeck;
            return res.status(201).json(updatedDeck);
        }
    }
    res.status(404);
});

module.exports = router;