import CardDisplay from "./CardDisplay";
import DeckSelector from "./DeckSelector";
import { useState } from "react"

export default function DeckBuilder( {cards} ) {
    const [decks, setDecks] = useState([]);
    const [deckList, setDeckList] = useState([]);

    return (
        <div className="deckBuilder">
            <CardDisplay cards={cards} deckList={deckList} setDeckList={setDeckList}/>
            <DeckSelector deckList={deckList} setDeckList={setDeckList}/>
        </div>
    )
}