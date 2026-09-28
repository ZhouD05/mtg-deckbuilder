const express = require("express");
const path = require("path");
const fs = require("fs");
const pool = require("../database/db");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const keyPath = path.join(__dirname, "..", "keys", "private_key.pem");
const PRIVATE_KEY = process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
    : fs.readFileSync(keyPath, "utf-8");

const UNIQUEVIOLATIONCODE = "23505";

router.get("/me", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    res.status(200).json({success: true, user: req.user});
});

router.post("/log-in", async (req, res, next) => {
    try {
        const userQuery = await pool.query("SELECT * FROM account WHERE username = $1", [req.body.username]);
        const user = userQuery.rows[0];

        if (!user) {
            res.status(401).json({ success: false, msg: "Username was incorrect"});
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401).json({ success: false, msg: "Password was incorrect"});
        } else {
            const jwt = createJWT(user);
            res.status(200).json({ 
                success: true, 
                user: user, 
                token: jwt.token, 
                expiresIn: jwt.expires 
            });
            
        }

    } catch (error) {
        next(error);
    }
});

router.post("/sign-up", async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await pool.query(
            "INSERT INTO account (username, password) VALUES ($1, $2) RETURNING id, username", 
            [ req.body.username, hashedPassword ]
        );

        const jwt = createJWT(user.rows[0]);
        res.status(201).json({ 
            success: true, 
            user: user.rows[0], 
            token: jwt.token, 
            expiresIn: jwt.expires 
        });
        
    } catch (error) {
        if (error.code === UNIQUEVIOLATIONCODE) {
            return res.status(409).json({success: false, msg: "Username is already taken"})
        }

        next(error);
    }
});


function createJWT(user) {
    const id = user.id;
    const expiresIn = "1d";
    const expiresInReturn = { days: 1 };

    const payload = {
        sub: id,
    }

    const signedToken = jsonwebtoken.sign(
        payload,
        PRIVATE_KEY,
        { expiresIn: expiresIn, algorithm: "RS256"}
    );

    return {
        token: "Bearer " + signedToken,
        expires: expiresInReturn
    }
}


module.exports = router;