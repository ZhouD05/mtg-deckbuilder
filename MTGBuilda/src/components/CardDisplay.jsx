import Card from "./Card";

export default function CardDisplay( {cards, deckList, setDeckList} ) {
    function renderCards() {
        if (!cards) { return <p>Invalid Search</p>}

        return cards.map((card) => (
            <Card key={card.id} card={card} deckList={deckList} setDeckList={setDeckList}/>
        ))
    }
    return (
        <container className="cardDisplay">
            {renderCards()}
        </container>
    )
}