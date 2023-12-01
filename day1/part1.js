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

const getFirstNumber = (line, direction) => {
    for (let i = direction === 1 ? 0 : line.length; 0 <= i <= line.length-1; i+= direction) {
        const c = line.charAt(i)
        if (digits.includes(c)) return c
    }
}

for (const line of input) {
    const num = parseInt(`${getFirstNumber(line, 1)}${getFirstNumber(line, -1)}`)
    count += num
}

console.log(count)