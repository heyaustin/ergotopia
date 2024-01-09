// VScode terminal prompt 設置 要求有 prompt-sync
const ps = require("prompt-sync");
const prompt = ps();
// refer to Test Object under same file .js
const {PstTest, VideoTest } = require('./Class_Test');
/*
TestGame:
    [Attributes]:
        testSize: 題目數量 int
        TestBank: 題目陣列 Test(PsyTest, VideoTest)[testSize]
        userAnswers: 用戶回答 int[testSize] 原始值為全部 -1

    [Function]:
        int getScore(): 回傳總分
        Test getQuestion(): 回傳題目
        void updateAnswer(index, choices): 更新用戶的回答
        boolean allQuestionAnswered(): 檢查是否所有問題都被答過
        void calculateScore(): ... 根據 class不同實作
        void showResult(): ... 根據 class不同實作
        void runTest(): 大部分的遊戲邏輯

Child class: PsyTestGame, VideoTestGame
*/


class TestGame{
    constructor(testSize, testBank){
        this.testSize = testSize;
        this.testBank = testBank;
        this.userAnswers = new Array(testSize).fill(-1);
    }

    getScore(){
        return this.score;
    }

    getQuestion(index){
        return this.testBank[index];
    }

    updateAnswer(index, choices){
        this.userAnswers[index] = choices;
    }

    allQuestionAnswered(){
        return this.userAnswers.every(answer => answer !== -1);
    }

    runTest(){
        while (true){
            let tmp = prompt(`你想要回答第幾題 或是exit 離開(請輸入從 0 到 ${this.testSize -1}): `);

            if (tmp.toLowerCase() === "exit"){
                if (this.allQuestionAnswered()){
                    this.calculateScore();
                    this.showResult();
                    return;
                    } else {
                    console.log("還有沒有回答的問題!!!!!");
                    continue;
                }

            } else if (isNaN(tmp) || tmp < 0 || tmp >= this.testSize) {
                console.log("錯誤的輸入!");
                continue;
            }

            let testIndex = parseInt(tmp);
            this.getQuestion(testIndex).display();

            tmp = prompt("回答選項0, 1, 2, 3:");
            if (isNaN(tmp) || tmp < 0 || tmp > 3) {
                console.log("錯誤的輸入!");
            } else {
                let userReply = parseInt(tmp);
                this.updateAnswer(testIndex, userReply);
            }

        }
    }

    calculateScore() {
        // different depends on the subclasses
    }
    showResult() {
        // different depends on the subclasses
    }
}

class PsyTestGame extends TestGame{
    constructor(testSize, testBank){
        super(testSize, testBank);
        this.score = [0, 0, 0, 0];
    }

    calculateScore(){
        this.score = [0, 0, 0, 0]; // Reset in case
        for (let i = 0; i < this.testSize; i++) {
        const userAnswer = this.userAnswers[i];
        this.score[userAnswer]++;
        }
    }

    showResult(){
        const maxScore = Math.max(...this.score);
        console.log(`這是你的分數 A: ${this.score[0]} B: ${this.score[1]} C: ${this.score[2]} D: ${this.score[3]}`);
        if (this.score[0] === maxScore){
            console.log("A 選項：創新型或領導型職業（如企業家、項目經理、創意總監）");
        }

        if (this.score[1] === maxScore){
            console.log("B 選項：分析型或專業型職業（如工程師、會計師、科學家）");
        }

        if (this.score[2] === maxScore){
            console.log("C 選項：支持型或行政型職業（如行政助理、客服、教育工作者）");
        }

        if (this.score[3] === maxScore){
            console.log("D 選項：互動型或團隊型職業（如銷售、市場營銷、人力資源）");
        }
    }
}

class VideoTestGame extends TestGame{
    constructor(testSize, testBank){
        super(testSize, testBank);
        this.score = 0;
    }

    calculateScore(){
        this.score = 0; // Reset the score
        for (let i = 0; i < this.testSize; i++) {
        const userAnswerIndex = this.userAnswers[i];
        if (this.testBank[i].checkAnswer(userAnswerIndex)) {
            this.score++;
        }
        }
    }
    showResult(){
        console.log(`你的分數是 ${this.score}`);
        if (this.score >= 5){
            console.log("過關message!!!!!");
        } else {
            console.log("沒有過關的message.....");
        }
    }
}

module.exports ={
    PsyTest: PsyTestGame,
    VideoTest: VideoTestGame
};
