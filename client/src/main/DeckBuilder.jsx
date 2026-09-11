import { useAuth } from "../contexts/AuthContext";
import CardDisplay from "./CardDisplay";
import DeckSelector from "./DeckSelector";
import { useState, useEffect } from "react"

export default function DeckBuilder( {cards} ) {
    const [decks, setDecks] = useState([]);
    const [currentDeck, setCurrentDeck] = useState(0);
    const {user} = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    async function loadDecks() {
        try {
            console.log(user);

            const res = await fetch(`${apiUrl}/decks?user=${user.id}`);
            const data = await res.json();

            setDecks(data)
            setCurrentDeck(data[0].id)
        } catch (error) {
            console.error("GetDecks Error: ", error);
        }
    }

    useEffect(() => {
        loadDecks();
    }, [user])
    return (
        <div className="deckBuilder">
            <CardDisplay 
                cards={cards}
                currentDeck={currentDeck}
                decks={decks}
                setDecks={setDecks}                
            />
            <DeckSelector 
                currentDeck={currentDeck} 
                setCurrentDeck={setCurrentDeck}
                decks={decks}
                setDecks={setDecks}
            />
        </div>
    )
}