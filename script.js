//objects
class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.races = [];
        this.id = counterID;
        counterID++;
        this.totalDistance = 0;
    }
    addRace(Race) {
        this.races.push(Race);
        this.totalDistance += parseInt(Race.distance);
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

class LeaderBoard {
    constructor() {
        this.members = []; //an empty array of members we will add them in the future
    }
    addMember(Runner) {
        this.members.push(Runner);
    }
    findMember(anID) {
        let indexRunner = this.members.findIndex(runner => runner.id == anID);
        return indexRunner;
    }
    updateMember(anID, newDistance, newTime) {
        let indexRunner = this.findMember(anID);
        let newRace;
        if (indexRunner != -1) {
            newRace = new Race(newDistance, newTime);
            this.members[indexRunner].addRace(newRace);
        }
    }
    getLeader() {
        let max = this.members.reduce((prev, current) => {
            return (prev.totalDistance > current.totalDistance) ? prev : current
        })
        return max;
    }
}


//instatianting  the leaderborad, get constants

const global = new LeaderBoard(); //need to check if the local storage is empty or not
let counterID = localStorage.getItem('counterID') == null ? 0 : parseInt(localStorage.getItem('counterID'))

const userForm = document.getElementById("racerForm");
const raceForm = document.getElementById('updateRaceForm');

//validation of event functions;


//add a racer
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    global.addMember(createRunner());
    dsiplayLeaderBoard();
    dsiplayLeaderBoardCards()
    //this is bad becasue I'm just reweritgn the whole list everry time I run it.
    localStorage.setItem('global', JSON.stringify(global));
    localStorage.setItem('counterID', JSON.stringify(counterID));
    updateCurrentLeader()
})


const submitBtn = document.getElementById("submit-racer");
submitBtn.addEventListener("click", () => {
    validateRacer();
    Swal.fire({
        title: 'New runner?',
        text: 'Welcome to the community',
        icon: 'success',
        confirmButtonText: 'lets run!'
    })
})

//add new race to an existing racer
raceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    global.updateMember(raceForm.elements['updateRaceID'].value, raceForm.elements['updateDistance'].value, raceForm.elements['updateTime'].value);

    dsiplayLeaderBoard()
    dsiplayLeaderBoardCards()
    updateCurrentLeader()
})


// functions for events;
function createRunner() {
    let aRace = new Race(userForm.elements['distance'].value, userForm.elements['time'].value);
    let aRunner = new Runner(userForm.elements['name'].value, userForm.elements['age'].value, userForm.elements['gender'].value);

    aRunner.addRace(aRace);
    return aRunner;
}



function dsiplayLeaderBoardCards() {
    let formatedTable = "";
    global.members.forEach((runner) => formatedTable += '<div class = "racerRows"><div class = "racerCardName">' +
        runner.name + '</div><div class = "racerCardDistance">' +
        runner.totalDistance + '</div><div class = "racerCardID">' + runner.id + '</div></div>');
    document.getElementById("racer-rows").innerHTML = formatedTable
}

function updateCurrentLeader() {
    let maxRunner = global.getLeader();
    //destructure the info of the racer with vo2 max etc
    let { name, gender, age, races, id, distance, vo2 } = maxRunner;
    document.getElementById("leaderCard").innerHTML = '<h1> the current leader is ' + name + "<h1>";
}