(function() {
  var c;
  var ship;
  this.init = function() {
    element = document.getElementById('screen');
    c = element.getContext("2d");
    c['width'] = element.style.width;
    c['height'] = element.style.height;
    
    ship = {
      x : 100,
      y : 100
    }
    drawShip();
  };
  
  this.redraw = function() {
      c.clearRect(0, 0, 500, 500);
      drawShip();
  }
  this.drawShip = function() {
      c.clearRect(0, 0, 500, 500);
      c.fillStyle = "white";
      c.fillRect(ship.x, ship.y, 10, 10)
  };

  this.moveRight = function() {
      ship.x = ship.x + 2;
      drawShip();
  };

  this.moveLeft = function() {
      ship.x = ship.x - 2;
      drawShip();
  };
  
  this.fire = function() {
    //if (bullet != 0) return;
    var x = ship.x+4;
    var y = ship.y-3;
     
    var bullet = setInterval(function() {
      
      c.clearRect(x, y--, 2, 3)
      c.fillRect(x, y, 2, 2);
      if(y < -5) {
        clearInterval(bullet);
        bullet = 0;
      }

    }, 2);
  };

  document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        fire();
        break;
      case 39:
        moveRight();
        break;
    }
  };
})();
