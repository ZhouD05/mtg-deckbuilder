export default function Card({ card }) {
    if (Object.hasOwn(card, "card_faces") && !Object.hasOwn(card, "image_uris")) {
        card = card.card_faces[0];
    }
    return (
        <div className="card">
            <img src={card.image_uris.png}/>

            <p>{card.name}</p>
        </div>
    )
}