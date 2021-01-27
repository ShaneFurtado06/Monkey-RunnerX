//Monkey Game

var Monkey, MonkeyA, monkey, Monkey_collided;
var back, back1I, back2I;
var ig, og;
var bar, barsI, barG;
var banana, bananaI, bananaG;

var PLAY=1;
var END=0;
var BPLAY=2;
var gameState=BPLAY;

var score=0;
var strength=0;

function preload(){
 MonkeyA=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  back1I=loadImage("back.png");
  
  obsI=loadImage("stone.png");
  
  Monkey_collide=loadImage("Monkey_04.png");
  
  barsI=loadImage("bars.png");
  
  bananaI=loadImage("banana.png");
}

function setup(){
  createCanvas(670,300);
  
  obsG= new Group();
  barG= new Group();
  bananaG= new Group();
  
  back=createSprite(0,150,20,20);
  back.scale=0.13;  
  back.addImage("background_1st_image", back1I);
  back.velocityX=-11;
  back.visible=false;
  
  ig=createSprite(10,278,2000,3);
  ig.shapecolor="black";
  ig.visible=false;
  
  og=createSprite(0,0,10,1000);
  og.visible=false;
  
  Monkey=createSprite(70,220,20,20);
  Monkey.scale=0.16;
  Monkey.addAnimation("running_monkey", MonkeyA);
  Monkey.visible=false;
  
}

function draw(){
  background("black");
  
  if(gameState === BPLAY){
    fill("white");
    text("PRESS 'SPACE' TO START.",252,210-150);
    text("PRESS 'SPACE' TO JUMP.",254,230-150);
    text("YOU CAN CLIMB OVER THE BARS.",230,250-150);
    text("BUT DON'T HIT THE BARS OR YOU'LL LOSE.",210,270-150);
    
    text("IF YOU HIT A BAR AND THE GAME IS OVER, PRESS 'CTRL+R' TO START AGAIN.",130,250-50);
    text("IF YOU HIT A STONE AND THE GAME IS OVER, PRESS 'SPACE' TO START AGAIN.",130,270-50);
    
    
    if(keyDown("space")){gameState=PLAY}
  }
  
  
  if (gameState === PLAY){
    back.visible=true;
    Monkey.visible=true;

    if(bananaG.isTouching(Monkey)){
      strength=strength+1;
      bananaG.destroyEach();
    }
  
    
    back.velocityX=-11;
    obsG.velocityX=back.velocityX;
    
    if(frameCount%10===0){
      score=score+1;
    }    
    
    //control monkey
    if(keyDown("space")&&Monkey.y>=6){Monkey.y=Monkey.y-26}

    //move background
    if(back.x<230){back.x=back.width/2}

    //monkey gravity
    Monkey.velocityY=Monkey.velocityY+1.8;
    Monkey.collide(ig);
    Monkey.collide(barG);
        
    //Monkey out
    if(obsG.isTouching(Monkey)||Monkey.isTouching(og)){
      gameState=END;                        
      Monkey.changeAnimation("collide",Monkey_collide);
    }
    
    if(score%100===0){back.velocityX=back.velocityX-10}
        
    spawnObstacles();
    spawnBars();
    spawnBanana();
  }
  ////////////////////////////////////////////
if (gameState === END){
  
  back.velocityX=0;
  
  
  Monkey.y=230;
  Monkey.x=79;
  Monkey.visible=true;
  
  barG.destroyEach();
  obsG.destroyEach();
  bananaG.destroyEach();
  
  score=0;
  strength=0;
  
  obsG.setVelocityXEach(0);
  obsG.setLifetimeEach(-1);
  
  bananaG.setVelocityXEach(0);
  bananaG.setLifetimeEach(-1);
  
  barG.setVelocityXEach(0);
  barG.setLifetimeEach(-1);
  
  if(keyDown("space")){gameState=PLAY}
  
}  
  
  //Monkey.debug=true;
  
  drawSprites();          
  
  textSize(25);
  fill("black");
  text("Score:"+score,190,40);
  text("Strength: "+strength,330,40);
}

function spawnObstacles(){
  if (frameCount%80===0){
    obs=createSprite(1020,255,20,20);
    obs.addImage(obsI);
    obs.scale=0.15;
    obs.velocityX=back.velocityX;
    obs.lifetime=170;
    //obs.debug=true;
    obs.setCollider("circle",0,0,160);
    
    obsG.add(obs);
  }  
}

function spawnBars(){
  if(frameCount%170===0){
    bar=createSprite(1020,140,130,10);
    bar.velocityX=back.velocityX;
    bar.addImage(barsI);
    bar.scale=0.1;
    bar.lifetime=170;
    barG.add(bar);
    
    bar.depth=Monkey.depth;
    bar.depth=Monkey.depth-1
  }
}

function spawnBanana(){
  if(frameCount%230===0){
    banana=createSprite(1020,30,20,20);
    banana.velocityX=back.velocityX;
    banana.addImage(bananaI);
    banana.scale=0.1;
    banana.lifetime=170;
    bananaG.add(banana);
    
    banana.depth=Monkey.depth;
    banana.depth=Monkey.depth-1
  } 
}