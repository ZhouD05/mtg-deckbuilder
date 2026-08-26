export default function Card({ card, currentDeck, setDecks }) {
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }

    function addCard() {
        setDecks( prevDeck => 
            prevDeck.map(deck => {
                if (deck.name !== currentDeck) { return deck };

                const desiredCard = deck.cards.find((c) => (c.id === card.id));

                if (!desiredCard) {
                    card.amount = 1;
                    return {...deck, cards: [...deck.cards, card]};
                }

                return {...deck, cards: deck.cards.map(c => c.id === card.id ? 
                    {...c, amount: c.amount + 1} : c
                )}

            }
        ))
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