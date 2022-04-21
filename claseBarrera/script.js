class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.personalRecords = [];
        this.vo2Max = [];
        this.maxHearRate()
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


const formDetails = document.getElementById("information");

formDetails.addEventListener("submit", async (event) => {
    event.preventDefault(); //this funciton prevent the default information from submitting;
    let aRunner = new Runner(formDetails['athletesName'].value, formDetails['athletesGender'].value, formDetails['athletesAge'].value);

    let aRace = new Race(formDetails['raceDistance'].value, formDetails['raceTime'].value);

    aRunner.personalRecords.push(aRace);
    console.log(aRace)
    console.log(aRunner)
    console.log(aRunner.VO2());
    updateHTML(aRunner.VO2());

});

function updateHTML(voMax) {
    const newDiv = document.getElementById("resutls")
    newDiv.innerHTML = `<h1>your vo2 max is ${Math.round(voMax)}</h1>`;
}