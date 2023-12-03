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

const colourCounts = {
    red: 12,
    green: 13,
    blue: 14
}

const isPossible = (game) => {

    for (const round of game) {
        for (const cubes of round.split(", ")) {
            const [count, colour] = cubes.split(" ")
            if (parseInt(count) > colourCounts[colour]) {
                possible = false;
                return false;
            }
        }
    }

    return true;

}

for (const line of input) {
    const [left, cubeList] = line.split(": ");
    const gameId = parseInt(left.split(" ")[1]);

    const rounds = cubeList.split("; ")

    let possible = isPossible(rounds);

    if (possible) sum += gameId;
}

console.log(sum)