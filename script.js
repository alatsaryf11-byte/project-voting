// ================================
// MOUNTAIN VOTES
// ================================

let votes = {
    merapi: 0,
    bromo: 0,
    rinjani: 0,
    semeru: 0
};


// ================================
// GET HTML ELEMENTS
// ================================

const totalVotesText =
    document.querySelector("#totalVotes");

const winnerText =
    document.querySelector("#winner");

const feedback =
    document.querySelector("#feedback");

const resetButton =
    document.querySelector("#resetButton");

const voteButtons =
    document.querySelectorAll(".vote-button");


// ================================
// MOUNTAIN NAMES
// ================================

const mountainNames = {
    merapi: "Mount Merapi",
    bromo: "Mount Bromo",
    rinjani: "Mount Rinjani",
    semeru: "Mount Semeru"
};


// ================================
// VOTE BUTTON EVENT
// ================================

voteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const mountain =
            button.dataset.mountain;

        // Add one vote
        votes[mountain]++;

        // Show feedback
        feedback.textContent =
            "🎉 You voted for " +
            mountainNames[mountain] +
            "!";

        // Update result
        updateResults();

    });

});


// ================================
// UPDATE RESULTS
// ================================

function updateResults() {

    // Calculate total votes

    const total =
        votes.merapi +
        votes.bromo +
        votes.rinjani +
        votes.semeru;


    // Show total votes

    totalVotesText.textContent = total;


    // Update each mountain

    updateMountain("merapi", total);
    updateMountain("bromo", total);
    updateMountain("rinjani", total);
    updateMountain("semeru", total);


    // Find winner

    updateWinner();
}


// ================================
// UPDATE MOUNTAIN
// ================================

function updateMountain(mountain, total) {

    const voteText =
        document.querySelector(
            "#" + mountain + "Votes"
        );

    const progress =
        document.querySelector(
            "#" + mountain + "Progress"
        );

    const percentageText =
        document.querySelector(
            "#" + mountain + "Percentage"
        );


    // Show vote number

    voteText.textContent =
        votes[mountain];


    // Calculate percentage

    let percentage = 0;

    if (total > 0) {

        percentage =
            (votes[mountain] / total) * 100;

    }


    // Show percentage

    percentageText.textContent =
        Math.round(percentage) + "%";


    // Update progress bar

    progress.style.width =
        percentage + "%";
}


// ================================
// FIND CURRENT WINNER
// ================================

function updateWinner() {

    let winner = null;

    let highestVotes = 0;


    for (const mountain in votes) {

        if (votes[mountain] > highestVotes) {

            highestVotes =
                votes[mountain];

            winner = mountain;
        }
    }


    if (winner === null) {

        winnerText.textContent = "-";

    } else {

        winnerText.textContent =
            mountainNames[winner];

    }
}


// ================================
// RESET VOTING
// ================================

resetButton.addEventListener(
    "click",
    function() {

        // Reset all votes

        votes.merapi = 0;
        votes.bromo = 0;
        votes.rinjani = 0;
        votes.semeru = 0;


        // Show feedback

        feedback.textContent =
            "🔄 Voting has been reset!";


        // Update result

        updateResults();

    }
);


// ================================
// INITIAL RESULT
// ================================

updateResults();