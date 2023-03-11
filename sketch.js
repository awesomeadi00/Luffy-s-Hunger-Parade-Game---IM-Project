//LUFFY'S HUNGER PARADE - Midterm Project - Aditya Pandhare (ap7146)
//==================================================================
//Other Variables:
let VolSlider;
let food_imgs = []; 

//Screen Variables:
let ScreenOn; //This is the screen that the user is currently on
let MainScreen = 0;
let InstructionScreen = 1;
let DifficultyScreen = 2;
let GameScreen = 3;
let EndGame = 4;
//==================================================================
function preload() {
  soundFormats('mp3');
  
  //Loading the images
  Luffy_Full = loadImage("Images/L_Full.png");
  MM_Luffy = loadImage("Images/MM_Luffy.png");
  MM_Ocean = loadImage("Images/MM_Ocean.png");
  One_Piece = loadImage("Images/One_Piece.png");
  Game_Name = loadImage("Images/Game_Name.png");
  Game_BG = loadImage("Images/Game_BG.png");
  Luffy_HungerBar = loadImage("Images/Luffys_Hunger_Bar.png");
  
  //Loading food items
  Devil_Fruit = loadImage("Images/Devil_Fruit.png");
  Bone_Meat = loadImage("Images/Bone_Meat.png");
  Fried_Rice = loadImage("Images/Fried_Rice.png");
  Cake = loadImage("Images/Cake.png");
  Vegetables = loadImage("Images/Vegetables.png");
  
  //Loading the music:
  Game_Track = loadSound("Music/Game_Track.mp3");
  MM_Track = loadSound("Music/MM_Track.mp3");
  Jump_Sound = loadSound("Music/Jump_Sound.mp3");
  Eating_Sound = loadSound("Music/Eating_Sound.mp3");
  UMAI = loadSound("Music/UMAI.mp3");
  
  //Loading the sprites:
  Luffy_Stand = loadImage("Images/Luffy_Stand.png");
  Luffy_Right = loadImage("Images/Luffy_Right.png");
  Luffy_Left = loadImage("Images/Luffy_Left.png");
  Luffy_Jump_Right = loadImage("Images/Luffy_Jump_Right.png");
  Luffy_Jump_Left = loadImage("Images/Luffy_Jump_Left.png");
  Luffy_Fall = loadImage("Images/Luffy_Fall.png");
}

//==================================================================
function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  
  //Starting Screen is the MainScreen         
  ScreenOn = MainScreen;
  
  //Volume Slider Initializing Settings
  VolSlider = createSlider(0.0, 1.0, 0.3, 0.1);
  VolSlider.position(30,760);
  VolSlider.style('width', '150px');
  
  //Volume Settings
  MM_Track.play();   
  MM_Track.loop();
  Eating_Sound.setVolume(0.2);
  UMAI.setVolume(0.7);
  
  //Resizes the food image sizes and appending them to the food_imgs array
  Devil_Fruit.resize(65, 75);
  Bone_Meat.resize(80, 75);
  Fried_Rice.resize(120, 60);
  Cake.resize(80, 70);
  Vegetables.resize(60, 60);
  
  append(food_imgs, Devil_Fruit);
  append(food_imgs, Bone_Meat);
  append(food_imgs, Fried_Rice);
  append(food_imgs, Cake);
  append(food_imgs, Vegetables);
  
  //Getting the width of the sprite images 
  let Stand_w = int(Luffy_Stand.width/3);
  let Right_w = int(Luffy_Right.width/8);
  let Left_w = int(Luffy_Left.width/8);
  let JumpR_w = int(Luffy_Jump_Right.width/6);
  let JumpL_w = int(Luffy_Jump_Left.width/6);
  let Fall_w = int(Luffy_Fall.width/2);

  //Dividing the sprites into frames and placing them into their respective arrays
  for(let s = 0; s < 3; s++) {
    Luffy_Stand_Sprites[s] = Luffy_Stand.get(s*Stand_w, 0, Stand_w, Luffy_Stand.height);
  }
  
  for(let m = 0; m<8; m++) {
    Luffy_Right_Sprites[m] = Luffy_Right.get(m*Right_w, 0, Right_w, Luffy_Right.height);
    Luffy_Left_Sprites[m] = Luffy_Left.get(m*Left_w, 0, Left_w, Luffy_Left.height);
  }
  
  for(let jr = 0; jr<6; jr++) {
    Luffy_JumpRight_Sprites[jr] = Luffy_Jump_Right.get(jr*JumpR_w, 0, JumpR_w, Luffy_Jump_Right.height);
  }
  
  for(let jl = 0; jl<6; jl++) {
    Luffy_JumpLeft_Sprites[jl] = Luffy_Jump_Left.get(jl*JumpL_w, 0, JumpL_w, Luffy_Jump_Right.height);
  }
  
  for(let f = 0; f<6; f++) {
    Luffy_Fall_Sprites[f] = Luffy_Fall.get(f*Fall_w, 0, Fall_w, Luffy_Fall.height);
  }
  
  //Appending the borders and platforms:
  append(borders, new Platform(0, 0, width, 10));           //Roof
  append(borders, new Platform(0, 0, 10, height));          //Left Wall
  append(borders, new Platform(width-10, 0, 10, height));   //Right Wall
  
  append(platforms, new Platform(10, height-10, width, 10));
  append(platforms, new Platform(10, 635, 220, 15));
  append(platforms, new Platform(640, 480, 150, 15));
  append(platforms, new Platform(325, 480, 200, 15));

  append(platforms, new Platform(10, 170, 100, 15));
  append(platforms, new Platform(700, 170, 90, 15));
  
  //Moving Platform:
  append(platforms, new Platform(10, 325, 150, 15));
  
  user = new Luffy();
}

//==================================================================
function draw() {
  //All Menu functions are available from the menu.js file. This includes:
  //MainMenu(), displayInstructions(), setDifficulty(), button()
  
  //This constantly checks which Screen to display
  if(ScreenOn == MainScreen) {MainMenu(); }
  else if(ScreenOn == InstructionScreen) {displayInstructions(); }
  else if(ScreenOn == DifficultyScreen) {setDifficulty(); } 
  else if(ScreenOn == GameScreen) {startGame(); }
  else if(ScreenOn == EndGame) {gameEnd(); }
  
  //If the user is on any of the Menu screens, then draw the volume slider of the menu
  if(ScreenOn == MainScreen || ScreenOn == InstructionScreen || ScreenOn == DifficultyScreen) { 
    MM_Track.setVolume(VolSlider.value());
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Volume", 30, 755);
  } 
}