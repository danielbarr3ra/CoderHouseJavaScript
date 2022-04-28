//objects
class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.races = [];
        //TODO add haschode to create ID avoid duplicate confussion.
    }
    addRace(Race) {
        this.races.push(Race);
        this.totalDistance();
    }
    totalDistance() {
        let initial = 0;
        if (this.races.length > 1) {
            this.totalDistance = this.races.reduce((prev, curr) => prev.distance + curr.distance, 0)
        } else {
            this.totalDistance = this.races[0].distance;
        }

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

class Race {
    constructor(distance, duration) {
        this.distance = distance; //meters need to add option
        this.duration = duration;
        this.velocity = this.distance / this.duration;
        this.calcuateVoMax();
    }

    calcuateVoMax() {
        let percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * this.duration) + 0.2989558 * Math.exp(-0.1932605 * this.duration);
        let vo2 = -4.60 + 0.182258 * this.velocity + 0.000104 * this.velocity * this.velocity;
        this.vo2Max = (vo2 / percentMax);
    }
}

//instatianting  the leaderborad

const global = new LeaderBoard();


const userForm = document.getElementById("racerForm");


//events
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    global.addMember(createRunner());
    dsiplayLeaderBoard();
    //this is bad becasue I'm just reweritgn the whole list everry time I run it.
    localStorage.setItem('global', JSON.stringify(global));
})



// functions for events;
function createRunner() {
    let aRace = new Race(userForm.elements['distance'].value, userForm.elements['time'].value);

    let aRunner = new Runner(userForm.elements['name'].value, userForm.elements['age'].value, userForm.elements['gender'].value);

    aRunner.addRace(aRace);
    return aRunner;
}



function dsiplayLeaderBoard() {
    let formatedTable = "";
    global.members.forEach((runner) => formatedTable += '<tr><td>' + runner.name + '</td><td>' + runner.totalDistance + '</td></tr>');
    document.getElementById("listOfRacers").innerHTML = formatedTable
}