import { useEffect, useState } from "react"

const BASE_URL = "https://api.scryfall.com";
const MAX_LIST_SIZE = 525;

export default function SearchBar( { sendCardList } ) {
    const [searchInput, setSearchInput] = useState("");
    const [cardList, setCardList] = useState([]);

    async function getCardList() {
        let response = await fetch(`${BASE_URL}/cards/search?q=${searchInput}`);
        let data = await response.json();
        const fullCardList = data.data;

        while (data.has_more && fullCardList.length < MAX_LIST_SIZE) {
            response = await fetch(data.next_page);
            data = await response.json();
            fullCardList.push(...data.data);
        }
        sendCardList(fullCardList);
    }

    return (
        <container>
            <input 
                type="text" 
                placeholder="Search for Cards..." 
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <span><button onClick={getCardList}>Search</button></span>
        </container>
    );
}