export default function Card({ card, deckList, setDeckList}) {
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }

    function addCardToList() {
        setDeckList([...deckList, card]);
    }

    return (
        <div className="card">
            <div className="cardImage">
                <img src={card.image_uris.png}/>
                <div className="cardSelect hide">
                    <button onClick={addCardToList}><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <p>{card.name}</p>
        </div>
    )
}