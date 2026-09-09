const path = require("path");
const fs = require("fs");
const pool = require("../database/db");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keyPath = path.join(__dirname, "..", "keys", "public_key.pem");
const PUBLIC_KEY = fs.readFileSync(keyPath, "utf-8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithms: ["RS256"]
};

const strategy = new JwtStrategy(options, (payload, done) => {
    pool.query("SELECT * FROM account WHERE id = $1", [payload.sub])
    .then((userQuery) => {
        const user = userQuery.rows[0];
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    })
    .catch(error => done(error, null))
});

module.exports = (passport) => {
    passport.use(strategy);
};