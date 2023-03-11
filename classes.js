//================================CLASSES=====================================
//==============================LUFFY CLASS===================================
class Luffy {
  constructor() {
    this.setSpawn();
    this.height = 135;
    this.width = 85;
    this.velocity = 0;
    this.gravity = 0.3;
    this.boost = -10.5;
    this.speed = 5;
    this.level = Ground; //this is essentially where luffy's center should be
  }
  
  //These jump settings ensure that gravity is always acting on Luffy. If any of the up key combinations are pressed, he would gain some velocity to jump up and once he's reached the peak, gravity would pull him down.
  jump_settings() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    //This ensures that Luffy is always above this.platform (including the ground which is what it is initialized to). Depending on what he's standing on, this.platform will change. 
    if(this.y > this.level) {
      this.velocity = 0;
      this.y = this.level;

      if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        this.velocity += this.boost;
        Jump_Sound.play();
      }

      else if(keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) {
        this.velocity += this.boost;
        Jump_Sound.play();
      }

      else if(keyIsDown(UP_ARROW)) {
        this.velocity += this.boost;
        Jump_Sound.play();
      }
    }
  }
  
  //This makes sure that Luffy is bounded by the left, right and roof walls
  border_collision() {
    //This makes sure Luffy cannot move past the roof of the canvas
    if(this.y-this.height/2 < borders[0].y+borders[0].h) {
      this.y = borders[0].y+borders[0].h + this.height/2;
      this.velocity = 0;
    }
    
    //This makes sure Luffy cannot move past the left side of the canvas
    if(this.x-this.width/2 < borders[1].x+borders[1].w) {
      this.x = borders[1].x+borders[1].w + this.width/2;
    }
    
    //This makes sure Luffy cannot move past the right side of the canvas
    if(this.x+this.width/2 > borders[2].x) {
      this.x = borders[2].x - this.width/2;
    }
  }
  
  //This function checks the collision of Luffy with all of the platforms. It checks if his head hits the platforms that he stays under it. If his feet touch the platform, he will stay on it.
  platform_collide(platform, moving_p) {    
    //Checks if Luffy's head hits a platform.
    if(this.y-this.height/2 >= platform.y && this.y-this.height/2 <= platform.y+platform.h && this.x >= platform.x && this.x <= platform.x+platform.w) {
      this.y = (platform.y+platform.h) + this.height/2;
    }
        
    //Checks if Luffy's feet are on the platform.
    if(this.x >= platform.x && this.x <= platform.x+platform.w && this.y+this.height/2 >= platform.y && this.y+this.height/2 <= platform.y+platform.h) {
      this.level = platform.y - this.height/2; //this makes platform y coordinate the new ground
      this.platform_x = platform.x;
      this.platform_w = platform.w;
    }
    
    //This gets the saved platform that Luffy is currently on's x coordinate and width and checks if he is outside the range of the width of the platform. If so, then he will fall to the ground.
    else if(this.x+this.width/2 <= this.platform_x || this.x-this.width/2 >= this.platform_x+this.platform_w) {
      this.level = Ground;
    }
    
     //This is specifically for the moving platform, since it has constantly changing x coordinates, it has a seperate if statement check. If Luffy is outside the range of its level, he will fall.    
    if((this.x+this.width/2 <= moving_p.x || this.x-this.width/2 >= moving_p.x+moving_p.w) && (this.y+this.height/2 == moving_p.y || this.y+this.height/2 == 330)){
      this.level = Ground;
    }
  }
  
  //This function will check if Luffy collides with any of the food, it will add to the Hunger Bar and remove it from the screen. 
  food_collide(food) {
    if(this.x+this.width/2 >= food.x-food.w/2 && this.x-this.width/2 <= food.x+food.w/2 && this.y-this.height/2 < food.y+food.h/2 && this.y+this.height/2 >= food.y-food.h/2) {
      return true;
    }
    
  }
  
  //If the up and left arrow is pressed, it will execute the jump_settings and move his image to the left. The jump_left frames will also cycle through.
  jump_left() {
    if (frameCount % (30*0.4) == 0) {
      Luffy_JumpLeft_Step = (Luffy_JumpLeft_Step + 1) % 6;
    }
    this.x -= this.speed/1.5;
    image(Luffy_JumpLeft_Sprites[Luffy_JumpLeft_Step], this.x, this.y);
  }
  
    //If the up and right arrow is pressed, it will execute the jump_settings and move his image to the right. The jump right frames will also cycle through.
  jump_right() {
      if (frameCount % (30*0.4) == 0) {
        Luffy_JumpRight_Step = (Luffy_JumpRight_Step + 1) % 6;
      }
      this.x += this.speed/1.5;
      image(Luffy_JumpRight_Sprites[Luffy_JumpRight_Step], this.x, this.y);
  }
  
    //If the down and left arrow is pressed, it will move his image to the left and down. The falling sprites wil cycle through.
  fall_left() {
    if (frameCount % (30) == 0) {
      Luffy_Fall_Step = (Luffy_Fall_Step + 1) % 2;
    }
    this.y += this.speed;
    this.x -= this.speed;
    image(Luffy_Fall_Sprites[Luffy_Fall_Step], this.x, this.y);
  }
  
    //If the down and right arrow is pressed, it will move his image to the right and down. The falling sprites wil cycle through.
  fall_right() {
    if (frameCount % (30) == 0) {
      Luffy_Fall_Step = (Luffy_Fall_Step + 1) % 2;
    }
    this.y += this.speed;
    this.x += this.speed;
    image(Luffy_Fall_Sprites[Luffy_Fall_Step], this.x, this.y);
  }
    
    //If the left arrow is pressed, it will move his image to the left. The running left sprites wil cycle through.
  move_left() {
    if (frameCount % (30*0.2) == 0) {
      Luffy_Left_Step = (Luffy_Left_Step + 1) % 8;
    }  
    this.x -= this.speed;
    image(Luffy_Left_Sprites[Luffy_Left_Step], this.x, this.y); 
  }
  
    //If the right arrow is pressed, it will move his image to the right. The running right sprites wil cycle through.
  move_right() {
    if (frameCount % (30*0.2) == 0) {
      Luffy_Right_Step = (Luffy_Right_Step + 1) % 8;
    }
    this.x += this.speed;
    image(Luffy_Right_Sprites[Luffy_Right_Step], this.x, this.y);
  }
    
  //If the down arrow is pressed, it will move his image to down. The falling sprites wil cycle through.
  fall() {
    if (frameCount % (30) == 0) {
      Luffy_Fall_Step = (Luffy_Fall_Step + 1) % 2;
    }
    this.y += this.speed;
    image(Luffy_Fall_Sprites[Luffy_Fall_Step], this.x, this.y);
  }
  
  //If the up arrow is pressed, it will call the jump_settings and move him up. The jumping right sprites will also cycle through.
  jump() {
    if (frameCount % (30*0.4) == 0) {
      Luffy_JumpRight_Step = (Luffy_JumpRight_Step + 1) % 6;
    }    
    image(Luffy_JumpRight_Sprites[Luffy_JumpRight_Step], this.x, this.y);
  }
  
  //Else if no key is pressed, he will just stand where he is and the standing sprites would cycle through.
  stand() {
    if (frameCount % (30*0.5) == 0) {
      Luffy_Stand_Step = (Luffy_Stand_Step + 1) % 3;
    }
    image(Luffy_Stand_Sprites[Luffy_Stand_Step], this.x, this.y);
  }
  
  setSpawn() {
    this.x = width/2;
    this.y = Ground;
  }
}


