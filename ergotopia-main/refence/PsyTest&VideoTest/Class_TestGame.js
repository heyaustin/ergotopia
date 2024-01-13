
import { PsyTest, VideoTest } from './Class_Test.js';
/*
TestGame:
    [Attributes]:
        testSize: 題目數量 int
        TestBank: 題目陣列 Test(PsyTest, VideoTest)[testSize]
        userAnswers: 用戶回答 int[testSize] 原始值為全部 -1

    [Function]:
        int getScore(): 回傳總分
        Test getTest(): 回傳題目
        void updateAnswer(index, choices): 更新用戶的回答
        boolean allQuestionAnswered(): 檢查是否所有問題都被答過
        void calculateScore(): ... 根據 class不同實作
        void showResult(): ... 根據 class不同實作
        void runTest(): 大部分的遊戲邏輯

Child class: PsyTestGame, VideoTestGame
*/


class TestGame{
    constructor(testSize, testBank){
        this.currentIndex = 0;
        this.testSize = testSize;
        this.testBank = testBank;
        this.userAnswers = new Array(testSize).fill(-1);
    }

    getScore(){
        return this.score;
    }

    getTest(index){ // this is altered
        return this.testBank[index];
    }

    updateAnswer(index, choices){
        this.userAnswers[index] = choices;
    }

    allQuestionAnswered(){
        return this.userAnswers.every(answer => answer !== -1);
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
        let retString = "";
        if (this.score[0] === maxScore){
            retString += "A 選項：創新型或領導型職業（如企業家、項目經理、創意總監）\n";
        }

        if (this.score[1] === maxScore){
            retString +="B 選項：分析型或專業型職業（如工程師、會計師、科學家）\n" ;
        }

        if (this.score[2] === maxScore){
            retString +="C 選項：支持型或行政型職業（如行政助理、客服、教育工作者）\n";
        }

        if (this.score[3] === maxScore){
            retString +="D 選項：互動型或團隊型職業（如銷售、市場營銷、人力資源）\n";
        }
        return retString;
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
            const tmp = this.getTest(i);
            console.log(...[tmp.answer, userAnswerIndex]);
            if (tmp.checkAnswer(userAnswerIndex)) {
                this.score++;
            }
        }
    }

    showResult(){
        let retString = "";
        retString += `你的分數是 ${this.score}\n`;
        if (this.score >= 5){
            retString += "過關message!!!!!";
        } else {
            retString += "沒有過關的message....." ;
        }
        return retString;
    }
}

export { PsyTestGame, VideoTestGame, TestGame };  // Export your classes
