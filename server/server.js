const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
    origin: ("http://localhost:5173"),
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange"]})
});

const deckRouter = require("./routes/decks");

app.use("/decks", deckRouter)

app.listen(8080, () => {
    console.log("Server has started on port 8080")
});

