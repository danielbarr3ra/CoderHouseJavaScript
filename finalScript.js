// using jquery instead
class Competitions {
    constructor(distance, time) {
        this.distance = distance
        this.time = time
    }
}
class Racer {
    constructor(name, age, gender, competitions) {
        this.name = name
        this.gender = gender
        this.age = age
        this.competitions = competitions
    }
}
class LeaderBoard {
    constructor() {
        this.racers = [];
    }
}

$(document).ready(function () {
    // helpufl html for cards
    // var racerRowLeaderBoard = '<div class = "racerRow">';

    // storage
    const RacersList = []

    // buttons 
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");

    //forms
    const addRacerForm = $("#addRacerForm")
    const addComptetitionsForm = $("#addCompetitions")


    //helper functions, using arrow functions because work also usses them

    //update leaderboard
    const updateCurrentLeaderBoard = () => {
        $("#leaderBoardPlane").empty()
        let HTML = ""
        RacersList.forEach(racer => {
            let { racersName, racersAge, racersGender } = racer
            HTML += `<div class="leaderBoardRow"><div class="leaderBoardRow-number">${racersGender}</div><div class="leaderBoardRow-name">${racersName}</div><div class="leaderBoardRow-age">${racersAge}</div></div>`
        });
        $("#leaderBoardPlane").append(HTML);

        //add hmtl to object 
    }

    //convert form to json
    const formToJson = (aForm) => {
        const arrayAnswers = $(aForm).serializeArray()
        const jsonObject = {}
        //jquery for each eleemnt
        $.each(arrayAnswers, function () {
            jsonObject[this.name] = this.value || "";
        });
        return jsonObject
    }

    //submit runner object to database
    const postRacerToList = (aRacer) => {
        RacersList.push(aRacer);
    }

    //might neeed later
    const getRacerFromList = (aRacersName) => {

    }

    //click handlers 
    showLeaderBoardBtn.click(function () {
        $("#leaderBoardWrapper").toggle();
    });

    addRacerBtn.click(function () {
        $("#racerFormWrapper").toggle();

    })

    // submit form handlers
    addRacerForm.on("submit", function (e) {
        e.preventDefault();
        const form = $(e.target)
        const racerJson = formToJson(form)
        postRacerToList(racerJson);
        $("#racerFormWrapper").toggle();
        $("#competitionWrapper").toggle();

        //updateCurrentLeaderBoard();

    })
});
