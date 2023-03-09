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
        pilotNameInput.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotNameInput.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

let launchStatus = document.getElementById("launchStatus");
      
if (fuelLevel < 10000 && cargoLevel > 10000) {
    fuelLevelInput.innerHTML = "Fuel level too low for launch";
    cargoMassInput.innerHTML = "Cargo mass too heavy for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    list.style.visibility = "visible";
    launchStatus.style.color = "rgb(199, 37, 78)"; }

    else if (fuelLevel < 10000 && cargoLevel <= 10000) {
        fuelLevelInput.innerHTML = "Fuel level too low for launch";
        cargoMassInput.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        list.style.visibility = "visible";
        launchStatus.style.color = "rgb(199, 37, 78)";
    }
        else if  (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuelLevelInput.innerHTML = "Fuel level high enough for launch";
            cargoMassInput.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            list.style.visibility = "visible";
            launchStatus.style.color = "rgb(199, 37, 78)";
        }
            else {
                fuelLevelInput.innerHTML = "Fuel level high enough for launch";
                cargoMassInput.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle is Ready for Launch";
                list.style.visibility = "visible";
                launchStatus.style.color = "rgb(65, 159, 106)";
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