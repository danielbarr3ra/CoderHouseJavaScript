// classes used to model constant objects throughtout the app
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
        this.racers.sort((first, second) => first.time / first.distance < second.time / second.distance ? -1 : 1); //sorting for the fastest pace (lower fractions)
    }
}
//static methods utilities to help convert different units or paces later on
class Utilities {
    static parseTimeToSeconds(time) {
        let totalSeconds
        if (time.split(':').length === 2) {
            const [minutes, seconds] = time.split(':');
            totalSeconds = (+minutes) * 60 + (+seconds);
        } else if (time.split(':').length === 3) {
            const [hours, minutes, seconds] = time.split(':');
            totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
        } else {
            alert('wrong error in time format')
        }

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
    const displayRacesBtn = $("#displayRaces");
    const showLeaderBoardBtn = $("#showLeaderboard");
    const addRacerBtn = $("#addRacer");
    const sortPaceBtn = $("#sortPace");
    //forms
    const addRacerForm = $("#addRacerForm")


    //showers, these will display certain divs when seelcted
    displayRacesBtn.click(function () {
        $("#racesHubWrapper").toggle();
        loadRacesFromJson()
    })

    addRacerBtn.click(function () {
        if ($("#leaderBoardWrapper").css("display") !== "none") {
            $("#leaderBoardWrapper").toggle();
            $("#sortingFields").toggle();
        }
        $("#racerFormWrapper").toggle();
    })

    showLeaderBoardBtn.click(function () {
        if ($("#racerFormWrapper").css("display") !== "none") {
            Swal.fire({
                title: 'Hold on there buckaroo finish that racer form?',
                text: "to see your leaderboard you gotta add a race!",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Got it boss'
            })
        } else {
            $("#sortingFields").toggle();
            $("#leaderBoardWrapper").toggle();
            updateLeaderBoardHTML()
        }
    });

    //event handlesrs
    sortPaceBtn.click(function () {
        globalBoard.sortByTime();
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

    // form functions
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
            let { name, pace } = racer //destructoring object
            HTML += `<div class="leaderBoardRow"><div class="leaderBoardRow-number">${++place}</div><div class="leaderBoardRow-name">${name}</div><div class="leaderBoardRow-age">${pace}</div></div>`
        });
        $("#leaderBoardPlane").append(HTML);
    }

    const updateRacesBoardHTML = (listOfRaces) => {
        $("#racesHub").empty()
        let HTML = ""
        listOfRaces.forEach(race => {
            HTML += ` <div class="raceCard" id="raceId-${race.raceID}">
            <div class="raceCardImage">
                <img src = '../img/${race.raceID}.jpeg'>
            </div>
            <div class="raceCardInformation">
                <div class="raceCardInformationTitle">
                ${race.raceName}
                </div>
                <div class="raceCardInformationSpots">
                    there are currently ${race.currentSpots} spots left
                </div>
                <div class="raceCardInformationSignUp">
                    sign up for ${race.racePrice} dollars
                </div>

            </div>
        </div>`
        })
        $("#racesHub").append(HTML)
    }


    //fetch ajax
    function loadRacesFromJson() {
        fetch('../data/races.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                //succesfull, load new coards?
                updateRacesBoardHTML(json)
                //console.log(this.users);
            })
            .catch(function () {
                alert("error")
            })
    }
});
