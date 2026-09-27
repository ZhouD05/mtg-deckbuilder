import { useState, useContext, createContext } from "react";

const QueryContext = createContext(undefined);

export function useAuth() {
    return useContext(QueryContext);
}

export function AuthProvider({ children }) {
    const [cardList, getCardList] = useState([]);
    const [nextPage, setNextPage] = useState(null)

    const value = {
        cardList,
        getCardList,
        nextPage,
        setNextPage
    }

    return(
        <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
    )
}