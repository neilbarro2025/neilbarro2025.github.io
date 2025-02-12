const messages = [
    "No (Are you sure?)",
    "No (Really sure??)",
    "No (Sure sure sure?)",
    "No (Pleaseeeee...)",
    "No (Fatee :( Plsssss)",
    "No (If you say no ulit, iiyak ako...)",
    "No (K then...)",
    "No (Jk lngg, say yes please! ❤️)"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    fetch("https://script.google.com/macros/s/AKfycbznfjxS6xmKGeDq11WVVFL-fuVVTbylbUWTn4EGXASyRcoZmfP82CYtWnPXzI9FOvbJiQ/exec")
    alert("Your response has been recorded! No Take backs na ah. Final na yan.");
    window.location.href = "yes_page.html";
}
