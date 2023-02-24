// The Planar Atlas Course Charting Machine

// TODO: Add a nope button to reroll planes.
// TODO: Add an exception for the astral plane.
// TODO: Prevent duplicate planes on route.
// TODO: Add input for destination plane.
// TODO: Add input for origin plane.
// TODO: Add hours for times less than a day.

// DOM Selectors
const arcanaCheck = document.getElementById("arcana-check");
const startButton = document.getElementById("start-chart");
const userConsole = document.getElementById("console");
const chart = document.getElementById("chart")

// Initial Arcana check
let roll;

// Number of planes to roll
let planes;

// Array of all possible planes
const planarAtlas = [
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Astral Plane",
    "The Elemental Plane of Earth",
    "The Elemental Plane of Earth",
    "The Elemental Plane of Earth",
    "The Elemental Plane of Water",
    "The Elemental Plane of Water",
    "The Elemental Plane of Water",
    "The Elemental Plane of Fire",
    "The Elemental Plane of Fire",
    "The Elemental Plane of Fire",
    "The Elemental Plane of Air",
    "The Elemental Plane of Air",
    "The Elemental Plane of Air",
    "The Demi-Elemental Plane of Fog",
    "The Demi-Elemental Plane of Fog",
    "The Demi-Elemental Plane of Steam",
    "The Demi-Elemental Plane of Steam",
    "The Demi-Elemental Plane of Mud",
    "The Demi-Elemental Plane of Mud",
    "The Demi-Elemental Plane of Smoke",
    "The Demi-Elemental Plane of Smoke",
    "The Demi-Elemental Plane of Sand",
    "The Demi-Elemental Plane of Sand",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "Avernus",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "The Abyss",
    "Githgarden",
    "Githgarden",
    "Githgarden",
    "The Blood Flats",
    "The Blood Flats",
    "The Blood Flats",
    "Axiom",
    "Axiom",
    "Axiom",
    "Axiom",
    "Axiom",
    "Arcadia",
    "Arcadia",
    "Arcadia",
    "Incarnum",
    "Incarnum",
    "Incarnum",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Mortal Kingdoms",
    "The Feywilds",
    "The Feywilds",
    "The Feywilds",
    "The Feywilds",
    "The Feywilds",
    "The Feywilds",
    "The Shadowfell",
    "The Shadowfell",
    "The Shadowfell",
    "The Shadowfell",
    "The Shadowfell",
    "Limbo",
    "Limbo",
    "The Cloud Reaches",
    "The Cloud Reaches",
    "The Lower Celestial Plane",
    "??? (96)",
    "??? (97)",
    "??? (98)",
    "??? (99)",
    "??? (100)",
]

// Array of all possible gate statuses.
const gateStatus = [
    "Opening",
    "Closing"
]

// Array of all possible gate locations.
const gateLocation = [
    "Wilderness",
    "Civilization",
    "Open Sky"
]

// Dice Roller w/ param for sides.
function Dice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Rolls for the travel time and gate close time.
// The first number in the return array will always be the travel time.
function determineTiming() {
    const timing = [Dice(12), Dice(12)]
    if (timing[0] > timing[1]) {
        return [timing[1], timing[0]];
    } else {
        return timing;
    }
}

// Creates an HTML element to be added to the itinerary.
function createPlaneCard({ name, status, location, travelTime, gateClose }) {
    // Main Container
    const planeCard = document.createElement("div");
    planeCard.classList.add("planeCard");
    // Name and Location
    const planeTitle = document.createElement("h1")
    planeTitle.classList.add("planeTitle");
    planeTitle.innerText = `${name} - ${location}`
    planeCard.appendChild(planeTitle)
    // Travel Info Container
    const planeInfo = document.createElement("ul");
    planeInfo.classList.add("planeInfo");
    // Travel Time
    const planeTravelTime = document.createElement("li")
    planeTravelTime.innerText = `The next gate will take ${travelTime} days to reach.`;
    planeTravelTime.classList.add("planeTravelTime");
    planeInfo.appendChild(planeTravelTime);
    // Opens/Closes in 
    const planeOpensIn = document.createElement("li");
    planeOpensIn.innerText = `The gate will be ${status} in ${gateClose} days.`;
    planeOpensIn.classList.add("planeOpensIn");
    planeInfo.appendChild(planeOpensIn);

    planeCard.appendChild(planeInfo);

    // Reroll Button
    const rerollButton = document.createElement("button");
    rerollButton.innerText = "Reroll";
    rerollButton.classList.add("rerollButton");
    planeCard.appendChild(rerollButton);
    // planeCard.innerText = `A gate to Plane ${name} will be ${status} in ${gateClose} days. It will take ${travelTime} days to get there and the gate will open over ${location}.`
    return planeCard;
}

// When start button is clicked.
function Chart() {
    // Check that they entered something.
    if (arcanaCheck.value === "") {
        alert("Please enter your roll")
        return;
    } else {
        // Store the input as their roll.
        roll = Number(arcanaCheck.value);
        // Reset the input
        arcanaCheck.value = "";
    }

    // Reset the chart
    chart.innerHTML = "";

    // The players roll determines the amount of planes that must be rolled.
    switch (true) {
        case (roll <= 5):
            planes = (Dice(8) + Dice(8));
            break;
        case (roll <= 10):
            planes = (Dice(6) + Dice(6));
            break;
        case (roll <= 15):
            planes = Dice(10)
            break;
        case (roll > 15):
            planes = Dice(8);
            break;
    }

    // Roll the number of planes specified.
    for (let i = 0; i < planes; i++) {
        const gateTime = determineTiming();
        // Create a plane
        const nextPlane = {
            // The name of the plane.
            name: planarAtlas[Dice(100) - 1],
            // Is the gate opening, open, or closing.
            status: gateStatus[Dice(2) - 1],
            // Where the gate will open in that plane
            location: gateLocation[Dice(3) - 1],
            // How long it will take to get to that gate.
            travelTime: gateTime[0],
            // How long until the gate closes.
            gateClose: gateTime[1]
        }

        // Create and append a plane card to the chart.
        chart.appendChild(createPlaneCard(nextPlane))
    }

    alert(`You rolled ${planes} planes!`)

}
