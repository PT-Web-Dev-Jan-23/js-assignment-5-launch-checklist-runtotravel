// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionInfo = document.getElementById("missionTarget");
    missionInfo.innerHTML = 
        `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}">`;
}

function validateInput(stringInput) {
    if (stringInput === "") {
        return "empty";
    } else if (isNaN(stringInput)) {
        return "Not a number"
    } else {
        return "Is a number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotNameInput = document.getElementById("pilotName");
   let copilotNameInput = document.getElementById("copilotName");
   let fuelLevelInput = document.getElementById("fuelLevel");
   let cargoMassInput = document.getElementById("cargoMass");

if (validateInput(pilot) === "empty" ||
    validateInput(copilot) === "empty" ||
    validateInput(fuelLevel) === "empty" ||
    validateInput(cargoLevel) === "empty") {
        alert("All fields must be filled out.")
    } else if (validateInput(pilot) === "Is a number" ||
        validateInput(copilot) === "Is a number" ||
        validateInput(fuelLevel) === "Not a number" ||
        validateInput(cargoLevel) === "Not a number") {
            alert(`"Pilot name" and "Copilot Name" should only contain letters. "Fuel level" and "Cargo mass" should only contain numbers.`)
    } else {
        list.style.visibility = "visible";
        pilotNameInput.innerHTML = `Pilot Ready. The pilot is ${pilotName}`;
        copilotNameInput.innerHTML = `Copilot Ready. The copilot is ${copilotName}`;
    }

let launchStatus = document.getElementById("launchStatus");
      
if (fuelLevel < 10000 && cargoLevel > 10000) {
    fuelLevelInput.innerHTML = "There is not enough fuel for the journey.";
    cargoMassInput.innerHTML = "There is too much mass for the shuttle to take off.";
    launchStatus.innerHTML = "Shuttle not ready for launch.";
    list.style.visibility = "visible";
    launchStatus.style.color = "red"; }

    else if (fuelLevel < 10000 && cargoLevel <= 10000) {
        fuelLevelInput.innerHTML = "There is not enough fuel for the journey.";
        cargoMassInput.innerHTML = "The cargo mass is acceptable for launch.";
        launchStatus.innerHTML = "Shuttle not ready for launch.";
        list.style.visibility = "visible";
        launchStatus.style.color = "red";
    }
        else if  (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuelLevelInput.innerHTML = "There is enough fuel for the journey.";
            cargoMassInput.innerHTML = "There is too much mass for the shuttle to take off.";
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            list.style.visibility = "visible";
            launchStatus.style.color = "red";
        }
            else {
                fuelLevelInput.innerHTML = "There is enough fuel for the journey.";
                cargoMassInput.innerHTML = "The cargo mass is acceptable for launch.";
                launchStatus.innerHTML = "Shuttle ready for launch!";
                list.style.visibility = "visible";
                launchStatus.style.color = "green";
            }
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let chosenPlanet = Math.floor(Math.random() *planets.length);
    return planets[chosenPlanet];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;