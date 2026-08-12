import { useEffect } from "react"

export default function DeckSelector( {deckList, setDeckList} ) {

    useEffect(() => {
        displayLatestCard()
        console.log(deckList)
    }, [deckList]);

    function displayLatestCard() {
        if (deckList.length > 0) {
            return deckList[deckList.length - 1].name
        }
    }
    
    return (
        <div className="deckSelector">
            <div className="deckModule">
                <h1> CHOOSE DECK</h1>
                <p>{displayLatestCard()}</p>
            </div>
        </div>     
    )
}