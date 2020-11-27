var PLAY = 0;
var END = 1;
var gameState = PLAY;
var s,sI,b,bI;
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var go,gO;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bI=loadImage("j2.jpg");
  gO=loadImage("01.png");
}

function setup(){
 createCanvas(500,300);
  
   b=createSprite(300,150,10,10);
  b.addImage(bI);
   
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  ground = createSprite(300,280,900,10);
  
 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  go=createSprite(250,150,10,10);
  go.addImage(gO);
  go.visible=false;
  go.scale=1;

}

function draw(){
  background(255);
  fill("yellow")
  text("Score: "+score, 400, 20);
  text("Food Collected: "+bananaScore,250,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
    b.velocityX=-4;
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (b.x < 150){
      b.x = b.width/2;
    }

    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    b.velocityX=0;
    monkey.y = 235;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    go.visible=true;
  
  
    
    if (keyDown("r")){
      go.visible=false;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
     monkey.changeAnimation("monkey",monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }

  drawSprites(); 
  
  monkey.collide(ground);
  
  fill("yellow")
  text("Score: "+score, 400, 20);
  text("Food Collected: "+bananaScore,250,20);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
    
  }  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.11;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  } 
}