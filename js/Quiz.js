class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()
    //write code to change the background color here
    background("yellow")


    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()
    //write code to show a heading for showing the result of Quiz
    if(allContestants !== undefined){
      var ANSPOS = 270
      for(var plr in allContestants){
        var correctans = "2"
        if(correctans === allContestants[plr].answer){
          fill("green")
          
        }
        else{
          fill ("red")
        }
        ANSPOS += 30
        textSize (20)
        text (allContestants[plr].name + ":" + allContestants[plr].answer,400,ANSPOS )
      }
    }

    
    
  }

}
