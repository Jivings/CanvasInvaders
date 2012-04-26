(function() {
    var ticks = 0;
    var speed = 5;
    var deadFor = 0;
    this.game;

    this.startGame = function() {
      game = setInterval(function() {
        control.makeMove();
        checkCollision();
        if (ticks % speed == 0) {
          updateAliens();
        }
        testEndGame();
        speed = increaseSpeed();
        screen.redraw();
        if (ticks++ == 100) {
            ticks = 0;
        }
        // wait a few ticks before respawning
        if (screen.ship.dead) {
            deadFor++;
            if (deadFor > 50) {
                screen.ship.dead = false;
                deadFor = 0;
            }
        }
    
      }, 5);
    };

    this.increaseSpeed = function() {
        var a = screen.aliens.remaining;
        if(a < 5) {
            return 1;
        }
        else if(a < 10) {
            return 2;
        }
        else if(a < 15) {
            return 3;
        }
        else if(a < 20) {
            return 4;
        }
        else {
            return 5;
        }
    };

    this.checkCollision = function() {
      if (screen.ship.dead) return false;

      for (var bullet in screen.aliens.bullets) {
          var x, y, shipx, shipy;
          x = screen.aliens.bullets[bullet].x;
          y = screen.aliens.bullets[bullet].y;
          shipx = screen.ship.x;
          shipy = screen.ship.y;
          if (x > shipx && x < shipx + 20) {
              if (y > shipy) {
                delete screen.aliens.bullets[bullet]
                shipHit();
              }
          }
          if (y > 140) {
              delete screen.aliens.bullets[bullet]
          }
      }
 
      if (!control.firing) return false;

      for (var row in screen.aliens.space) {
          for (var col in screen.aliens.space[row]) {
              var alien = screen.aliens.space[row][col];
              var bullet = control.bullet;
              if (alien.alive) {

                  if (bullet.x > alien.x && bullet.x < alien.x + alien.width) {
                      if (bullet.y > alien.y && bullet.y < alien.y + alien.height) {
                          alien.alive = false;
                          control.firing = false;
                          screen.score += 10;
                          screen.aliens.remaining--;
                      }
                  }
              }
          }
      }

          };

    var goRight = false;
    this.updateAliens = function() {
        var left, right;
        left = 0;
        right = 60;
        if (goRight) {
            screen.aliens.x++;
        }
        else {
            screen.aliens.x--;
        }

        
        // count the cols to see how far to go left
        outer:
        for (var col = 0; col < 10; col ++) {
            for (var row = 0; row < 3; row++) {
                if(screen.aliens.space[row][col].alive) {
                    break outer;
                }
                else {
                    left += -8;
                }
            }
        }
        // count the cols to see how far to go right
        outer: 
        for (var col = 9; col > -1; col --) {
            for (var row = 0; row < 3; row++) {
                if(screen.aliens.space[row][col].alive) {
                    break outer;
                }
                else {
                    right += 8;
                }
            }
        }


        if (screen.aliens.x == left) {
            goRight = true;
            screen.aliens.y += 1;
        }
        

        else if (screen.aliens.x == right) {
            goRight = false;
            screen.aliens.y += 1;
        }
        
        // chance of an alien with ground access of firing at player
        for (var row = 0; row < 3; row ++ ) {
            for (var col = 0; col < 10; col ++ ) {
                var alien = screen.aliens.space[row][col];
                if (alien.alive && screen.aliens.canShoot(row, col) && (Math.random() > 0.995)) {
                   screen.aliens.bullets.push({x : alien.x, y : alien.y }); 
                }
            }

        }
    };


    this.testEndGame = function() {
        if (screen.aliens.y > 100) {
            shipHit();
            screen.restart();
        }
        if (screen.aliens.remaining == 0) {
            screen.restart();
            screen.level++;
        }
    };

    this.shipHit = function() {
      screen.death();
    };


    startGame();
}).call(this);
