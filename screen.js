(function() {
  
  this.screen = {
    
    ship : {
        x : 20,
        y : 135,
        dead : false,
        sprite : sprites['ship'],
        deadSprite : sprites['explosion']
    },
        
    level : 3, 
    aliens : {},
    
    
    score : 0,
    lives : 3,
    

    init : function() {
      var element = document.getElementById('screen');
      this.aliens = new aliens(this.level, 10);
      this.canvas = element.getContext('2d');
      this.canvas.fillStyle = 'white';
      this.drawItems();
    },

    redraw : function() {
      this.canvas.clearRect(0, 0, 500, 500); 
      this.drawItems();
    },
    
    drawItems : function() {

      // draw score
      this.canvas.font = "bold 12px monospace";
      this.canvas.fillText(this.score, 5, 12);
    
      // draw lives
      this.canvas.fillText(this.lives, 280, 12);
      if (this.gameOver) {
          this.canvas.font = 'bold 24px monospace';
          this.canvas.fillText('Game Over', 80, 70);
          this.canvas.font = 'bold 12px monospace';
          this.canvas.fillText('Press any key to restart', 65, 85);
          clearInterval(game);
          return;
      }
      // draw ship
      this.canvas.drawImage(this.ship.dead ? this.ship.deadSprite : this.ship.sprite, this.ship.x, this.ship.y, 25, 15);
      if (control.firing) {
        this.canvas.fillRect(control.bullet.x, control.bullet.y--, 2, 3);
        if (control.bullet.y < -5) {
            control.firing = false;
        }
      }
     
      for (var bullet in this.aliens.bullets) {
          var b = this.aliens.bullets[bullet];
          this.canvas.drawImage(sprites['bullet'], b.x, b.y++, 5, 5);
          if (b.y < -5) {
              delete this.aliens.bullets[bullet];
          }
      }
      // draw aliens
      for (var row in this.aliens.space) {
          for (var col in this.aliens.space[row]){
            var alien = this.aliens.space[row][col];
            if (alien.alive) {
                alien.x = col * 25 + this.aliens.x;
                alien.y = row * 15 + this.aliens.y;
                this.canvas.drawImage(alien.img, alien.x, alien.y, 15, 10);
            }
        
          }
      }

      
    },    
    
    death : function() {
      // show death animation
      this.ship.dead = true;
      this.lives--;
      if (this.lives == 0) {
          this.restart();
          this.gameOver = true;
          this.ship.dead = false;
      }
    },

    addScore : function() {
    },

    restart : function() {
        this.aliens = new aliens(3, 10);
    }
  };
  
  this.control = {
      leftDown : false,
      rightDown : false,
      shootDown : false,
      firing : false,

      bullet : {
          x : 0,
          y : 0
      },

      makeMove : function() {
        if (this.leftDown) this.moveLeft();
        else if (this.rightDown) this.moveRight();
        if (this.shootDown) this.shoot();
      },

      moveLeft : function() {
          screen.ship.x--;
      },

      moveRight : function() {
          screen.ship.x++;
      },
      
      shoot : function() {
          if (this.firing) return;
          this.firing = true;
          
          this.bullet.x = screen.ship.x + 12;
          this.bullet.y = screen.ship.y - 3;
      }
  };
  
  document.onkeydown = function(e) {
    e = e || window.event;
    if (screen.gameOver) {
        screen.gameOver = false;
        screen.score = 0;
        screen.lives = 3;
        startGame();
    }
    if (screen.ship.dead) {
        control.leftDown = false;
        control.rightDown = false;
        control.shootDown = false;
        return;
    }

    switch (e.keyCode) {
      case 37:
        control.leftDown = true;
        break;
      case 38:
        control.shootDown = true;
        break;
      case 39:
        control.rightDown = true;
        break;
    }
  };
  
  document.onkeyup = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        control.leftDown = false;
        break;
      case 38:
        control.shootDown = false;
        break;
      case 39:
        control.rightDown = false;
        break;
    }
  };
  
}).call(this);
