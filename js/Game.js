class Game {
  constructor(){

  }

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,200,50,50);
    runner2 = createSprite(300,200,50,50);
    runner3 = createSprite(500,200,50,50);
    runner4 = createSprite(700,200,50,50);
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
   
      image(track, 0,-displayHeight,displayWidth*5, displayHeight/10);
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x;
      var y = 150 ;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in y direction
        y = y + 100;
        //use data form the database to display the runners in x direction
        x = displayWidth - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;
        
       

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = runners[index-1].x;
        }
      
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance-=10
      player.update();
    }
     if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance+=10
      player.update();
    }
     if(keyIsDown(UP_ARROW && player.index !== null) ){
        player.y=player.y-70
      }
   
    if(player.distance > 5860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
