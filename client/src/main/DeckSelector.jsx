import { useRef } from "react"
import DeckInformation from "./DeckInformation";
import { useAuth } from "../contexts/AuthContext";


export default function DeckSelector( {currentDeck, setCurrentDeck, decks, setDecks} ) {
    const nameRef = useRef(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const {user} = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        const newName = nameRef.current.value;

        if (decks.find((deck) => deck.name === newName)) {
            alert("This deck name already exists.");
        } else {
            const newDeck = { name: newName, cards: [], userId: user.id };
            postNewDeck(newDeck);
            
        }
    }

    function handleDelete(e) {
        e.preventDefault();
        const deck = decks.find((deck) => deck.id === currentDeck);
        if (!deck) { return };
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
                <h1>Decks</h1>
                <form id="addDeckForm" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Name your deck..." 
                        ref={nameRef}
                    />
                    <button type="submit"><i className="fa-solid fa-plus"></i></button>
                </form>
                
                <div id="deckSelect">
                    <select id="deckDropDown" onChange={handleSelect} value={currentDeck}>
                        {renderDeckOptions()}
                    </select>
                    <button onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
                </div>

                <DeckInformation currentDeck={currentDeck} decks={decks} setDecks={setDecks}/>
            </div>
        </div>     
    )
}