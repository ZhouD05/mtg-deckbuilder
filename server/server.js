require("dotenv").config();

const path = require("node:path");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const deckRouter = require("./routes/decks");
const userRouter = require("./routes/users");


const app = express();

const port = process.env.PORT;
const corsOptions = {
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
};
app.use(cors(corsOptions));

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/decks", deckRouter);
app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});

