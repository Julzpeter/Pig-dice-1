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


$(document).ready(
    function(){
        $(".game-play").hide();
    }
)