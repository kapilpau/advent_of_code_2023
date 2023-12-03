const fs = require('fs');

let input;

try {
    input = fs.readFileSync("input", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let sum = 0;

const minPossible = (game) => {
    
    const maxes = {
        red: 0,
        blue: 0,
        green: 0
    }

    for (const round of game) {
        for (const cubes of round.split(", ")) {
            const [count, colour] = cubes.split(" ")
            maxes[colour] = Math.max(maxes[colour], count);
        }
    }

    return maxes;

}

for (const line of input) {
    const [left, cubeList] = line.split(": ");
    const gameId = parseInt(left.split(" ")[1]);

    const rounds = cubeList.split("; ")

    sum += Object.values(minPossible(rounds)).reduce((s, c) => s *= c, 1);
}

console.log(sum)