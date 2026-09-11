import { useState } from "react"
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";
import { logOut } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

export default function Banner( {sendCardList} ) {
    const [isOpen, setModalOpen] = useState(false);
    const [cardQuery, setCardQuery] = useState("");
    const { setUser, setToken, token, user } = useAuth();

    function handleLogOut() {
        logOut();
        setUser(null);
        setToken(null);
    }

    return (
        <container className="banner">
            <div>
                <h1>MTGBuilda</h1>
            </div>
            <SearchBar sendCardList={sendCardList} cardQuery={cardQuery}/>
            <button className="filterButton" onClick={() => setModalOpen(true)}>
                <i className="fa-solid fa-filter"></i>
            </button>
            <button onClick={() => handleLogOut()}>Log Out</button>
            <FilterModal isOpen={isOpen} closeModal={() => setModalOpen(false)} setCardQuery={setCardQuery}/>
        </container>
    )
}