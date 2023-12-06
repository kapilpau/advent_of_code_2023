const fs = require('fs');

let input;

try {
    input = fs.readFileSync("input", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let points = 0;
const cardCounts = {};

const twoCharRegex = /.{3}/g

for (const line of input) {
    const [cardDetails, numbers] = line.split(":");
    const cardNumber = parseInt(cardDetails.split(" ").pop());
    const [winning, mine] = numbers.split(" |").map(x => [...x.matchAll(twoCharRegex)].map(a => a[0]));
    
    let matches = 0;

    if (!(cardNumber in cardCounts)) {
        cardCounts[cardNumber] = 1;
    }

    const numCards = cardCounts[cardNumber];

    for (const num of mine) {
        if (winning.includes(num)) matches++
    }
    
    for (let i = 1; i<=matches; i++) {
        const newCardNumber = cardNumber + i;
        if (!(newCardNumber in cardCounts)) {
            cardCounts[newCardNumber] = 1;
        }

        cardCounts[newCardNumber] += numCards;
    }


}

console.log(Object.values(cardCounts).reduce((cur, val) => cur += val, 0))