//=============================PLATFORM CLASS=================================
//This class is for the Platforms on the map. This will coordinate with Luffy's coordinates to ensure that he can stand on the platforms. 
class Platform {
  constructor(X, Y, W, H) {
    this.x = X;
    this.y = Y;
    this.w = W;
    this.h = H;
  }
  
  //This will draw the platform shape
  draw() {
    fill("#5C4033");
    rect(this.x, this.y, this.w, this.h);
  }
  
  //This are getter functions for the platforms coordinates which are used for spawning food..
  getPlatformX() {return random(this.x+50, (this.x+(this.w-50)));}
  getPlatformY() {return this.y;}
  
}

//==============================FOOD CLASS======================================
//This class will assort different food items and their corresponding values. If they have a higher value, they will fill Luffy's Hunger bar even more and vice versa. They can only spawn on platforms.
class Food {
  constructor(platformX, platformY, Food_Img_W, Food_Img_H, Food_img) {
    this.x = platformX;          
    this.y = platformY - 40;
    this.w = Food_Img_W;
    this.h = Food_Img_H;
    this.design = Food_img;
    
    this.init_hungerValue();
  }
  
  //This function initializes all of the hungerValues depending on the food it is
  init_hungerValue() {
    if(this.design == Devil_Fruit) {this.hungerValue = -50; }
    else if(this.design == Bone_Meat) {this.hungerValue = 200; }
    else if(this.design == Fried_Rice) {this.hungerValue = 150; }
    else if(this.design == Cake) {this.hungerValue = 100; }
    else if(this.design == Vegetables) {this.hungerValue = 55; }
  }
    
  //This function ensures that they spawn only on platforms and if the maxSpawnNum hasn't been reached
  spawn() {
    image(this.design, this.x, this.y);
  }
  
  //Once a collision is detected, then it will add to the Hunger Bar.
  addHunger() {
    if(Hunger + this.hungerValue > 600) {
      Hunger = 600;
    }
    
    else {
      Hunger = Hunger + this.hungerValue;
    }
  }
  
  addPoints() {
    TotalPoints += this.hungerValue;
  }
}