// The Planar Atlas Course Charting Machine

// TODO: Add hours for times less than a day.
// TODO: Add console for logging each change and course generation.
// TODO: Better card layout.

// DOM Selectors
const userConsole = document.getElementById("console");
const chart = document.getElementById("chart");
// Form
const arcanaCheck = document.getElementById("arcana-check");
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
const startButton = document.getElementById("start-chart");

// Initial Arcana check
let roll;

// Number of planes to roll
let planes;

// Plane of origin
let origin: string;

// Destination
let destination: string;

// Visited Planes
let visitedPlanes: string[];

// Indicates whether or not the free swap has been used from Aspirant Navigator feat.
let freeRollUsed: boolean;

// This will contain an array of objects, each representing a plane on the course.
let courseObjects = [];

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
    "The Boglands",
    "The Boglands",
    "The Boglands",
    "The Boglands",
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

// Returns a single plane random plane object.
function generatePlane() {
    // Generate the timing.
    const gateTime = determineTiming();

    return {
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
}

// Rolls for the travel time and gate close time.
// The first number in the return array will always be the travel time.
function determineTiming() {
    // Roll two d12.
    const timing = [Dice(12), Dice(12)]
    // The first number represents the travel time to the gate which should always be lower then the gate close time.
    // The first number in the array should always be the lower of the two.
    if (timing[0] > timing[1]) {
        return [timing[1], timing[0]];
    } else {
        return timing;
    }
}

// This will always be the first card on the course, indicating where we start.
function createOriginCard() {

    // Main Container
    const planeCard = document.createElement("div");
    planeCard.classList.add("planeCard");

    // Title
    const planeTitle = document.createElement("h1");
    planeTitle.classList.add("planeTitle");
    planeTitle.innerText = `Origin: ${origin}`;

    // You are Here
    const planeYAH = document.createElement("h2");
    planeYAH.classList.add("planeTravelTime");
    planeYAH.innerText = "The Axiom is here."

    planeCard.appendChild(planeTitle);
    planeCard.appendChild(planeYAH);

    // Return the origin card element.
    return (planeCard)
}

// Creates an HTML element to be added to the itinerary.
function createPlaneCard({ name, status, location, travelTime, gateClose }, planeCount) {

    // Main Container
    const planeCard = document.createElement("div");
    planeCard.classList.add("planeCard");
    // Name and Location
    const planeTitle = document.createElement("h1")
    planeTitle.classList.add("planeTitle");
    // If the plane is our destination, put that on the card
    if (name === destination) {
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

    // If the free reroll from Aspirant Navigator is still true, indicate.
    if (freeRollUsed) {
        rerollButton.innerText = "Reroll";
    } else {
        rerollButton.innerText = "Swap"
    }

    rerollButton.classList.add("rerollButton");
    rerollButton.setAttribute("data-index", planeCount);
    rerollButton.addEventListener("click", rerollPlane);

    // Skip the destination card.
    if (name != destination) {
        planeCard.appendChild(rerollButton);
    }

    // Return the card element.
    return planeCard;
}

// This will print a destination card in the case of maximum planes rolled or the Astral Plane.
function forceDestinationCard() {
    const gateTime = determineTiming();
    const lastPlane = {
        // The name of the plane + Destination tag.
        name: destination,
        // Rest of the object as normal.
        status: gateStatus[Dice(2) - 1],
        location: gateLocation[Dice(3) - 1],
        travelTime: gateTime[0],
        gateClose: gateTime[1]
    }

    return (createPlaneCard(lastPlane, 100))
}

// This function returns a number of planes based on their Arcana check.
function rollPlanes(arcanaRoll) {
    switch (true) {
        case (arcanaRoll <= 5):
            return (Dice(8) + Dice(8));
        case (arcanaRoll <= 10):
            return (Dice(6) + Dice(6));
        case (arcanaRoll <= 15):
            return Dice(10)
        case (arcanaRoll > 15):
            return Dice(8);
    }
}

// This function will return an initial course in an array of objects.
function determineCourse(numOfPlanes) {

    // Reset the course tracker
    courseObjects = [];

    // Reset the visited planes.
    visitedPlanes = [origin];

    for (let i = 0; i < numOfPlanes; i++) {

        if (origin === "The Astral Plane") {
            return courseObjects;
        }

        // Create a random plane
        const nextPlane = generatePlane();

        // If the plane rolled has already been visited
        if (visitedPlanes.includes(nextPlane.name)) {
            // Replace the iteration
            i -= 1;
            // Skip the iteration
            continue;
        }

        // If we see our origin plane, skip that iteration before we print.
        if (nextPlane.name === origin) {
            continue;
        }

        // If we reach our destination, stop looping.
        if (nextPlane.name === destination) {
            return courseObjects;
        }

        // Add the plane to the course objects.
        courseObjects.push(nextPlane)

        // Add the plane to list of planes already on course.
        visitedPlanes.push(nextPlane.name)

        // If we go to The Astral Plane, the next plane is always our destination.
        if (nextPlane.name === "The Astral Plane" && destination != "The Astral Plane") {
            return courseObjects;
        }
    }


    return courseObjects;
}

// This function will take an array of objects and render them one at a time, noting their order. 
function renderChart(planeObjArray) {

    // Reset the chart
    chart.innerHTML = "";

    // Counts the planes to keep the order.
    let planeCount = 0;

    // Create a card for the starting plane.
    chart.appendChild(createOriginCard())

    // Create an element for each plane on the course.
    for (planes in planeObjArray) {
        chart.appendChild(createPlaneCard(planeObjArray[planes], planeCount))
        // Increment the plane count.
        planeCount += 1
    }

    // Create a card for the destination plane.
    chart.appendChild(forceDestinationCard())
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

    // Record the destination.
    destination = destinationSelect.value;

    // Record the origin.
    origin = originSelect.value;

    // Reset the free reroll from Aspirant Navigator.
    freeRollUsed = false;

    // The players roll determines the amount of planes that must be rolled.
    planes = rollPlanes(roll)

    // We will roll that many planes into a course.
    let course = determineCourse(planes)

    // Render the course on the dom.
    renderChart(course)
}

// When a user hits the reroll button
function rerollPlane(event) {

    // Rolled planes
    const rerollPlanes = [];

    // Note the index of the card being rerolled.
    const index = event.target.attributes[1].value;

    // Roll a d4 for planes to be added.
    let rerollNum = Dice(4);

    // If they still have a free roll, give it to them and indicate it's been used.
    if (!freeRollUsed) {
        rerollNum = 1;
        freeRollUsed = true;
    }

    for (let i = 0; i < (rerollNum); i++) {

        // Make a new plane.
        let rerollPlane = generatePlane();

        // If the plane rolled has already been visited.
        // The Astral plane cannot be rolled for after the initial course is determined.
        if (visitedPlanes.includes(rerollPlane.name) || rerollPlane.name === destination || rerollPlane.name === "The Astral Plane") {
            // Replace the iteration
            i -= 1;
            // Skip the iteration
            continue;
        }

        // Add the new plane to both arrays tracking our course.
        rerollPlanes.push(rerollPlane);
        visitedPlanes.push(rerollPlane.name)
    }

    // Replace the rolled plane with the new random planes.
    courseObjects.splice(index, 1, ...rerollPlanes)

    // Render the updated chart
    renderChart(courseObjects)

}