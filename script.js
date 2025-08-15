let values = []
let inputs = []

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

function nim_sum(numbers) {
    binary_nums = [];
    for (let num of numbers) {
        binary_nums.push(dec2bin(num))
    }
    console.log("binarys: ", binary_nums);

    let result = 0;
    let ones_count = 0;
    let zero_count = 0;

    while (true) {
        ones_count = 0;
        zero_count = 0;

        // binary XOR
        for (let i = 0; i < binary_nums.length; i++) {
            if (binary_nums[i] % 2 == 1) {
                ones_count++;
            }
            binary_nums[i] = Math.floor(binary_nums[i] / 10); // remove last digit of all numbers
            if (binary_nums[i] == 0) {
                zero_count++;
            }
        }

        result *= 10;
        if (ones_count % 2 == 1) {
            result++;
        }
        if (zero_count == binary_nums.length) {
            break;
        }
    }
    console.log("Nim sum result:", result);
    result = result.toString();
    const resultStr = result.split("").reverse().join("");
    return parseInt(resultStr)
}

document.getElementById("enter1").addEventListener("click", () => {
    // add new user prompting
    let label2 = document.createElement("label");
    label2.for = quantity;
    label2.textContent = "For each pile, enter how many stones: ";
    document.body.appendChild(label2);

    // create new numeric input boxes
    let enter1 = document.getElementById("enter1");
    let value = (document.getElementById("quantity")).value;
    for (let i = 0; i < value; i++) {
        let input = document.createElement("input");
        input.type = "number";

        input.min = "0";
        input.max = "100";
        input.step = "1";

        document.body.appendChild(input);
        inputs.push(input)
    }

    console.log("Next round of input created");
    enter1.disabled = true;

    // create 2nd input button
    let enter2 = document.createElement("button");
    enter2.id = "enter2"
    enter2.textContent = "Enter"
    document.body.appendChild(enter2);

    document.getElementById("enter2").addEventListener("click", () => {
        // parse values
        values = []
        for (let i = 0; i < inputs.length; i++) {
            values.push(parseInt(inputs[i].value))
        }
        console.log(`Values: ${values}`);
        let result_text = document.createElement("p");

        // check if game over
        let gameOver = isGameOver(values);
        if (gameOver) {
            result_text.textContent = `Game over!`;
            document.body.appendChild(result_text);
            return;
        }

        // determine if first or second player game
        let sum = nim_sum(values);
        console.log("Sum: ", sum);
        let nextMove = getNextMove(values, sum);

        if (sum == 0) {
            if (nextMove[1] == 1) {
                result_text.textContent = `${values} is a second player game. Removing ${nextMove[1]} stone from pile ${nextMove[0] + 1} will create a first player game.`;
            }
            else {
                result_text.textContent = `${values} is a second player game. Removing ${nextMove[1]} stones from pile ${nextMove[0] + 1} will create a first player game.`;
            }
        }
        else {
            if (nextMove[1] == 1) {
                result_text.textContent = `${values} is a first player game. Removing ${nextMove[1]} stone from pile ${nextMove[0] + 1} will create a second player game.`;
            }
            else {
                result_text.textContent = `${values} is a first player game. Removing ${nextMove[1]} stones from pile ${nextMove[0] + 1} will create a second player game.`;
            }
        }

        document.body.appendChild(result_text);
        // enter2.disabled = true;

        // // refresh button
        // let tryAgain = document.createElement("button");
        // tryAgain.id = "try-again"
        // tryAgain.textContent = "Play again ↻"
        // document.body.appendChild(tryAgain);
        // tryAgain.addEventListener("click", () => {
        //     location.reload();
        // });
    });
});

/**
 * Determines the optimal move in a Nim game based on the current nim-sum.
 *
 * @param {number[]} arr - Array representing the piles, where each element is the number of objects in that pile.
 * @param {number} sum - The current nim-sum of `arr`.
 *   - If `sum` is 0, returns a move that turns the position into a winning (first-player) position.
 *   - If `sum` is nonzero, returns a move that turns the position into a losing (second-player) position.
 * @returns {[number, number]} A tuple [pileIndex, removeCount] for the move to make, 
 *   or [-1, -1] if no valid move is found.
 */
function getNextMove(arr, sum) {
    for (let i = 0; i < arr.length; i++) { // loop through piles
        for (let j = 1; j <= arr[i]; j++) { // gradually reduce from pile i
            let arr_copy = [...arr];
            arr_copy[i] -= j;
            let position = nim_sum(arr_copy);

            if (sum == 0) {
                if (position != 0) {
                    return [i, j];
                }
            }
            else {
                if (position == 0) {
                    return [i, j];
                }
            }
        }
    }
    return [-1, -1];
}

function isGameOver(arr) {
    let count = 0;
    for (let val of arr) {
        if (val === 0) count++;
    }
    if (count == arr.length) {
        return true;
    }
    return false;
}