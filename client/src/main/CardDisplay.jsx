import { useQueryAuth } from "../contexts/QueryContext";
import Card from "./Card";

export default function CardDisplay( { currentDeck, decks, setDecks } ) {
    const { cardList, setCardList, nextPage, setNextPage, loading} = useQueryAuth();
    if (loading) {
        return <p>Loading...</p>
    }
    
    function renderCards() {
        if (!cardList) { return <p>Invalid Search</p> }

        return cardList.map((card) => (
            <Card 
                key={card.id} 
                card={card}
                decks={decks}
                currentDeck={currentDeck}
                setDecks={setDecks}    
            />
        ))
    }

    async function renderLoadMore() {
        if (!nextPage) return;

        const response = await fetch(nextPage);
        const data = await response.json();
        const nextCardList = data.data;
        setCardList([...cardList, ...nextCardList])

        if (data.has_more) {
            setNextPage(data.next_page)
        } else {
            setNextPage(null);
        }
    }
    return (
        <container className="cardDisplay">
            {renderCards()}
            {nextPage && <button onClick={renderLoadMore}>Load More</button>}
        </container>
    )
}