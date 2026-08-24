import { useState } from "react"
import Banner from "./Banner"
import DeckBuilder from "./DeckBuilder";

export default function Main() {
    const [cardList, getCardList] = useState([]);
    return (
        <>
            <Banner sendCardList={getCardList}/>
            <DeckBuilder cards={cardList}/>
        </>
    )
}