import { useEffect, useRef } from "react"

export default function DeckSelector( {currentDeck, setCurrentDeck, decks, setDecks} ) {
    const nameRef = useRef(null);

    useEffect(() => {
        if (decks.length > 0) {
            const latestDeck = decks.at(-1);
            setCurrentDeck(latestDeck.name);
        }

    }, [decks]);
    
    function handleSubmit(e) {
        e.preventDefault();
        const newName = nameRef.current.value;

        if (decks.find((deck) => deck.name === newName)) {
            console.log("Already IN")
            alert("This deck name already exists.")
        } else {
            const newDeck = { name: newName, cards: [] };
            setDecks([...decks, newDeck])
        }
    }

    function handleSelect(e) {
        e.preventDefault();
        setCurrentDeck(e.target.value);
    }

    function renderDeckOptions() {
        return decks.map((deck) => (
            <option key={deck.name} value={deck.name}>{deck.name}</option>
        ))
    }

    return (
        <div className="deckSelector">
            <div className="deckModule">
                <h1> CHOOSE DECK</h1>
                <form id="addDeckForm" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Name your deck..." 
                        ref={nameRef}
                    />
                    <button id="addDeckButton" type="submit">Add</button>
                </form>

                <select onChange={handleSelect} value={currentDeck}>
                    {renderDeckOptions()}
                </select>
            </div>
        </div>     
    )
}