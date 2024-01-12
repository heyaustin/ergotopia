
// startTime;
// endTime;

let score = 10;
let cur_map;

var mole = document.querySelectorAll(".mole > button");

interval = window.setInterval(function() {
    map = getMap();
    for (var i=0; i<mole.length; i++) {
        mole[i].innerHTML = map[Math.floor(i/3)][i%3].toString();
        mole[i].id = i.toString();
    };
}, 1000);

window.setTimeout(function() {
    clearInterval(interval);
    alert("Timeout. Score: " + getScore().toString());
}, 1000*60);


for (var i=0; i<mole.length; i++) {
    mole[i].addEventListener("click", function(e) {
        let id = e.target.id;
        knock(Math.floor(id/3), id%3);
    })
};

function getScore(){
    return score;
}

function getMap(){
    let map = [
        [rand(3), rand(3), rand(3)],
        [rand(3), rand(3), rand(3)],
        [rand(3), rand(3), rand(3)]
    ];
    cur_map = map;
    return map;
}

function knock(y, x){
    if(cur_map[y][x]==2) score += 1;//bad
    if(cur_map[y][x]==1) score -= 2;//good
    if(score <= 5){
        clearInterval(interval);
        alert("You lose (score<=5). Score: " + getScore().toString());
    }
    console.log(score);

    return score;
}

function rand(max) {
    return Math.floor(Math.random() * max);
}
  