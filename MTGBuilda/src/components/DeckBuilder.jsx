import CardDisplay from "./CardDisplay";
import DeckSelector from "./DeckSelector";
import { useState } from "react"

export default function DeckBuilder( {cards} ) {
    const [decks, setDecks] = useState([]);
    const [currentDeck, setCurrentDeck] = useState(0);

    return (
        <div className="deckBuilder">
            <CardDisplay cards={cards}/>
            <DeckSelector 
                currentDeck={currentDeck} 
                setCurrentDeck={setCurrentDeck}
                decks={decks}
                setDecks={setDecks}
            />
        </div>
    )
}