let values = []
let inputs = []

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

    let enter2 = document.createElement("button");
    enter2.id = "enter2"
    enter2.textContent = "Enter"
    document.body.appendChild(enter2);

    document.getElementById("enter2").addEventListener("click", () => {
        for (let i = 0; i < inputs.length; i++) {
            values.push(inputs[i].value)
        }
        console.log("Values: ", values)
    });
});