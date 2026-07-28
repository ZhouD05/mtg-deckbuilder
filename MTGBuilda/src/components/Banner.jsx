import SearchBar from "./SearchBar";

export default function Banner( {sendCardList} ) {
    return (
        <container className="banner">
            <div>
                <h1>MTGBuilda</h1>
            </div>
            <SearchBar sendCardList={sendCardList}/>
        </container>
    )
}