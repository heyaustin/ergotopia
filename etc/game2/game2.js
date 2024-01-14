
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

function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    currentQuestionIndex = index;
    const question = questions[index];
    const messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = `
        <div class="question">题目 ${question.id}: ${question.description}</div>
        <ul class="options">
            ${question.options.map((option, i) => `
                <li>
                    <input type="checkbox" id="option${i}" name="option${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                    <label for="option${i}">${option}</label>
                </li>
            `).join('')} + '\n'
        </ul>
        <div class="button button-left" onclick="changeQuestion(-1)">上一题</div>
        <div class="button button-right" onclick="changeQuestion(1)">下一题</div>
    `;
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

function saveAnswer() {
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
    alert(`您答对了 ${score} 题`);
    window.location.href = '../index.html';
}

window.onload = loadQuestions;