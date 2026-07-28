import Card from "./Card";

export default function CardDisplay( {cards} ) {
    return (
        <container>
            {cards.map((card) => (
                <Card key={card.id} card={card}/>
            ))}
        </container>
    )
}