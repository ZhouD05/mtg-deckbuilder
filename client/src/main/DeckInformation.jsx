import { Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip} from "chart.js";

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip
)

export default function DeckInformation( { currentDeck, decks, setDecks } ) {
    if (decks.length < 1) { return };
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const deck = decks.find(deck => deck.id === currentDeck);
    const cards = deck.cards || [];

    let highestManaCost = 0;
    let lowestManaCost = 20;
    const options = {
        scales: {
            x: {
                grid: {
                    display:false,
                }
            },
            y: {
                display:false,
                grid: {
                    display:false,
                }
            }
        }
    };

    async function deleteCard(cardId) {
        const deck = decks.find(deck => deck.id === currentDeck);
        if (!deck) return;

        const desiredCard = deck.cards.find(card => card.id === cardId);
        if (!desiredCard) return;

        const newAmount = desiredCard.amount - 1;
        let newDeck;

        if (newAmount === 0) {
            newDeck = {...deck, cards: deck.cards.filter(card => card.id !== cardId)};
        } else {
            newDeck = {...deck, cards: deck.cards.map(card => {
                    if (card.id === cardId) {
                        return {...card, amount: newAmount};
                    } else {
                        return card;
                    }
                })
            }
        }

        setDecks(prevDecks => prevDecks.map(d => {
            if (d.id === deck.id) {
                return newDeck;
            } else {
                return d;
            }
        }));


        const response = await fetch(`${apiUrl}/decks/${deck.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDeck)
        });
    }


    function listOutDeck() {

        if (!deck) { return };

        return cards.map((card) => (
            <li key={card.id}> 
                <a>
                    <p>x{card.amount} <span>{card.name}</span></p>
                    <button onClick={() => deleteCard(card.id)}><i className="fa-solid fa-x"></i></button>
                </a>
            </li>
        ));
    }

    function getCardCount() {
        let sum = 0;

        for (const card of cards) {
            sum += card.amount;
        }

        return sum;
    }

    const dataChart = {
        labels: getLabels(),
        datasets: [
            {
                label: "Card Count",
                data: getManaCurve(),
                backagroundColor: "rgba(0,0,0,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
            }
        ],
    };

    function getLabels() {
        const cmcList = [];

        for (const card of cards) {
            if (card.cmc > highestManaCost) highestManaCost = card.cmc;
            if (card.cmc < lowestManaCost) lowestManaCost = card.cmc;
        }

        for (let cmc = lowestManaCost; cmc <= highestManaCost; cmc++) {
            cmcList.push(cmc);
        }
        return cmcList;
    }

    function getManaCurve() {
        const manaCurve = [];

        for (const card of cards) {
            const index = card.cmc - lowestManaCost;
            if (!manaCurve[index]) {
                manaCurve[index] = card.amount;
            } else {
                manaCurve[index] += card.amount;
            }
        }
        return manaCurve;
    }

    return (
        <>        
            <div className="cardListContainer">
                <ul className="cardList">
                    {listOutDeck()}
                </ul>
                
            </div>
            <p>Card Count: {getCardCount()} </p>
            <div id="manaCurve">
                <Bar options={options} data={dataChart}></Bar>
            </div>
        </>
    )
}