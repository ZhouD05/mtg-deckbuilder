import Card from "./Card";

export default function CardDisplay( { cards, currentDeck, setDecks } ) {
    function renderCards() {
        if (!cards) { return <p>Invalid Search</p>}

        return cards.map((card) => (
            <Card 
                key={card.id} 
                card={card}
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