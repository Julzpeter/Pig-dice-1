function Player(name,winscore){
	this.name=name;
	this.totalScore=0;
	this.sessionScore=0;
	this.winscore=winscore;
}

// roll method
Player.prototype.roll= function(){

	var rolledDice=Math.floor(Math.random()*6+1);
	if(rolledDice>1){
		this.sessionScore+=rolledDice;
		if((this.sessionScore+this.totalScore)>=this.winscore){
            // declare user as winner
			return 0;
		}
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


var startGame = function(playerOneName,playerTwoName,winScore){
    var playerOne = new Player(playerOneName,winScore);
    var playerTwo = new Player(playerTwoName,winscore); 
    $(".player-registration").hide();
    $(".game-play").show();

}

$("#form_players").submit(
    function(event){
        event.preventDefault();
        var playerOneName = $("#player_one_name").val();
        var playerTwoName = $("#player_two_name").val();
        var winScore = $("#winscore").val();
        return startGame(playerOneName,playerTwoName,winScore);
    }
)

$(document).ready(
    function(){
        $(".game-play").hide();
    }
)