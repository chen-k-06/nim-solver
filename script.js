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
    while (true) {
        let ones_count = 0;
        let zero_count = 0;

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

    let label2 = document.createElement("label");
    label2.for = quantity;
    label2.textContent = "For each pile, enter how many stones: ";
    document.body.appendChild(label2);

    let enter2 = document.createElement("button");
    enter2.id = "enter2"
    enter2.textContent = "Enter"
    document.body.appendChild(enter2);

    document.getElementById("enter2").addEventListener("click", () => {
        values = []
        for (let i = 0; i < inputs.length; i++) {
            values.push(parseInt(inputs[i].value))
        }
        console.log("Values: ", values)

        // determine if first or second player game
        let sum = nim_sum(values);
        console.log("Sum: ", sum);
        let result_text = document.createElement("p");

        if (sum == 0) {
            result_text.textContent = `${values} is a second player game.`;
        }
        else {
            result_text.textContent = `${values} is a first player game.`;
        }
        document.body.appendChild(result_text);
        // enter2.disabled = true;

        // refresh button
        let tryAgain = document.createElement("button");
        tryAgain.id = "try-again"
        tryAgain.textContent = "Play again ↻"
        document.body.appendChild(tryAgain);
        tryAgain.addEventListener("click", () => {
            location.reload();
        });
    });
});