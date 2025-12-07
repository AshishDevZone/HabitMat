// Activities
let activities = ['water', 'study', 'reading', 'exercise'];

// Initialize storage
activities.forEach(act => {
    if (!localStorage.getItem(act + 'Goal')) localStorage.setItem(act + 'Goal', 0);
    if (!localStorage.getItem(act + 'Progress')) localStorage.setItem(act + 'Progress', 0);
});

// Update status & AI suggestions
function updateStatus(activity, elementId) {
    let goal = parseFloat(localStorage.getItem(activity + 'Goal'));
    let progress = parseFloat(localStorage.getItem(activity + 'Progress'));
    let remaining = (goal - progress).toFixed(1);

    let text = remaining > 0
        ? `✅ Completed: ${progress}/${goal}. Remaining: ${remaining}. Keep it going!`
        : `🎉 Congratulations! You completed your ${activity} goal!`;

    document.getElementById(elementId).innerText = text;
}

// Set goal
function setGoal(activity, inputId, statusId) {
    let goal = document.getElementById(inputId).value;
    if (goal <= 0 || goal === '') { alert('Please enter valid goal'); return; }
    localStorage.setItem(activity + 'Goal', goal);
    localStorage.setItem(activity + 'Progress', 0);
    alert(`${activity.charAt(0).toUpperCase() + activity.slice(1)} goal set!`);
    updateStatus(activity, statusId);
}

// Update progress
function updateProgress(activity, amount, statusId) {
    let progress = parseFloat(localStorage.getItem(activity + 'Progress'));
    let goal = parseFloat(localStorage.getItem(activity + 'Goal'));
    progress += amount;
    if (progress > goal) progress = goal;
    localStorage.setItem(activity + 'Progress', progress);
    updateStatus(activity, statusId);
    checkReminder(activity);
}

// Simple reminders
function checkReminder(activity) {
    let goal = parseFloat(localStorage.getItem(activity + 'Goal'));
    let progress = parseFloat(localStorage.getItem(activity + 'Progress'));
    let remaining = goal - progress;

    if (activity === 'water' && remaining > 0 && remaining % 2 === 0) alert('💧 Drink some water now!');
    if (activity === 'study' && remaining > 0 && remaining === goal / 2) alert('📚 Keep studying! Halfway there!');
}

// Periodic water reminder every 2 hours
setInterval(() => {
    let remaining = localStorage.getItem('waterGoal') - localStorage.getItem('waterProgress');
    if (remaining > 0) alert('💧 Reminder: Time to drink water!');
}, 2 * 60 * 60 * 1000);
