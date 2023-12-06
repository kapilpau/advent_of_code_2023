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

const twoCharRegex = /.{3}/g

for (const line of input) {
    const [winning, mine] = line.split(":")[1].split(" |").map(x => [...x.matchAll(twoCharRegex)].map(a => a[0]));
    
    let matches = 0;

    for (const num of mine) {
        if (winning.includes(num)) matches++
    }

    if (matches > 0) points += Math.pow(2, matches-1)
}

console.log(points)