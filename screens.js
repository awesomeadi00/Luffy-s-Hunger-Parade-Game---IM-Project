//=========================SCREEN FUNCTIONS===========================
//====================================================================
//This function creates a clickable button for user interactivity throughout the menu
function button(title, button_color, x, y, w, h, rounding) {
  if(mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
    
    //Set the hovering over button color;
    button_color = "#0096FF";
    
    //Depending on which button the user presses, it will change that screen which will
    //update due to the draw() function. 
    if(mouseIsPressed) {      
      //Screens
      if(title == "Start") {
        ScreenOn = GameScreen; 
        //This stops the Main Menu music and starts the Game Music:
        MM_Track.stop();
        Game_Track.play();
        Game_Track.loop();
        Game_Track.setVolume(0.3);
        VolSlider.remove();
      }
      else if(title == "Instructions") {ScreenOn = InstructionScreen; }
      else if(title == "Difficulty") {ScreenOn = DifficultyScreen; }
      
      //Setting Difficulties
      if(title == "EASY") {Difficulty = 1; } 
      else if(title == "MEDIUM") {Difficulty = 2; } 
      else if(title == "HARD") {Difficulty = 3; }
      
      if(title == "MENU") {
        restartGame();
        Game_Track.stop()
        MM_Track.play();
        MM_Track.loop();
        VolSlider = createSlider(0.0, 1.0, 0.3, 0.1);
        VolSlider.position(30,760);
        VolSlider.style('width', '150px');
        ScreenOn = MainScreen;
      }
      
      else if(title == "RESTART") {
        VolSlider.remove();
        restartGame();
        ScreenOn = GameScreen;
      }
      
    }
  }
  
  //Colouring buttons for Difficulties:
  if(Difficulty == 1) {
    if(title == "EASY") button_color ="#D3494E";
  }

  else if(Difficulty == 2) {
    if(title == "MEDIUM") button_color ="#D3494E";
  }

  else if(Difficulty == 3) {
    if(title == "HARD") button_color ="#D3494E";
  }
  
  //Drawing the button:
  strokeWeight(1);
  fill(button_color);
  rect(x, y, w, h, rounding);
  
  //Button text:
  fill(255);
  textFont("Kefa", 30);
  text(title, (x+(x+w))/2, ((y+(y+h))+15)/2);
}

//====================================================================
//This function displays all the necessary images and buttons throughout the main menu.
function MainMenu() {
  //Main Menu Images
  image(MM_Ocean, width/2, height/2);
  image(One_Piece, width/2, 110, One_Piece.width/1.5, One_Piece.height/1.5);
  image(Game_Name, width/2, 260, Game_Name.width/1.8, Game_Name.height/1.8);
  image(MM_Luffy, 550, 550, MM_Luffy.width/3, MM_Luffy.height/3);
  
  textAlign(CENTER);
  button("Start", "#2B65EC", 80, 390, 200, 75, 40);
  button("Instructions", "#2B65EC", 80, 490, 200, 75, 40);
  button("Difficulty", "#2B65EC", 80, 590, 200, 75, 40);
}

//====================================================================
//This function displays all of the instructions for the user on how to play the game. 
function displayInstructions() {
  fill(0, 255, 255, 30);  //Alpha value set to 30 for nice fade
  rect(60, 60, 670, 670);
  
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text("How to Play:", width/2, 100);
  text("Press 'ENTER' to return to Main Menu", width/2, 700);
  
  textSize(20);
  textAlign(LEFT);
  
  //Printing the instructions:
  text("Luffy is a very hungry rubber man. Jump around and eat as much food", 80, 150);
  text("as possible!", 80, 170);
  
  text("Use keys to control Luffy:", 80, 210);
  text("- UP ARROW: Jumping up", 80, 230);
  text("- LEFT ARROW: Moving left", 80, 250);
  text("- RIGHT ARROW: Moving right", 80, 270);
  text("- DOWN ARROW: Fall Down", 80, 290);
  
  text("Luffy will have a depleting hunger bar (600hp) at the top of the screen:", 80, 330);
  
  image(Luffy_HungerBar, width/2, 365, Luffy_HungerBar.width/1.3, Luffy_HungerBar.height/1.3);
  
  text("Different foods have different hunger points:", 80, 420);
  text("- Vegetables:            50hp", 80, 440);
  text("- Cake:                      100hp", 80, 460);
  text("- Fried Rice:             150hp", 80, 480);
  text("- Bone Meat:            200hp", 80, 500);
  text("- Devil Fruit:           -50 hp", 80, 520);
  
  text("Try to eat all the foods Luffy loves to keep filling his hunger!", 80, 560);
  text("Get the highest score possible!", 80, 580);
  
  text("You can set the 'Difficulty' in the Difficulty Section!", 80, 620);
  text("The harder the difficulty, the faster Luffy's Hunger depletes!", 80, 640);
  
  //If the user presses "ENTER", then it will return them back to the Main Menu
  if(keyCode == ENTER) {
    ScreenOn = MainScreen;
    keyCode = 0;
  }
}

//====================================================================
//This function allows the user to set their difficulty for the game.
function setDifficulty() {
  fill(0, 255, 255, 30);  //Alpha value set to 30 for nice fade
  rect(60, 60, 670, 670);
  
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text("Set Difficulty:", width/2, 100);
  text("Press 'ENTER' to return to Main Menu", width/2, 700);
  
  button("EASY", "#2B65EC", 95, 150, 600, 125, 20);
  button("MEDIUM", "#2B65EC", 95, 300, 600, 125, 20);
  button("HARD", "#2B65EC", 95, 450, 600, 125, 20);
  
  //If the user presses "ENTER", then it will return them back to the Main Menu
  if(keyCode == ENTER) {
    ScreenOn = MainScreen;
    keyCode = 0;
  }
}

//====================================================================
//This function is the ending screen of a game, here the user can select whether they wish to restart or go back to the main menu:
function gameEnd() {   
  //This prints your score with a picture of Luffy being full
  textAlign(CENTER);
  textFont("Kefa", 30);
  fill("white");
  background("#0047AB");
  text("YOUR SCORE:", width/2, 100);
  text(TotalPoints, width/2, 150);
  image(Luffy_Full, width/2, 350, Luffy_Full.width/2, Luffy_Full.height/2);
  
  //These are two buttons which allow the user to either go back to the main menu or restart the game
  button("MENU", "#2B65EC", 100, 600, 250, 100, 20);
  button("RESTART", "#2B65EC", 450, 600, 250, 100, 20);
}
