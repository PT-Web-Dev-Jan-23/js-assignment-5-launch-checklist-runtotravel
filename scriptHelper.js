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
        return "Empty";
    } else if (isNaN(stringInput)) {
        return "Not a Number"
    } else {
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotNameInput = document.getElementById("pilotStatus");
   let copilotNameInput = document.getElementById("copilotStatus");
   let fuelLevelInput = document.getElementById("fuelStatus");
   let cargoMassInput = document.getElementById("cargoStatus");

if (validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty") {
        alert("All fields must be filled out.")
    } else if (validateInput(pilot) === "Is a Number" ||
        validateInput(copilot) === "Is a Number" ||
        validateInput(fuelLevel) === "Not a Number" ||
        validateInput(cargoLevel) === "Not a Number") {
            alert(`"Pilot name" and "Copilot Name" should only contain letters. "Fuel level" and "Cargo mass" should only contain numbers.`)
    } else {
        list.style.visibility = "visible";
        pilotNameInput.innerHTML = `Pilot Ready. The pilot is ${pilot}.`;
        copilotNameInput.innerHTML = `Copilot Ready. The copilot is ${copilot}.`;
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