
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = new Array(10).fill(null);

function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            displayQuestion(0); // 显示第一个问题
        })
        .catch(error => console.error('Error loading questions:', error));
}

function displayVideo() {
    /*處理影片 如果成功轉移問題後呼叫*/
    const question = questions[currentQuestionIndex];
    const videoLink = question.videoLink;
    const currentVideoLink = videoBox.querySelector('iframe');

    if (currentVideoLink && currentVideoLink.src.includes(videoLink)) {
        return; // 如果 VideoLink 一樣就不用 改變影片 這樣可以保留影片的撥放進度
    } else {
        videoBox.innerHTML = '';
        videoBox.innerHTML = `
            <iframe
                width= 80%;
                height= 80%;
                src="${videoLink}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer;
                autoplay; clipboard-write;
                encrypted-media; gyroscope;
                picture-in-picture;
                web-share" allowfullscreen>
            </iframe>
        `;
    }
}


function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    currentQuestionIndex = index;
    const question = questions[index];
    const messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = `
        <div class="question">題目 ${question.id}: ${question.description}</div>
            <ul class="options">
                ${question.options.map((option, i) => `
                    <li>
                        <input type="radio" name="options" id="option${i}" ${userAnswers[currentQuestionIndex] === i ? 'checked' : ''}>
                        <label for="option${i}">${option}</label>
                    </li>
                `).join('')}
            </ul>
    `;
    displayVideo();
}

function changeQuestion(direction) {
    saveAnswer();
    const newIndex = currentQuestionIndex + direction;
    if (newIndex < questions.length && newIndex >= 0) {
        displayQuestion(newIndex);
    } else if (newIndex >= questions.length) {
        calculateScore();
    }
}

function saveAnswer() { /* input[type="checkbox"] */
    const options = document.querySelectorAll('.options input[type="checkbox"]');
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            userAnswers[currentQuestionIndex] = i;
            console.log(i);
            break;
        }
    }
}

function calculateScore() {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && questions[index].correctAnswer == answer) {
            score++;
        }
    });
    gameScores.level2 = score;
    alert(`您答對了 ${score} 題`);
    window.location.href = '../index.html';
}

window.onload = loadQuestions;