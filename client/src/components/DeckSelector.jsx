import { useRef } from "react"
import DeckInformation from "./DeckInformation";

export default function DeckSelector( {currentDeck, setCurrentDeck, decks, setDecks} ) {
    const nameRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        const newName = nameRef.current.value;

        if (decks.find((deck) => deck.name === newName)) {
            alert("This deck name already exists.");
        } else {
            const newDeck = { name: newName, cards: [] };
            setDecks([...decks, newDeck]);
            setCurrentDeck(newName);
            postNewDeck(newDeck);
        }
    }

    function handleSelect(e) {
        e.preventDefault();
        setCurrentDeck(e.target.value);
    }

    function postNewDeck(deck) {
        fetch("http://localhost:8080/decks", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(deck)
        }).then(() => {
            console.log("new deck added");
        })
    }

    function renderDeckOptions() {
        return decks.map((deck) => (
            <option key={deck.name} value={deck.name}>{deck.name}</option>
        ))
    }

    return (
        <div className="deckSelector">
            <div className="deckModule">
                <h1> Decks</h1>
                <form id="addDeckForm" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Name your deck..." 
                        ref={nameRef}
                    />
                    <button id="addDeckButton" type="submit">Add</button>
                </form>

                <select id="deckSelect" onChange={handleSelect} value={currentDeck}>
                    {renderDeckOptions()}
                </select>

                <DeckInformation currentDeck={currentDeck} decks={decks}/>
            </div>
        </div>     
    )
}