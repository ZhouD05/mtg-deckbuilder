export default function Card({ card, currentDeck, decks, setDecks }) {
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }

    function addCard() {
        setDecks( prevDeck => 
            prevDeck.map(deck => {
                console.log(deck)
                if (deck.name === currentDeck) {
                    console.log("WENT HERE")

                    return {...deck, cards: [...deck.cards, card]};
                }
                return deck;
            }
        ))
        console.log(currentDeck)
        console.log(decks)
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