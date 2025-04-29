const hearts = ["♡", "♡ ♡", "♡ ♡ ♡", "♡ ♡ ♡ ♡", "♡ ♡ ♡ ♡ ♡"];
const questions = [
    "Do you really love me?",
    "Are you sure you love me?",
    "Would you stay with me forever?",
    "Will you be mine always?",
    "Would you fight for me?",
    "Will you promise to never leave?",
    "Will you think of me every day?",
    "Will you miss me when apart?",
    "Will you marry me someday?",
    "Am I the only one you love?"
];

let questionIndex = 0;
let questionContainer = document.getElementById('question-container');
let messageContainer = document.getElementById('message-container');
let questionText = document.getElementById('question-text');

window.onload = () => {
    setTimeout(() => {
        document.querySelector(".floating-text").style.display = 'none';
        document.getElementById("loading-container").style.display = 'block';
        
        let heartIndex = 0;
        let heartInterval = setInterval(() => {
            document.getElementById("heart-loading").innerText = hearts[heartIndex];
            document.getElementById("hearts-container").innerHTML = hearts[heartIndex];
            document.getElementById("hearts-container").style.animation = "heartPulse 1.5s infinite";
            
            heartIndex++;
            if (heartIndex >= hearts.length) {
                clearInterval(heartInterval);
                setTimeout(() => {
                    document.getElementById("loading-container").style.display = 'none';
                    questionContainer.style.display = 'block';
                    document.getElementById("question-sound").play();
                }, 500);
            }
        }, 500);
    }, 1000);
};

function answer(response) {
    if (response === 'yes') {
        if (questionIndex >= questions.length) {
            // Last question answered, show the personalized message
            messageContainer.style.display = "none";
            setTimeout(() => {
                messageContainer.style.display = "block";
                typeMessage("I love you so much, my dear! Forever and always. 💖", () => {
                    // After message is typed, you can do anything here (e.g., show a romantic image, etc.)
                    questionContainer.style.display = "none"; // Hide the question container
                    setTimeout(() => {
                        // Optionally, you can display a final romantic animation or message
                        alert("I can't wait to see you! 😘"); // Example final alert
                    }, 2000); // Delay before showing alert or any other action
                });
            }, 1000); // Delay before showing the romantic message
        } else {
            // Proceed with the normal flow for non-last questions
            messageContainer.style.display = "none";
            setTimeout(() => {
                messageContainer.style.display = "block";
                typeMessage("Be patient... to continue kiss your gf", () => {
                    // Clear the message after it's done typing
                    setTimeout(() => {
                        messageContainer.innerHTML = ''; // Remove the message
                        questionContainer.style.display = "block"; // Show the question container
                        showNextQuestion(); // Move to the next question
                    }, 3000); // Delay before clearing the message
                });
            }, 3000); // Adjust the initial delay time as needed
        }
    } else if (response === 'no') {
        questionContainer.style.display = "none";
        messageContainer.style.display = "block";
        messageContainer.innerHTML = `<div id="crying-emoji" class="shake-crying">😭</div>`;  // Add shaking class

        setTimeout(() => {
            messageContainer.innerHTML = '';
            typeMessage(
                "You don't love me? You can't leave me. Better choose again! Choose Yes this time...",
                () => {
                    setTimeout(() => {
                        messageContainer.style.display = "none";
                        questionContainer.style.display = "block";
                        questionContainer.style.transform = "scale(1)";
                        questionIndex = 0;
                        document.querySelector('.options').style.display = "block";
                        questionText.innerText = "Choose again?";
                    }, 2000);
                }
            );
        }, 2000);
    }
}

function answerSecond(response) {
    if (response === 'yes') {
        showNextQuestion();
    } else {
        answer('no');
    }
}

function typeMessage(message, callback) {
    let i = 0;
    messageContainer.innerHTML = "";
    messageContainer.style.display = 'block';

    function typing() {
        if (i < message.length) {
            let span = document.createElement('span');
            span.textContent = message.charAt(i);
            span.style.color = randomColor();
            messageContainer.appendChild(span);
            i++;
            setTimeout(typing, 100);
        } else {
            callback();
        }
    }
    typing();
}

function randomColor() {
    const colors = ['#FF4081', '#FFC107', '#4CAF50', '#00BCD4', '#9C27B0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showNextQuestion() {
    if (questionIndex < questions.length) {
        questionContainer.style.display = 'block';
        questionText.innerText = questions[questionIndex];
        document.querySelector('.options').innerHTML = `
            <button class="button" onclick="nextYes()">Yes</button>
            <button class="button" onclick="answerSecond('no')">No</button>
        `;
        questionContainer.style.transform = `scale(${1 + questionIndex * 0.05})`;
        questionIndex++;
    } else {
        // Romantic play after the 10th question with a 1-second delay
        setTimeout(() => {
            answer('yes');  // Triggers personalized message
        }, 1000); // 1 second delay before showing romantic message
    }
}

function nextYes() {
    showNextQuestion();
}
