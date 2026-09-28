import { useState } from "react"
import Banner from "./Banner"
import DeckBuilder from "./DeckBuilder";
import { QueryProvider } from "../contexts/QueryContext";

export default function Main() {
    return (
        <QueryProvider>
            <Banner/>
            <DeckBuilder/>
        </QueryProvider>
    )
}