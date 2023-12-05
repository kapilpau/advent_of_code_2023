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
const symCoords = {};

const schematic = input.map((l, x) => l.split("").map((c, y) => {
    if (c >= '0' && c <= '9') {
        return parseInt(c)
    } else if (c !== ".") {
        syms.push(c)
        symCoords[`${x},${y}`] = []
    }
    
    return c;
}))



const checkAround = (x, y, length) => {
    // check left up/down/middle

    if (y > 0) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][y-1])) {
                return [x-1, y-1]
            }
        }

        if (syms.includes(schematic[x][y-1])) {
            return [x, y-1]
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][y-1])) {
                return [x+1, y-1]
            }
        }
    }


    // check right up/down/middle

    const rightY = y + length
    const maxY = input[x].length - 1;

    if (rightY < maxY) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][rightY])) {
                return [x-1, rightY]
            }
        }

        if (syms.includes(schematic[x][rightY])) {
            return [x, rightY]
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][rightY])) {
                return [x+1, rightY]
            }
        }
    }

    // check above and below for each

    for (let i = 0; i<length; i++) {
        if (x > 0) {
            if (syms.includes(schematic[x-1][y + i])) {
                return [x-1, y+i]
            }
        }

        if (x < input.length - 1) {
            if (syms.includes(schematic[x+1][y + i])) {
                return [x+1, y+i]
            }
        }
    }

    return "-1,-1"

}

const numRegex = /\d+/g

for (let i = 0; i<input.length; i++) {
    const nums = [...input[i].matchAll(numRegex)]

    for (const num of nums) {
        const coords = checkAround(i, num.index, num[0].length);
        if (coords !== "-1,-1") {
            if (coords in symCoords) {
                symCoords[coords].push(parseInt(num))
            }
        }
    }
}

let total = 0
for (const sym in symCoords) {
    const coords = symCoords[sym]
    if (coords.length === 2) { total = total + (coords[0] * coords[1]) }

}
console.log(total)