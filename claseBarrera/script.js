class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.personalRecords = [];
        this.vo2Max = [];
    }

    maxHearRate() {
        this.maxHR = 208 - 0.7 * this.age;
    }
    VO2() {
        for (const race of this.personalRecords) {
            this.vo2Max.push(race.vo2 / race.percentMax);
        }
        const averageVO2 = this.vo2Max.reduce((a, b) => a + b, 0) / this.vo2Max.length;
        console.log(averageVO2);
        return averageVO2;
    }
}
//race object to push in the times
class Race {
    constructor(raceDistance, timeMinutes) {
        this.raceDistance = raceDistance;
        this.timeMinutes = timeMinutes;
        this.velocity();
        this.percentMax();
        this.vo2();
    }

    velocity() {
        this.velocity = this.raceDistance / this.timeMinutes;
    }
    percentMax() {
        this.percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * this.timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * this.timeMinutes);
    }
    vo2() {
        this.vo2 = -4.60 + 0.182258 * this.velocity + 0.000104 * this.velocity * this.velocity;
    }
}


let start = prompt("do you want to find out your vow max? (yes,no)");
let costumer;
if (start == "yes") {
    let name = prompt("awesome lets get some info first, whats your name");
    let gender = prompt("whats your gender");
    let age = parseInt(prompt("and age?"));
    costumer = new Runner(name, gender, age);
    costumer.maxHearRate()
    console.log(costumer.maxHR);
    //the runner class is good;
}
start = prompt("awesome, lets get some informationa about your races in meter and minutes. Want to add a race?");
while (start == "yes") {
    let distance = parseFloat(prompt("what is the disntace of the race?"));
    let time = parseFloat(prompt("what is the time of the race in minutes"))
    costumer.personalRecords.push(new Race(distance, time));
    start = prompt("want to add another one?");
}

console.log(costumer.personalRecords);

const answer = costumer.VO2();
alert(`nice your vo2 max is ${answer}`);

//updatet the info in the otehr card

let racersName = document.getElementById("racersName")
let racersInfo = document.getElementById("racersInfo")
racersName.innerText = costumer.name;
racersInfo.innerText = costumer.age + " years old | " + costumer.gender;

let racersDistance = document.getElementById("racersDistance");
let raceTime = document.getElementById("raceTime");
let speed = document.getElementById("speed");
let vomax = document.getElementById("vomax");

racersDistance.innerText = costumer.personalRecords[0].raceDistance;
raceTime.innerText = costumer.personalRecords[0].timeMinutes;
speed.innerText = costumer.personalRecords[0].velocity;
vomax.innerText = Math.round(costumer.VO2());