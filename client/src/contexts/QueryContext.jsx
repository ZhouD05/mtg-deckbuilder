import { useState, useContext, createContext } from "react";

const QueryContext = createContext(undefined);

export function useQueryAuth() {
    return useContext(QueryContext);
}

export function QueryProvider({ children }) {
    const [cardList, setCardList] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(false);

    const value = {
        cardList,
        setCardList,
        nextPage,
        setNextPage,
        loading,
        setLoading
    }

    return(
        <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
    )
}