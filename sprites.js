(function() {

    this.sprites = new function() {
        
      this.ship = new Image();
      this.ship.src = 'imgs/ship.png';
          
      var a1, a2, a3;
      a1 = new Image();
      a1.src = 'imgs/alien1.png';
      a2 = new Image();
      a2.src = 'imgs/alien2.png';
      a3 = new Image();
      a3.src = 'imgs/alien3.png';
    
      this.aliens = [a1, a2, a3];
      
      this.bullet = new Image();
      this.bullet.src = 'imgs/bullet.png';

      this.explosion = new Image();
      this.explosion.src = 'imgs/explosion.png'; 
    };


}).call(this);
