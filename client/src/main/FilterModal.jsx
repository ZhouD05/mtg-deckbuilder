import { useEffect, useState } from "react"

export default function FilterModal( {isOpen, closeModal, setCardQuery} ) {
    const [colorQuery, setColorQuery] = useState([]);
    const manaColors = ["white", "blue", "black", "red", "green", "colorless"];

    useEffect(() => {

        function createQuery() {
            let query = "";
            if (colorQuery.length > 0) {
                query = query + "+c="
                for (const color in colorQuery) {
                    let colorAbbreviation = colorQuery[color].charAt(0);
                    if (colorQuery[color] === "blue") { colorAbbreviation = "u"};
                    query = query + colorAbbreviation;
                }
            }
            setCardQuery(query);
        }

        createQuery();

    }, [colorQuery, setCardQuery]);

    if (!isOpen) { return null };



    function changeColorCheckbox(color) {
        if (colorQuery.includes(color)) {
            setColorQuery(colorQuery.filter(c => c !== color));
        } else {
            setColorQuery([...colorQuery, color]);
        }


    }

    return (
        <div className="filterModal" onClick={
            (e) => {
                    if(e.target.className === "filterModal") {
                        closeModal()
                    }
                }}
        >
            <div className="filterContent">

                <div className="filterHeader">
                    <p>Filter</p>
                    <button onClick={closeModal}>&times;</button>
                </div>
                <div className="filterSettings">
                    <form className="manaColorFilter">
                        {manaColors.map(color =>
                            <div className="colorOption">
                                <input type="checkbox" 
                                key={color}
                                id={color}
                                checked={colorQuery.includes(color)}
                                onChange={() => changeColorCheckbox(color)}
                                />

                                <label for={color}>
                                {String(color).charAt(0).toUpperCase() + String(color).slice(1)}
                                </label>

                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}