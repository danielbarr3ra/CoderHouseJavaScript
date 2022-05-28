// constant buuttons in the page that will trigger 
const addRacerBtn = document.getElementById("addRacer");
const submitRacerBtn = document.getElementById("submitRacerForm")
// functions
const showSubmitRacerForm = () => {
    document.getElementById("addRacerForm").style.display = 'flex'
}
const submitRacerForm = () => {
    document.getElementById("addRacerForm").style.display = 'none'
    alert("submitted")
}

//event listeners
addRacerBtn.addEventListener("click", showSubmitRacerForm);
submitRacerBtn.addEventListener("click", submitRacerForm);

// leaderboard but unshow methods

$(document).ready(function () {
    // jquery has been loaded 
    const showLeaderBoardBtn = $("#showLeaderboard");
    //function 
    showLeaderBoardBtn.click(function () {
        $("#globalBoard").toggle();
    });
});