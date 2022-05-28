// using jquery instead

$(document).ready(function () {
    // set racersDatabase
    if (localStorage.getItem("storedRacers") === null) {
        localStorage.setItem("storedRacers", []);
    }

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
    const postRacerDatabase = (aRacer) => {
        const postObject = JSON.stringify(aRacer);

    }

    const getRacerDatabase = (aRacersName) => {

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
        const form = $(e.target) //this gets the form since the event has the target, I think?
        const racerJson = formToJson(form)
        console.log(racerJson)
        alert("new method")
        alert(racerJson)
    })
});
