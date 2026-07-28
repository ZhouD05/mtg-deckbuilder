import Card from "./Card";

export default function CardDisplay( {cards} ) {
    function renderCards() {
        if (!cards) { return <p>Invalid Search</p>}

        return cards.map((card) => (
            <Card key={card.id} card={card}/>
        ))
    }
    return (
        <container className="cardDisplay">
            {renderCards()}
        </container>
    )
}