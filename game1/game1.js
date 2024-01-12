
 // Store the images in a 2D array map
 var imgMap = new Array(3);
 var map=new Array(3);
 for (var i = 0; i < imgMap.length; i++) {
     imgMap[i] = new Array(3);
     map[i] = new Array(3);
 }
 
 // Initialize the map with image elements
 var content = document.getElementById('content');
 var images = content.getElementsByTagName('img');
 var rowLength=3;
 var colLength=3;
 for (var row = 0; row < rowLength; row++) {
     for(var col=0;col<colLength;col++){
         imgMap[row][col] = images[row*rowLength+col];
         
         imgMap[row][col].style.marginTop = "31px";
         map[row][col]=0;

     }
 }
 
 var cover = document.getElementById('cover');
 var scoreElement = document.getElementById('current').querySelector(".currentScore");
 var history = document.getElementById("history");
 var clock = document.querySelector(".clock");
 var text = document.getElementById("text");
 var button=document.getElementById("button");
 var ranRow, ranCol;
 var score = 0;
 var time=30;
 var end=false;
 var goodBossSrc="./images/goodBoss.jpg";
 var badBossSrc="./images/badBoss.jpg";
 var officeSrc="./images/office.jpg";
 
 function getMap(){ return map;}
 function getScore(){ return score;}
 
 // Function to make a random mole appear
 function update() {
     ranRow = Math.floor(Math.random() * 3);
     ranCol = Math.floor(Math.random() * 3);
     var moleImg = imgMap[ranRow][ranCol];
 
     var choice= Math.floor(Math.random()*4);
     if(choice==0){
         moleImg.src = goodBossSrc;
         map[ranRow][ranCol]=1;
     }
     else{
         moleImg.src = badBossSrc;
         map[ranRow][ranCol]=2;
     }
     
     
     
     moleImg.style.marginTop = "0px";
     moleImg.onclick = knock;
     setTimeout(reset, Math.random() * 400 + 800);
 }
 
 // Function to handle the mole going back
 function reset() {
     var moleImg = imgMap[ranRow][ranCol];
     moleImg.src = officeSrc;
     map[ranRow][ranCol]=0;
     moleImg.style.marginTop = "31px";
     moleImg.onclick = null;
     if (end==false) {
         setTimeout(update, Math.random() * 400 + 800);
     }
 }
 
 // Function to handle the mole being knocked
 function knock() {
    if(end==false){
        if(map[ranRow][ranCol]==1) score-=2;
        else score+=1;

        this.src = "./images/shang.gif";
        this.onclick = null;
        this.style.marginTop = "3px";
        scoreElement.innerHTML = score;
    }
 
     
 }
 
 // Function to count down the game time
 function countDown(seconds) {
     clock.innerHTML = "剩餘時間：" + ((seconds < 10) ? "0" : "") + seconds + "秒";
     if (seconds > 0) {
         setTimeout(function() { countDown(seconds - 1); }, 1000);
     } 
     else {
        end=true;
        cover.style.display = "block";
        text.innerHTML = "當前成績為：" + (score === undefined ? 0 : score) + "分<br/>遊戲結束！";
        gameScores.level1 = score;
        
        button.style.display="block";
        button.innerHTML = '回首頁';
        button.className="btn btn-primary";
        button.onclick=function() {
            window.location.href = '../game.html';
        }
     }
 }

 button.onclick=function() {
    button.style.display="none";
    update();
    // Start the game
    countDown(time);
    button.removeEventListener('click');
}
