// using jquery instead

$(document).ready(function () {
    // buttons 
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");
    //click handlers 
    showLeaderBoardBtn.click(function () {
        $("#leaderBoardWrapper").toggle();
    });
    addRacerBtn.click(function () {
        $("#racerFormWrapper").toggle();
    })
});


const submitRacerForm = () => {
    document.getElementById("addRacerForm").style.display = 'none'
    alert("submitted")
}
