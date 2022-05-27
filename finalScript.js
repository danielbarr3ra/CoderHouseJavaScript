// constant elemtn id's
const submitRacer = document.getElementById("addRacer");

// functions
const showSubmitRacerForm = () => {
    document.getElementById("addRacerForm").innerHTML = "<h1>hey lets add a form</h1>"
}


//event listeners
submitRacer.addEventListener("click", showSubmitRacerForm);
