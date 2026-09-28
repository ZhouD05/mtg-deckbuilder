import { useState } from "react"
import { useQueryAuth } from "../contexts/QueryContext";

const BASE_URL = "https://api.scryfall.com";

export default function SearchBar( { cardQuery} ) {
    const {setCardList, setNextPage, setLoading} = useQueryAuth();
    const [searchInput, setSearchInput] = useState("");

    async function getCardList() {
        setLoading(true);
        let response = await fetch(`${BASE_URL}/cards/search?q=${searchInput + cardQuery}`);
        let data = await response.json();
        const queriedCards = data.data;

        if (data.has_more) {
            setNextPage(data.next_page);
        }
        
        setCardList(queriedCards);
        setLoading(false);
    }

    return (
        <container className="searchBar">
            <input 
                type="text" 
                placeholder="Search for Cards..." 
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <span><button onClick={getCardList}><i className="fa-solid fa-magnifying-glass"></i></button></span>
        </container>
    );
}