document.getElementById('generate-button').addEventListener('click', generateGroups);

function generateGroups() {
    const groupCount = parseInt(document.getElementById('group-count').value);
    const participantsText = document.getElementById('participants').value;
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = ''; // Clear previous results

    // Clean and normalize the list of participants
    let participants = participantsText.split(',')
        .map(name => name.trim())
        .filter(name => name !== '');

    if (participants.length === 0 || groupCount <= 0) {
        resultsSection.innerHTML = '<p style="color: red;">Please enter at least one participant and a valid number of groups.</p>';
        return;
    }

    if (groupCount > participants.length) {
        resultsSection.innerHTML = `<p style="color: orange;">Warning: The number of groups (${groupCount}) is greater than the number of participants (${participants.length}). One group will be created per participant.</p>`;
    }

    // Shuffle the participants randomly
    shuffleArray(participants);

    // Create arrays for the groups
    const groups = Array.from({ length: groupCount }, () => []);

    // Distribute participants into groups
    participants.forEach((participant, index) => {
        const groupIndex = index % groupCount;
        groups[groupIndex].push(participant);
    });

    // Display the groups on the page
    groups.forEach((group, index) => {
        if (group.length > 0) {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('group-div');
            groupDiv.innerHTML = `<h3 class="group-title">Group ${index + 1}</h3>`;
            const ul = document.createElement('ul');
            ul.classList.add('group-list');
            group.forEach(person => {
                const li = document.createElement('li');
                li.textContent = person;
                ul.appendChild(li);
            });
            groupDiv.appendChild(ul);
            resultsSection.appendChild(groupDiv);
        }
    });
}

// Fisher-Yates shuffle algorithm for an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
