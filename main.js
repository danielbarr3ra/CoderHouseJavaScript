// classes used for the social media app.
class Racer {
    constructor(name, age, gender, distance, time) {
        this.name = name
        this.age = age
        this.gender = gender
        this.distance = distance
        this.time = time
        this.pace = Utilities.paceMinPerKm(time, distance)
    }
}
class LeaderBoard {
    constructor(racerList) {
        this.racers = racerList;
    }
    addRacer(aRacer) {
        this.racers.push(aRacer)
    }
    sortByTime() {
        this.racers.sort((first, second) => first.time > second.time ? 1 : -1);
    }
}
//static utilities to help convert different units or paces later on
class Utilities {
    static parseTimeToSeconds(time) {
        const [minutes, seconds] = time.split(':');
        const totalSeconds = (+minutes) * 60 + (+seconds);
        return totalSeconds
    }
    static paceMinPerKm(seconds, meters) {
        var pace = (seconds / meters) / 60 * 1000;
        var leftover = pace % 1;
        var minutes = pace - leftover;
        var seconds = Math.round(leftover * 60);
        console.log(minutes + ":" + seconds)
        return `${minutes} : ${seconds} min/km`
    }
}
// jquery 
$(document).ready(function () {
    //load information from previous session.
    let globalBoard = localStorage.getItem('globalBoard') !== null ? new LeaderBoard(JSON.parse(localStorage.getItem('globalBoard')).racers) : new LeaderBoard([]);

    // buttons 
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");
    const sortPaceBtn = $("#sortPace");
    //forms
    const addRacerForm = $("#addRacerForm")




    //showers, these will display certain dvis when seelcted
    addRacerBtn.click(function () {
        $("#racerFormWrapper").toggle();

    })

    showLeaderBoardBtn.click(function () {
        $("#sortingFields").toggle();
        $("#leaderBoardWrapper").toggle();
        updateLeaderBoardHTML()
    });

    //event handlesrs
    sortPaceBtn.click(function () {
        globalBoard.sortByTime();
        alert("sorting")
        updateLeaderBoardHTML();
    })

    addRacerForm.on("submit", function (e) {
        e.preventDefault();
        const answers = $(e.target)
        newRacer = collectRacerForm(answers);
        globalBoard.addRacer(newRacer);
        $("#racerFormWrapper").toggle();
        localStorage.setItem("globalBoard", JSON.stringify(globalBoard));
    })

    // helper functions

    const collectRacerForm = (aForm) => {
        const arrayAnswers = $(aForm).serializeArray()
        let time = Utilities.parseTimeToSeconds(arrayAnswers[4].value)
        const aRacer = new Racer(arrayAnswers[0].value, arrayAnswers[1].value, arrayAnswers[2].value, arrayAnswers[3].value, time)
        return aRacer
    }

    const updateLeaderBoardHTML = () => {
        $("#leaderBoardPlane").empty()
        let HTML = ""
        let place = 0;
        globalBoard.racers.forEach(racer => {
            let { name, age, gender, distance, time, pace } = racer
            HTML += `<div class="leaderBoardRow"><div class="leaderBoardRow-number">${++place}</div><div class="leaderBoardRow-name">${name}</div><div class="leaderBoardRow-age">${pace}</div></div>`
        });
        $("#leaderBoardPlane").append(HTML);

    }
});
