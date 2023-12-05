const fs = require('fs');

let input;

try {
    input = fs.readFileSync("input", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

const syms = [];

const schematic = input.map((l, x) => l.split("").map((c, y) => {
    if (c >= '0' && c <= '9') {
        return parseInt(c)
    } else if (c !== ".") {
        syms.push(c)
    }
    
    return c;
}))

const toSum = [];


const checkAround = (x, y, length) => {
    // check left up/down/middle

    if (y > 0) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][y-1])) {
                return true
            }
        }

        if (syms.includes(schematic[x][y-1])) {
            return true
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][y-1])) {
                return true
            }
        }
    }


    // check right up/down/middle

    const rightY = y + length
    const maxY = input[x].length - 1;

    if (rightY < maxY) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][rightY])) {
                return true
            }
        }

        if (syms.includes(schematic[x][rightY])) {
            return true
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][rightY])) {
                return true
            }
        }
    }

    // check above and below for each

    for (let i = 0; i<length; i++) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][y + i])) {
                return true
            }
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][y + i])) {
                return true
            }
        }
    }

}

const numRegex = /\d+/g

for (let i = 0; i<input.length; i++) {
    const nums = [...input[i].matchAll(numRegex)]

    for (const num of nums) {
        if (checkAround(i, num.index, num[0].length)) {
            toSum.push(parseInt(num[0]))
            input[i] = input[i].replace(num[0], ".".repeat(num[0].length))
            for (let x = 0; x<num[0].length; x++) {
                schematic[i][num.index + x] = "."
            }
        }
    }
}




const sum = (arr) => {
    let sum = 0;
    arr.forEach(x => sum += x);
    return sum;
}

console.log(sum(toSum))