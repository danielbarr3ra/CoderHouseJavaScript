// using jquery instead

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


    //helper functions, using arrow functions because work also usses them

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
        alert(RacersList)
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
    })
});
