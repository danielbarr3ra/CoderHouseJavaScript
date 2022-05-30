// using jquery instead
class Racer {
    constructor(name, age, gender, distance, time) {
        this.name = name
        this.age = age
        this.gender = gender
        this.distance = distance
        this.time = time
    }
}
class LeaderBoard {
    constructor() {
        this.racers = [];
    }
}
//static utilities to help convert etc
class Utilities {
    static parseTimeToSeconds(time) {
        const [minutes, seconds] = time.split(':');
        const totalSeconds = (+minutes) * 60 + (+seconds);
        return totalSeconds
    }
}

$(document).ready(function () {
    // helpufl html for cards
    // var racerRowLeaderBoard = '<div class = "racerRow">';

    // storage
    const leaderBoard = new LeaderBoard();

    // buttons 
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");

    //forms
    const addRacerForm = $("#addRacerForm")




    //show form
    addRacerBtn.click(function () {
        $("#racerFormWrapper").toggle();

    })
    addRacerForm.on("submit", function (e) {
        e.preventDefault();
        const answers = $(e.target)
        collectRacerForm(answers);
        $("#racerFormWrapper").toggle();

        //updateCurrentLeaderBoard();

    })


    const collectRacerForm = (aForm) => {
        const arrayAnswers = $(aForm).serializeArray()
        let time = Utilities.parseTimeToSeconds(arrayAnswers[4].value)
        const aRacer = new Racer(arrayAnswers[0].value, arrayAnswers[1].value, arrayAnswers[2].value, arrayAnswers[3].value, time)
        return aRacer
    }


    // //helper functions, using arrow functions because work also usses them

    // //update leaderboard
    // const updateCurrentLeaderBoard = () => {
    //     $("#leaderBoardPlane").empty()
    //     let HTML = ""
    //     RacersList.forEach(racer => {
    //         let { racersName, racersAge, racersGender } = racer
    //         HTML += `<div class="leaderBoardRow"><div class="leaderBoardRow-number">${racersGender}</div><div class="leaderBoardRow-name">${racersName}</div><div class="leaderBoardRow-age">${racersAge}</div></div>`
    //     });
    //     $("#leaderBoardPlane").append(HTML);

    //     //add hmtl to object 
    // }

    // //convert form to json
    // const formToJson = (aForm) => {
    //     const arrayAnswers = $(aForm).serializeArray()
    //     const jsonObject = {}
    //     //jquery for each eleemnt
    //     $.each(arrayAnswers, function () {
    //         jsonObject[this.name] = this.value || "";
    //     });
    //     return jsonObject
    // }

    // //submit runner object to database
    // const postRacerToList = (aRacer) => {
    //     RacersList.push(aRacer);
    // }

    // //might neeed later
    // const getRacerFromList = (aRacersName) => {

    // }

    // //click handlers 
    // showLeaderBoardBtn.click(function () {
    //     $("#leaderBoardWrapper").toggle();
    // });

    // addRacerBtn.click(function () {
    //     $("#racerFormWrapper").toggle();

    // })

    // // submit form handlers
    // addRacerForm.on("submit", function (e) {
    //     e.preventDefault();
    //     const form = $(e.target)
    //     const racerJson = formToJson(form)
    //     postRacerToList(racerJson);
    //     $("#racerFormWrapper").toggle();
    //     $("#competitionWrapper").toggle();

    //     //updateCurrentLeaderBoard();

    // })
});
