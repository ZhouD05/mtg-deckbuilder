import { useRef } from "react"
import DeckInformation from "./DeckInformation";


export default function DeckSelector( {currentDeck, setCurrentDeck, decks, setDecks} ) {
    const nameRef = useRef(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    function handleSubmit(e) {
        e.preventDefault();
        const newName = nameRef.current.value;

        if (decks.find((deck) => deck.name === newName)) {
            alert("This deck name already exists.");
        } else {
            const newDeck = { name: newName, cards: [] };
            postNewDeck(newDeck);
            
        }
    }

    function handleDelete(e) {
        e.preventDefault();
        const deck = decks.find((deck) => deck.id === currentDeck);
        if (!deck) { return };
        console.log("PASSED DECK FIND")
        console.log(deck)
        if (confirm(`Are your sure you want to delete ${deck.name}`)) {
            deleteCurrentDeck();
        }
    }

    function handleSelect(e) {
        e.preventDefault();
        setCurrentDeck(Number(e.target.value));
    }

    async function deleteCurrentDeck() {

        await fetch(`${apiUrl}/decks/${currentDeck}`, {
            method: "DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify()
        })

        let newCurrentDeck = 0;

        for (const deck of decks) {
            if (deck.id === currentDeck) { continue };  
            newCurrentDeck = deck.id;
            break;
        }

        setDecks(prevDecks => prevDecks.filter( deck => deck.id !== currentDeck));
        setCurrentDeck(newCurrentDeck);
    }

    function postNewDeck(deck) {
        fetch(`${apiUrl}/decks`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(deck)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setDecks([...decks, data.rows[0]]);
            setCurrentDeck(data.rows[0].id);

            console.log(decks[currentDeck])

        });
    }

    function renderDeckOptions() {
        return decks.map((deck) => (
            <option key={deck.id} value={deck.id}>{deck.name}</option>
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
                
                <button id="deleteDeckButton" onClick={handleDelete}>Delete</button>
                
                <select id="deckSelect" onChange={handleSelect} value={currentDeck}>
                    {renderDeckOptions()}
                </select>

                <DeckInformation currentDeck={currentDeck} decks={decks} setDecks={setDecks}/>
            </div>
        </div>     
    )
}