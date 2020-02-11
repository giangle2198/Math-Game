var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    //if we are playing
    if (playing == true) {
        location.reload();//reload page
    } else {//if we are not playing
        
        playing = true;
        
        //set score to 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        
        show("timeremaining");
        
        timeremaining = 60;
        
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide game over box
        hidden("gameOver");
        
        //change button to reset
        
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown
        
        startCountdown();
        
        //generate a new Q&A
        generateQvsA();
    }
    
};    

        
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                //correct answer
                //increase score by 1
                score ++;
                
                document.getElementById("scorevalue").innerHTML = score;
                //hide wrong box and show 
                hidden("wrong");
                show("correct");
                setTimeout(function(){
                    hidden("correct");
                },1000)
                generateQvsA();
            }else{
                hidden("correct");
                show("wrong");
                setTimeout(function(){
                    hidden("wrong");
                },1000)
            }
        }
    }
}

//we we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1 sec

//start Counter
function startCountdown() {
    action = setInterval(function(){
        timeremaining -= 1;
        
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        if(timeremaining == 0){
            //game over
            stopCountdown();
            
            show("gameOver");
            
            document.getElementById("gameOver").innerHTML = "<p>Game over</p><p>Your score is " + score +".</p>";
            hidden("timeremaining");
            hidden("correct");
            hidden("wrong");
            playing = false;
            
            document.getElementById("startreset").innerHTML = "Start Game";
        }
        
    }, 1000)
}
        
//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide an element
function hidden(Id){
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers
function generateQvsA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random()); 
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    boxCorrectAnswer = 1+Math.round(3*Math.random());
    
    document.getElementById("box"+boxCorrectAnswer).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    
    for(i=1;i<5;i++){
        if(i != boxCorrectAnswer){
            var wrongAnswer;
            
            do{
                wrongAnswer = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(wrongAnswer == correctAnswer);
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}