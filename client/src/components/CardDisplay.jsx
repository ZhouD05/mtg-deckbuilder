import Card from "./Card";

export default function CardDisplay( { cards, currentDeck, decks, setDecks } ) {
    function renderCards() {
        if (!cards) { return <p>Invalid Search</p> }

        return cards.map((card) => (
            <Card 
                key={card.id} 
                card={card}
                decks={decks}
                currentDeck={currentDeck}
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