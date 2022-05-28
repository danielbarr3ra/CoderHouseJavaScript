// using jquery instead

$(document).ready(function () {
    // buttons 
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");
    const submitRacerFormBtn = $("#submitRacerForm");

    //forms
    const addRacerForm = $("#addRacerForm")

    //helper functionss 
    //using arrow functions because work also usses them
    const formToJson = (aForm) => {
        const arrayAnswers = $(aForm).serializeArray()
        const jsonObject = {}
        //jquery for each eleemnt
        $.each(arrayAnswers, function () {
            jsonObject[this.name] = this.value || "";
        });
        return jsonObject
    }
    //click handlers 
    showLeaderBoardBtn.click(function () {
        $("#leaderBoardWrapper").toggle();
    });

    addRacerBtn.click(function () {
        $("#racerFormWrapper").toggle();
    })
    // submit racerFrom

    addRacerForm.on("submit", function (e) {
        e.preventDefault();
        const form = $(e.target) //this gets the form since the event has the target, I think?
        const racerJson = formToJson(form)
        console.log(racerJson)
        alert("new method")
        alert(racerJson)
    })
});
