import { useState } from "react"
import FilterModal from "./FilterModal";
import SearchBar from "./SearchBar";
import { logOut } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

export default function Banner() {
    const [isOpen, setModalOpen] = useState(false);
    const [cardQuery, setCardQuery] = useState("");
    const { setUser, setToken, user } = useAuth();

    function renderUserInformation() {
        if (user){
            return <p>{user.username}</p>;
        }
    }

    function handleLogOut() {
        logOut();
        setUser(null);
        setToken(null);
    }

    return (
        <container>
            <div className="header">
                <div className="logoHeader">
                    BUILDA
                </div>

                <div className="userHeader">
                    {renderUserInformation()}
                    <button onClick={() => handleLogOut()}><p>Log Out</p></button>
                </div>

            </div>
            <div className="banner">
                <h1>MTGBuilda</h1>

                <SearchBar cardQuery={cardQuery}/>
                <button className="filterButton" onClick={() => setModalOpen(true)}>
                    <i className="fa-solid fa-filter"></i>
                </button>

                <FilterModal isOpen={isOpen} closeModal={() => setModalOpen(false)} setCardQuery={setCardQuery}/>
            </div>
        </container>
    )
}