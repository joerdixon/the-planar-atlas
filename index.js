// The Planar Atlas Course Charting Machine

// TODO: Add a nope button to reroll planes.
// TODO: Add an exception for the astral plane

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
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    "Astral Plane",
]

// Array of all possible gate statuses.
const gateStatus = [
    "Opening",
    "Open",
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
    // Title
    const planeTitle = document.createElement("h1")
    planeTitle.classList.add("planeTitle");
    planeTitle.innerText = `The ${name}`
    planeCard.appendChild(planeTitle)
    // Travel Info Container
    const planeInfo = document.createElement("ul");
    planeInfo.classList.add("planeInfo");
    // Travel Time
    const planeTravelTime = document.createElement("li")
    planeTravelTime.innerText = travelTime;
    planeTravelTime.classList.add("planeTravelTime");
    planeInfo.appendChild(planeTravelTime);
    // Opens in 
    const planeOpensIn = document.createElement("li");
    planeOpensIn.innerText = gateClose;
    planeOpensIn.classList.add("planeOpensIn");
    planeInfo.appendChild(planeOpensIn);
    // Opens Over
    const planeOpensOver = document.createElement("li");
    planeOpensOver.innerText = location;
    planeOpensOver.classList.add("planeOpensOver");
    planeInfo.appendChild(planeOpensOver);

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
    } else {
        // Store the input as their roll.
        roll = Number(arcanaCheck.value);
        // Reset the input
        arcanaCheck.value = "";
    }

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

    // Create the course itinerary element

    // Roll the number of planes specified.
    for (let i = 0; i < planes; i++) {
        const gateTime = determineTiming();
        // Create a plane
        const nextPlane = {
            // The name of the plane.
            name: planarAtlas[Dice(100) - 1],
            // Is the gate opening, open, or closing.
            status: gateStatus[Dice(3) - 1],
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

    userConsole.appendChild(course);

    alert(`You rolled ${planes} planes!`)

}
