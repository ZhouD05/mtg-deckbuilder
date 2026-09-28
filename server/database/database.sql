CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE deck(
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES account(id) NOT NULL,
    name VARCHAR(255),
    cards JSONB[]
);