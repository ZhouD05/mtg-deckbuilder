import Card from "./Card";

export default function CardDisplay( { cards, currentDeck, decks, setDecks } ) {
    function renderCards() {
        if (!cards) { return <p>Invalid Search</p>}

        return cards.map((card) => (
            <Card 
                key={card.id} 
                card={card}
                currentDeck={currentDeck}
                decks={decks}
                setDecks={setDecks}    
            />
        ))
    }
    return (
        <container className="cardDisplay">
            {renderCards()}
        </container>
    )
}