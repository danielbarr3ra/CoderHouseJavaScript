let answer = prompt("wanna play a guessing game? (yes or no)");

if (answer === "yes") {
    let number = Math.floor(Math.random() * 10);
    let guess = parseInt(prompt("awesome! I'm thinking of a number from zero to ten, whats your initial guess?"));
    while (guess !== number) {
        if (guess < number) {
            alert("nope its higher");
        } else {
            alert("nope its lower");
        }
        guess = parseInt(prompt("try again"))
    }
    alert(`congrats ${guess} is the right number, I had ${number} in mind!`);
}

alert("maybe we can play another time")
