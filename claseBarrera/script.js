
let start = prompt("do you want to find out your vow max? (yes,no)")
while (start == "yes") {
    let answer = parseInt(prompt("Chose one of the follwoning methods: resting (type 1), walk test (2), three minute test (3), 1.5 mile test (4)"));

    switch (answer) {
        case 1:
            let age = parseInt(prompt("awesome first let me know your age:"))
            let heart = parseInt(prompt("and your resting heartbeat, thank you!"))
            let vo2 = restingHearBeat(age, heart)
            alert(`nice your vo2 max is ${vo2}`)
            break;
        case 2:
            let age2 = parseInt(prompt("awesome first let me know your age:"))
            let weight = parseInt(prompt(" your weight in pounds"))
            let gender = prompt("your gender (female or male)")
            let time = parseInt(prompt("your finish time"));
            let endHeart = parseInt(prompt("your final heart rate at the end of test"))
            let vo22 = mileWalkTest(age2, weight, gender, time, endHeart)
            alert(`nice your vo2 max is ${vo22}`)
            break;
        case 3:
            let endHeart2 = parseInt(prompt("what is your heart rate at the end of test"))
            let gender2 = prompt("what is your gender (female or male)");
            let vo23 = threeMinuteStep(endHeart2, gender2);
            alert(`nice your vo2 max is ${vo23}`)
            break;
        case 4:
            let time3 = parseInt(prompt("what is your time in minuts for this test"));
            let vo24 = oneFiveMile(time3);
            alert(`nice your vo2 max is ${vo24}`)
            break;
    }

    start = prompt("do you want to try another method?")
}


function restingHearBeat(age, resting) {
    let maxHearRate = 208 - 0.7 * age
    return 15.3 * (maxHearRate / resting)
}

function mileWalkTest(age, weight, gender, time, endHeart) {
    let result = 0;
    if (gender == "female") {
        result = 132.853 - 0.0769 * weight - 0.3877 * age - 3.2649 * time - 0.1565 * endHeart
    } else {
        result = 132.853 - 0.0769 * weight - 0.3877 * age - 3.2649 * time - 0.1565 * endHeart
    }

    return result;
}

function threeMinuteStep(heartRate, gender) {
    let result = 0;
    if (gender == "female") {
        result = 65.81 - 0.1847 * heartRate
    } else {
        result = 111.33 - 0.42 * heartRate
    }
    return result;
}

function oneFiveMile(time) {
    return 483 / time + 3.5
}

