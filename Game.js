var canvas;
var z = 0;
var grounds = [];
var player;
var onG=false;
var shift = 5;
var IsGaya = false;
var Score = 0;

function setup()
{
    background(255);
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
   
    grounds[0] = new Ground(width/1.5,height/1.5);
    
    
    for(var i = 1; i < 100 ; i++)
    {
        var x = width/2+ i*shift*80;
        var y = random(innerHeight/2,innerHeight/3);
        
        grounds[i] = new Ground(x,y);
    }
   
    player = new Player(width/2,height/4);     
}
function keyPressed()
{
    if(onG)
    {
         if(key == 'w' || key == ' ')
        {
            player.up();
           //onG = false;  
        }
        
    } 
   
}
function draw()
{   
    if(frameCount % 100 == 0 && !IsGaya)
        {
            Score += 1;
        }
    
      if(IsGaya)
      {
          var Highscore = Score;
          if(frameCount%5 ==0)
              {
                  background(254); 
              }
          else if (frameCount % 5 == 2)
            {
                  background(255); 
              }
     
                     fill(0,100);
          
                 textSize(frameCount%100);
                 text("Aaj k liye bass itna hi", 10,height/2);
          push();  
          textSize(20);
          text("Highcore : "+Highscore , 10,20);
          pop();       
      }
      else
      {
            background(255);  
            fill(100,150);
            textSize(20);
            text("Score : "+Score, 10,20);
      }
    for(var i = 0; i < grounds.length; i++)
        {
        if(grounds[i].hits(player)) 
            {
                
            }
        grounds[i].display();
        grounds[i].move();
        }
    player.display();
    player.move();
    
    if (keyIsDown(LEFT_ARROW))
        player.left();
    if (keyIsDown(RIGHT_ARROW))
        player.right();
    
    z += 1; 
    if(grounds.length > 100)
        {
            grounds.splice(0,1);
          
        }  
}
function Ground(x,y)
{
    
    this.x = x;
    this.y = y;
    this.size =100;
    this.hits = function(player)
    {
        
        if((player.x > (this.x) && player.x < (this.x+100)) && (player.y > (this.y-12) && player.y < (this.y+100)))
           {
               player.y = this.y-12;
               onG=true;
               this.y += 5;
           }
    }
    this.display = function()
    {
       // background(0);
        fill(225);
        rect(this.x, this.y , this.size, this.size);
    }
    this.move = function()
    {
        this.x = this.x - shift;  
        
           if (z % 20 == 0)
            {
             this.y = this.y + random(0,25);   
            }
        else if(z % 20 == 10)
            {
             this.y = this.y - random(0,25);
            } 
        
    }
}
function Player(x,y)
{
    this.history = [];
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = 0.9;
    this.upforce = -50;
    
    
    this.display = function()
    {
         var v = createVector(this.x,this.y);
       if(!onG)
           {
              
            this.history.push(v);
           }
        
        
        if(this.history.length > 25)
            {
                this.history.splice(0,1);
            }
        
        
       
        fill(0)
        ellipse(this.x,this.y,25,25);
         noStroke();
        beginShape();
        for(var i = 0; i < this.history.length; i++)
            {
                var pos = this.history[i];
                
                fill(0,100);
                ellipse(pos.x,pos.y,i,i);
            }
        endShape();
            
    }
    this.move = function()
    {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if(this.y > height-10)
            {
                IsGaya = true;
                this.y = height-10; 
                onG = false;
            }
     
     
        
    print(this.velocity);
        
        if(onG) 
            {
              this.x = this.x - shift * 0.9;
            } 
          if(this.velocity < 0)
           {
               onG = false;
           }
       
        
     }
    this.right = function()
    {
        this.x += 7;
    }
    this.left = function()
    {
        this.x += -7;
    }
    this.up = function()
    {
        if(this.velocity > 0)
            this.velocity += this.upforce; 
    }
}