import { useState } from "react"
import Banner from "./Banner"
import CardDisplay from "./CardDisplay"

export default function Main() {
    const [cardList, getCardList] = useState([]);
    return (
        <>
            <Banner sendCardList={getCardList}/>
            <CardDisplay cards={cardList}/>
        </>
    )
}