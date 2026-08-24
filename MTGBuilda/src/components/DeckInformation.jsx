import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip,
    scales} from "chart.js";

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip
)

export default function DeckInformation( { currentDeck, decks } ) {
    if (decks.length < 1) { return };
    
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
    const deck = decks.find(deck => deck.name === currentDeck);
    let highestManaCost = 0;
    let lowestManaCost = 20;

    function listOutDeck() {

        if (!deck) { return };

        return deck.cards.map((card) => (
            <li key={card.id}> 
                <a>
                    <p>x{card.amount} <span>{card.name}</span></p>
                </a>
            </li>
        ));
    }

    function getCardCount() {
        let sum = 0;

        for (const card of deck.cards) {
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
        const cards = deck.cards;
        const cmcList = [];

        for (const card of cards) {
            if (card.cmc > highestManaCost) highestManaCost = card.cmc;
            if (card.cmc < lowestManaCost) lowestManaCost = card.cmc;
        }
        console.log(lowestManaCost)
        console.log(highestManaCost)


        for (let cmc = lowestManaCost; cmc <= highestManaCost; cmc++) {
            cmcList.push(cmc);
        }
        return cmcList;
    }

    function getManaCurve() {
        const cards = deck.cards;
        const manaCurve = [];

        for (const card of cards) {
            const index = card.cmc - lowestManaCost;
            if (!manaCurve[index]) {
                manaCurve[index] = card.amount;
            } else {
                manaCurve[index] += card.amount;
            }
        }
        console.log(manaCurve)
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