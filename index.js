// The Planar Atlas Course Charting Machine

// TODO: Add a button to reroll planes.
// TODO: Add hours for times less than a day.

// DOM Selectors
const arcanaCheck = document.getElementById("arcana-check");
const startButton = document.getElementById("start-chart");
const userConsole = document.getElementById("console");
const chart = document.getElementById("chart");
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");

// Initial Arcana check
let roll;

// Number of planes to roll
let planes;

// Plane of origin
let origin;

// Destination
let destination;

// Visited Planes
let visitedPlanes;

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
    "???",
    "???",
    "???",
    "???",
    "???",
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

// When a user hits the reroll button
function rerollPlane() {
    // Roll a d4 for planes to be added.
    const rerollNum = Dice(4);
    console.log(visitedPlanes);
    console.log(rerollNum);
}

// Creates an HTML element to be added to the itinerary.
function createPlaneCard({ name, status, location, travelTime, gateClose }) {
    // Main Container
    const planeCard = document.createElement("div");
    planeCard.classList.add("planeCard");
    // Name and Location
    const planeTitle = document.createElement("h1")
    planeTitle.classList.add("planeTitle");
    // If the plane is our destination, put that on the card
    if (name === destinationSelect.value) {
        planeTitle.innerText = `Destination: ${name} - ${location}`
    } else {
        planeTitle.innerText = `${name} - ${location}`
    }
    planeCard.appendChild(planeTitle)
    // Travel Info Container
    const planeInfo = document.createElement("ul");
    planeInfo.classList.add("planeInfo");
    // Travel Time
    const planeTravelTime = document.createElement("li")
    planeTravelTime.innerText = `The gate to ${name} will take ${travelTime} days to reach.`;
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
    rerollButton.setAttribute("onclick", "rerollPlane()")
    // Skip if 
    if (name != `Destination: ${destinationSelect.value}`) {
        planeCard.appendChild(rerollButton);
    }
    return planeCard;
}

// This will always be the first card on the course, indicating where we start.
function createOriginCard() {

    // Main Container
    const planeCard = document.createElement("div");
    planeCard.classList.add("planeCard");

    // Title
    const planeTitle = document.createElement("h1");
    planeTitle.classList.add("planeTitle");
    planeTitle.innerText = `Origin: ${originSelect.value}`;

    // You are Here
    const planeYAH = document.createElement("h2");
    planeYAH.classList.add("planeTravelTime");
    planeYAH.innerText = "The Axiom is here."

    planeCard.appendChild(planeTitle);
    planeCard.appendChild(planeYAH);

    return (planeCard)


}

// This will print a destination card in the case of maximum planes rolled or the Astral Plane.
function forceDestinationCard() {
    const gateTime = determineTiming();
    const lastPlane = {
        // The name of the plane + Destination tag.
        name: `Destination: ${destinationSelect.value}`,
        // Rest of the object as normal.
        status: gateStatus[Dice(2) - 1],
        location: gateLocation[Dice(3) - 1],
        travelTime: gateTime[0],
        gateClose: gateTime[1]
    }

    return (createPlaneCard(lastPlane))
}

// When start button is clicked.
function Chart() {
    // Check that they entered something.
    if (arcanaCheck.value === "") {
        alert("Please enter your roll");
        return;
    } else {
        // Store the input as their roll.
        roll = Number(arcanaCheck.value);
        // Reset the input
        arcanaCheck.value = "";
    }

    // Check if they have selected two different planes.
    if (originSelect.value === destinationSelect.value) {
        alert(`You are already in ${originSelect.value}!`)
        return;
    }

    // Reset the chart
    chart.innerHTML = "";

    // Planes already on the course
    visitedPlanes = [originSelect.value];


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

    // Create a card for the starting plane.
    chart.appendChild(createOriginCard())

    // Counts the planes as they are added
    const planeCount = 0;

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

        // If the plane rolled has already been visited
        if (visitedPlanes.includes(nextPlane.name)) {
            // Replace the iteration
            i -= 1;
            // Skip the iteration
            continue;
        }

        // Add the plane to list of planes already on course.
        visitedPlanes.push(nextPlane.name)

        // If we see our origin plane, skip that iteration before we print.
        if (nextPlane.name === originSelect.value) {
            continue;
        }

        // Increment the planeCount if its valid.
        
        // Create and append a plane card to the chart.
        // Add the planeCount to keep track of the order.
        chart.appendChild(createPlaneCard(nextPlane, planeCount))
        
        planeCount += 1;
        // If we go to The Astral Plane, the next plane is always our destination.
        if (nextPlane.name === "The Astral Plane" && destinationSelect.value != "The Astral Plane") {
            chart.appendChild(forceDestinationCard())
            return;
        }

        // If we reach our destination, stop looping.
        if (nextPlane.name === destinationSelect.value) {
            return;
        }
    }

    // Create a destination card if not found within the scheduled planes.
    chart.appendChild(forceDestinationCard())

}
