import { PsyTest, VideoTest } from './Class_Test.js';
import { PsyTestGame, VideoTestGame } from './Class_TestGame.js';

function displayQuestion(game) {
    const test = game.getTest(game.currentIndex);
    const testQuestion = test.getQuestion();
    const testChoices = test.getChoices().join('\n'); // Convert array to string

    document.getElementById('test-question').innerText = testQuestion;
    document.getElementById('test-choices').innerText = testChoices;

}

function submitAnswer(game, chosenAnswer) {
    // Check if the answer is valid (you may need additional validation logic)
    if (chosenAnswer !== null && chosenAnswer !== undefined) {
        game.updateAnswer(game.currentIndex, chosenAnswer);
        nextQuestion(game);
    } else {
        alert("Please select an answer before submitting.");
    }
    game.calculateScore();
    console.log(game.score);
}


function exitGame(game) {
    if (game.allQuestionAnswered()) {
        game.calculateScore();
        const resText = game.showResult();
        document.getElementById('show-result').innerText = resText;
    } else {
        const msg = "！！！！！還有沒有回答的問題！！！！！";
        document.getElementById('show-result').innerText = msg;
    }
}

function nextQuestion(game) {
    if (game.currentIndex < game.testSize - 1) {
        game.currentIndex++;
        displayQuestion(game);
    } else {
        const msg = "You've reached the last question.";
        document.getElementById('show-result').innerText = msg;
    }
}

function previousQuestion(game) {
    if (game.currentIndex > 0) {
        game.currentIndex--;
        displayQuestion(game);
    } else {
        const msg = "You've reached the first question.";
        document.getElementById('show-result').innerText = msg;
    }
}


function playGame(game) {
    game.currentIndex = 0;
    displayQuestion(game);

}

export {playGame, previousQuestion, nextQuestion, exitGame, submitAnswer, displayQuestion};