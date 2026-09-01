const express = require("express");
const pool = require("../database/db");
const router = express.Router();

const decks = [];

// Get list of all decks
router.get("/", async (req, res) => {
    try {
        const decks = await pool.query(
            "SELECT * FROM deck"
        )
        return res.json(decks.rows);
    } catch (error) {
        console.error("Error: ", error.message);
    }
    res.json({ decks: decks})
});

// Post a new deck
router.post("/", async (req, res) => {

    try {
        const deckName = req.body.name;
        console.log(deckName)
        console.log("was Here");

        const newDeck = await pool.query(
            "INSERT INTO deck (account_id, cards, name) VALUES (1, '{}', $1) RETURNING *",
            [deckName]
        )
        decks.push(newDeck);
        console.log(newDeck);
        res.status(201).json(newDeck);
    } catch (error) {
        console.error("Error:",error.message);
    }


});

// Get a specific deck
router.get("/:id", (req, res) => {
    const deckName = req.params.id;
    const requestedDeck = decks.find((d) => deckName === d.name);

    if (!requestedDeck) res.status(404);
    res.json(requestedDeck);
});

// Put an updated deck
router.put("/:id", async (req, res) => {
    try {
        const deckId = req.params.id;
        const updatedCards = req.body.cards;
        console.log(typeof updatedCards)
        const updatedDeck = await pool.query(
            "UPDATE deck SET cards = $2 WHERE id = $1 RETURNING *",
            [deckId, updatedCards]
        );
        res.json(updatedDeck);
    } catch (error) {
        console.error("Error:",error.message);        
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const deckId = req.params.id;
        const deleteDeck = await pool.query(
            "DELETE FROM deck WHERE id = $1", 
            [deckId]
        );
        res.json("Deck deleted")
    } catch (error) {
        console.error("Error:",error.message);
    }
});


module.exports = router;