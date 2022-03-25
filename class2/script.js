let age = prompt("how old are you?");
if (age > 0 && age <= 17) {
    alert("you are a kid");
} else if (age >= 18 && age <= 40) {
    alert("you are an adult")
} else if (age > 40) {
    alert("you are too old");
}