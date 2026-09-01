export default function Card({ card, currentDeck, decks, setDecks }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }

    async function addCard() {
        const deck = decks.find(deck => deck.id === currentDeck);
        if (!deck) { return };

        const desiredCard = deck.cards.find(c => c.id === card.id);

        let newDeck;
        if (!desiredCard) {
            card.amount = 1;
            newDeck = {...deck, cards: [...deck.cards, card]}
        } else {
            const deckWithNewCard = deck.cards.map((c) => { 
                if (c.id === card.id) {
                    return {...c, amount: c.amount + 1};
                } else {
                    return c;
                }
            })

            newDeck = {...deck, cards: deckWithNewCard}
        }

        const savedDeck = await postDeckWithNewCard(newDeck);

        setDecks(prevDecks => prevDecks.map(d => {
            if (d.id === currentDeck) {
                return savedDeck.rows[0];
            } else {
                return d;
            }
        }))
    }

    async function postDeckWithNewCard(deck) {
        const response = await fetch(`${apiUrl}/decks/${deck.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(deck)
        });
        const data = await response.json();
        return data;
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