const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./input", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let count = 0;
const digits = [];
for (let i = 0; i<10; i++) digits.push(i.toString());
const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const getFirstNumber = (line, direction) => {

    while (line.length > 0) {

        if (direction === 1) {

            const c = line.charAt(0);
            if (digits.includes(c)) return c

            for (const word of words) {
                if (line.startsWith(word)) return words.indexOf(word)+1;
            }

            line = line.slice(1);

        } else {

            const c = line.slice(-1);
            if (digits.includes(c)) return c

            for (const word of words) {
                if (line.endsWith(word)) return words.indexOf(word)+1;
            }

            line = line.slice(0, -1);
        }
    }

}

for (const line of input) {
    const num = parseInt(`${getFirstNumber(line, 1)}${getFirstNumber(line, -1)}`)
    count += num
}

console.log(count)