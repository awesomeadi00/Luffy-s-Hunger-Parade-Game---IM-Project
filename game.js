//============================GAME FUNCTIONS================================
//Global Game Variables:
let platforms = [];
let moving_platform;
let moving_platform_speed = 2;
let moving_platform_direction = 1;

let borders = [];
let FoodOnScreen = [];
let Hunger = 600;
let TotalPoints = 0;
let food_SpawnRate = 10; //in seconds
let Difficulty = 1; //Easy by default
let Ground = 720;

//Sprite Variables: 
let Luffy_Stand;
let Luffy_Stand_Sprites = [];
let Luffy_Stand_Step = 0;

let Luffy_Right;
let Luffy_Right_Sprites = [];
let Luffy_Right_Step = 0;

let Luffy_Left;
let Luffy_Left_Sprites = [];
let Luffy_Left_Step = 0;

let Luffy_Jump_Right;
let Luffy_JumpRight_Sprites = [];
let Luffy_JumpRight_Step = 0;

let Luffy_Jump_Left;
let Luffy_JumpLeft_Sprites = [];
let Luffy_JumpLeft_Step = 0;

let Luffy_Fall;
let Luffy_Fall_Sprites = [];
let Luffy_Fall_Step = 0;

//==========================================================================
function startGame() {
  image(Game_BG, width/2, height/2);
  drawPlatforms();
  drawHungerBar();
  
  //If Luffy is still hungry, keep spawning food, else then remove all the food on the game.
  if(Hunger != 0) {spawnFood(); }
  else {
    FoodOnScreen.splice(0, FoodOnScreen.length); 
    ScreenOn = EndGame;
  }

  //Controls Luffy's Movements
  UserLuffy();
  user.border_collision();
  for(let i=0; i<platforms.length; i++) {
    user.platform_collide(platforms[i], moving_platform);
  }
  
  fill(0);
  text("Score: ", width/2-50, 100);
  text(TotalPoints, width/2+25, 100);
  
  button("MENU", "#2B65EC", 680, 20, 100, 40, 4);
}

//===========================================================================
//This function draws all the necessary platforms on the Game Screen for Luffy to hop around:
function drawPlatforms() {
  for(let i=0; i<borders.length; i++) {borders[i].draw(); } //make it borders.length -1
  for(let j=0; j<platforms.length-1; j++) {platforms[j].draw(); }
  
  //This monitors the moving platform
  moving_platform = platforms[6];
  moving_platform.x += moving_platform_speed * moving_platform_direction;
  if(moving_platform.x + moving_platform.w == width-10) {
    moving_platform_direction = -1;
  }
  
  else if(moving_platform.x == 0) {
    moving_platform_direction = 1;
  }
  moving_platform.draw();
}

//=============================================================================
//This function draws Luffy's Depleting Hunger Bar:
function drawHungerBar() {
  //Hunger Bar Background
  fill("yellow");
  rect(20, 20, 600, 25, 4);
  
  //Luffy's Hunger Meter:
  fill("red");
  rect(20, 20, Hunger, 25, 4);
  
  //Since the depletion rate doesn't let Hunger = 0 exactly, if it reaches somewhere in this range of [0, 1) to account for all difficulties, then Hunger is absorbed to 0 and the user loses. 
  if(Hunger >= 0 && Hunger < 1.5) {
    Hunger = 0;
    UMAI.play();
  }
  
  //Otherwise it will keep depleting the Hunger bar, if the difficulty is harder, then it will deplete faster. 
  else {
     Hunger = Hunger - (0.1*(Difficulty*2.5));
  }
}

//============================================================================
//This function should spawn food while Luffy is still hungry (spawns ever 10 seconds)
function spawnFood() {
  //Every food_SpawnRate seconds, it will allocate a random platform and random food to spawn. 
  if(frameCount % (30*(food_SpawnRate-(Difficulty*1.5))) == 0) {
    let randFood = int(random(5)); 
    let randPlatform = int(random(6)); 
    
    //This we would create a new Food Object and append this to the FoodOnScreen array to keep drawing
    append(FoodOnScreen, new Food(platforms[randPlatform].getPlatformX(), platforms[randPlatform].getPlatformY(), food_imgs[randFood].width, food_imgs[randFood].height, food_imgs[randFood]));
  }
  
  //Here we spawn the food (continuously draw), and if a collision is detected with Luffy and the food, then it adds to the hungerbar and removes it from the FoodOnScreen array.
  for(let i=0; i<FoodOnScreen.length; i++) {
    FoodOnScreen[i].spawn();
    if(user.food_collide(FoodOnScreen[i]) == true) {
      Eating_Sound.play();
      FoodOnScreen[i].addHunger();
      FoodOnScreen[i].addPoints();
      FoodOnScreen.splice(i, 1);
    }
  }
}

//============================================================================
//This function would monitor Luffy's movements which are controlled by the user
function UserLuffy() {
  user.jump_settings();
  
  if (keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)) {user.jump_left(); }
  else if (keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) {user.jump_right(); }
  else if(keyIsDown(DOWN_ARROW) && keyIsDown(LEFT_ARROW)) {user.fall_left(); }
  else if(keyIsDown(DOWN_ARROW) && keyIsDown(RIGHT_ARROW)) {user.fall_right(); }
  
  else if (keyIsDown(LEFT_ARROW)) {user.move_left(); }
  else if(keyIsDown(RIGHT_ARROW)) {user.move_right(); } 
  else if(keyIsDown(DOWN_ARROW)) {user.fall(); }
  else if (keyIsDown(UP_ARROW)) {user.jump(); }
  else {user.stand(); }
}

//============================================================================
//This function would restart all of the game settings: 
function restartGame() {
  FoodOnScreen.splice(0, FoodOnScreen.length);
  TotalPoints = 0;
  Hunger = 600;
  user.setSpawn();
}