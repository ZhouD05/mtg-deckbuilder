export default function Card({ card, currentDeck, setDecks }) {
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }

    function addCard() {
        setDecks( prevDecks => 
            prevDecks.map((deck) => {
                if (deck.name !== currentDeck) { return deck };

                const desiredCard = deck.cards.find((c) => (c.id === card.id));
                let newDeck = {};

                if (!desiredCard) {
                    card.amount = 1;
                    newDeck = {...deck, cards: [...deck.cards, card]}
                    postDeckWithNewCard(newDeck);

                    return newDeck;
                }

                const deckWithNewCard = deck.cards.map((c) => { 
                    if (c.id === card.id) {
                        return {...c, amount: c.amount + 1};
                    } else {
                        return c;
                    }
                })

                newDeck = {...deck, cards: deckWithNewCard}
                postDeckWithNewCard(newDeck);
                
                return newDeck;

            }
        ))
    }

    function postDeckWithNewCard(deck) {
        fetch(`http://localhost:8080/decks/${deck.name}`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(deck)
        }).then(() => {
            console.log("Updated deck");
        })
    }

    return (
        <div className="card">
            <div className="cardImage">
                <img src={card.image_uris.png}/>
                <div className="cardSelect hide">
                    <button onClick={addCard}><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <p>{card.name}</p>
        </div>
    )
}