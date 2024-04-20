var PLAY = 1;
var END = 0;
var gameState = PLAY;

var athlete;
var athleteRunning;
var track;
var trackImage
var hurdles;
var hurdlesImage;
var gameOver;
var gameOverImage;
var restart;
var restartImage;
var Hurdlesgroup;
var invisibleGround;


var jumpSound 
var dieSound


function preload(){

  trackImage=loadImage("track.jpg");
    athleteRunning=loadAnimation("athlete1-removebg-preview.png","athlete2-removebg-preview.png","athlete3-removebg-preview.png","athlete4-removebg-preview.png");
    hurdlesImage=loadImage("hurdles-removebg-preview.png");
    gameOverImage=loadImage("gameOver-removebg-preview.png");
    restartImage=loadImage("restart1-removebg-preview.png");
    
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")


  
}

function setup() {
  createCanvas(2000,920);

    track=createSprite(1100,500,50,70);
    track.addImage(trackImage);
    track.scale=2.5

    athlete=createSprite(500,700,50,70);
    athlete.addAnimation("running",athleteRunning);
    athlete.scale=1.2;

    invisibleGround=createSprite(400,800,600,1);
    invisibleGround.visible= false;

    

    gameOver=createSprite(850,490,50,70);
    gameOver.addImage(gameOverImage);
    gameOver.scale=1.9

    restart=createSprite(1200,490,50,70);
    restart.addImage(restartImage);
    restart.scale=0.3

    Hurdlesgroup=createGroup();

    
 
  
 athlete.setCollider("circle",0,0,80);
 athlete.debug = true
  
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
  
  if(keyDown("SPACE")&& athlete.y >= height-200 ) {
    athlete.velocityY = -20; 
   
  }
  
  athlete.velocityY=athlete.velocityY+0.8

  spawnHurdles();
if(Hurdlesgroup.isTouching(athlete)){
  gameState===END
}
  }
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    Hurdlesgroup.lifetime(-1);
    Hurdlesgroup.velocity(0);
    athlete.velocity(0);
    if(mousePressedOver(restart)){
      reset()
      
    }
}
            

  
athlete.collide(invisibleGround);
athlete.collide(Hurdlesgroup);
  drawSprites();
}

function spawnHurdles(){
  // write your code here 
  if(frameCount%90===0){
   hurdles=createSprite(width,height-450,40,10);
   hurdles.y=Math.round(random(780,790));
  hurdles.velocityX=-13;
  hurdles.addImage(hurdlesImage);
  hurdles.scale=0.4;
  hurdles.lifetime=300;
 
  }
}

function reset() {
  gamestate=PLAY 
  gameOver.visible=false;
  restart.visible=false;
  Hurdlesgroup.destroy();
 } 
