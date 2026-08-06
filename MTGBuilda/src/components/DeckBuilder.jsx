import CardDisplay from "./CardDisplay";
import DeckSelector from "./DeckSelector";

export default function DeckBuilder( {cards} ) {
    return (
        <>
            <div className="deckBuilder">
                <CardDisplay cards={cards}/>
                <DeckSelector/>
            </div>
            
        </>
    )
}