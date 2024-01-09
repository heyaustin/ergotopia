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

    checkAnswer(userAnswer) {
        return userAnswer === this.answer;
    }
}

export { PsyTest, VideoTest };  // Export your classes
