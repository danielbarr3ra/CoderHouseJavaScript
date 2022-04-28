//objects
class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.maxHR = 208 - 0.7 * this.age;
        this.races = [];
    }
}

class LeaderBoard {
    constructor() {
        this.members = []; //an empty array of members we will add them in the future
    }
    addMember(Runner) {
        this.members.push(Runner);
    }
}

//instatianting  the leaderborad

const global = new LeaderBoard();


const userForm = document.getElementById("racerForm");

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = userForm.elements['name'].value;
    let age = userForm.elements['age'].value;
    let gender = userForm.elements['gender'].value;
    let Racer = new Runner(name, age, gender);
    global.addMember(Racer);
    dsiplayLeaderBoard();
})

function dsiplayLeaderBoard() {
    let formatedTable = "";
    global.members.forEach((runner) => formatedTable += '<tr><td>' + runner.name + '</td><td>' + runner.age + '</td></tr>');
    document.getElementById("listOfRacers").innerHTML = formatedTable
}