// VScode terminal prompt 設置 要求有 prompt-sync
const ps = require("prompt-sync");
const prompt = ps();

class Test {
    constructor(question, choices) {
        this.question = question;
        this.choices = choices;
    }

    getQuestion(){
        return this.question;
    }

    getChoices(){
        return this.choices;
    }

    display() {
        console.log(this.question);
        this.choices.forEach((choice, index) => {
        console.log(choice);
        });
    }

}

class PsyTest extends Test {
    constructor(question, choices){
        super(question, choices);
    }
}

class VideoTest extends Test {
    constructor(question, choices, answer, reasoning, video){
        super(question, choices);
        this.answer = answer;
        this.reasoning = reasoning;
        this.video = video;
    }

    getReasoning() {
        return this.reasoning;
    }

    getVideo(){
        return this.video;
    }

    checkAnswer(userAnswerIndex) {
        return userAnswerIndex === this.answer;
    }
}

module.exports ={
    PsyTest: PsyTest,
    VideoTest: VideoTest
};