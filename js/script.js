function Player(){
	this.name="";
	this.totalScore=0;
	this.sessionScore=0;
}

// roll method
Player.prototype.roll= function(){

	var rolledDice=Math.floor(Math.random()*6+1);
	if(rolledDice>1){
		this.sessionScore+=rolledDice;
	}
	else{
		this.sessionScore=0;
	}
	return rolledDice;
}

// hold method
Player.prototype.hold=function(){
	this.totalScore+=this.sessionScore;
	this.sessionScore=0;
	return this.totalScore;
}

var playerOne = new Player();
var playerTwo = new Player(); 
var winScore=0;

var startGame = function(playerOneName,playerTwoName){
    playerOne.name=playerOneName;
    playerTwo.name=playerTwoName;
    $(".player-registration").hide();
    $(".player1name").text(playerOne.name);
    $(".player2name").text(playerTwo.name);
    $(".game-play").show();
    return 0;

}

var winGame = function(player){
    $(".game-play").prepend(
        `
        <div class="container">
            <div class="wingame alert alert-success alert-dismissible">
                <a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <h3>`+player.name+` won the game with a score of `+player.totalScore+`</h3>
            </div>
        </div>
        `
    );
    $("#panel-player1").addClass("panel-disable");
    $("#p1-roll-button").addClass("button-disable");
    $("#p1-hold-button").addClass("button-disable");
    $("#panel-player2").addClass("panel-disable");
    $("#p2-roll-button").addClass("button-disable");
    $("#p2-hold-button").addClass("button-disable");
    $(".game-play").append(
        `
        <div class="container">
            <button class="btn btn-primary" onclick="restartGame()">Restart Game</button>
        </div>
        `
    );
    return 0;
}

var restartGame = function(){
    $(".player-registration").show();
    $(".game-play").hide();
    playerOne= new Player();
    playerTwo = new Player();
    return 0;
}


$("#p1-roll-button").click(
    function(event){
        var rolledDice=playerOne.roll();
        $(".p1-rolled").text("You rolled:"+rolledDice);
        $(".p1-session-score").text("Your session score:"+playerOne.sessionScore);
        if(rolledDice===1){
            return $("#p1-hold-button").trigger("click");
        }
        if((playerOne.sessionScore+playerOne.totalScore) >= winScore){
            playerOne.totalScore=playerOne.sessionScore+playerOne.totalScore;
            return winGame(playerOne);
        }
        return 0;
    }
)

$("#p2-roll-button").click(
    function(event){
        var rolledDice=playerTwo.roll();
        $(".p2-rolled").text("You rolled:"+rolledDice);
        $(".p2-session-score").text("Your session score:"+playerTwo.sessionScore);
        if(rolledDice===1){ 
            return $("#p2-hold-button").trigger("click");
        }
        if((playerTwo.sessionScore+playerTwo.totalScore) >= winScore){
            playerTwo.totalScore=playerTwo.sessionScore+playerTwo.totalScore;
            return winGame(playerTwo);
        }
        return 0;
    }
)

$("#p1-hold-button").click(
    function(event){
        playerOne.hold();
        $("#panel-player1").addClass("panel-disable");
        $("#p1-roll-button").addClass("button-disable");
        $("#p1-hold-button").addClass("button-disable");
        $("#panel-player2").removeClass("panel-disable")
        $("#p2-roll-button").removeClass("button-disable");
        $("#p2-hold-button").removeClass("button-disable");
        $(".p1-score").text("Your score is: "+playerOne.totalScore);
        return 0;
    }
)

$("#p2-hold-button").click(
    function(event){
        playerTwo.hold();
        $("#panel-player2").addClass("panel-disable");
        $("#p2-roll-button").addClass("button-disable");
        $("#p2-hold-button").addClass("button-disable");
        $("#panel-player1").removeClass("panel-disable")
        $("#p1-roll-button").removeClass("button-disable");
        $("#p1-hold-button").removeClass("button-disable");
        $(".p2-score").text("Your score is: "+playerTwo.totalScore);
        return 0;
    }
)

$("#form_players").submit(
    function(event){
        event.preventDefault();
        var playerOneName = $("#player_one_name").val();
        var playerTwoName = $("#player_two_name").val();
        winScore = $("#winscore").val();
        return startGame(playerOneName,playerTwoName);
    }
)

$(document).ready(
    function(){
        $(".game-play").hide();
    }
)