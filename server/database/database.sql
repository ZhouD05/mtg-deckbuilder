CREATE DATABASE deckbuilder;

CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE deck(
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES account(id) NOT NULL,
    name VARCHAR(255),
    cards JSONB[]
);

CREATE TABLE card(
    id VARCHAR(255) NOT NULL,
    deck_id INT REFERENCES deck(id) NOT NULL,
    card JSONB,
    amount INT,
    PRIMARY KEY (id, deck_id)
);