(function() {
    
    this.aliens = function(rows, cols) {

      this.space = {};
      this.remaining = rows * cols;
      this.x = 15;
      this.y = 20;
      this.bullets = [];
      this.init = function() {
        for(var r = 0; r < rows; r++) {
            this.space[r] = {};
            for(var c = 0; c <cols; c++) {
              this.space[r][c] = new alien(r);
            }
        }
        return this;
      }
      this.canShoot = function(row, col) {
          var nextRow;
          while( (nextRow = this.space[++row]) != undefined ) {
              if (nextRow[col].alive) {
                  return false;
              }
          }
          return true;
      }
      

      return this.init();
    };
    
    var alien = function(type) {
      this.img = sprites.aliens[type];
      this.alive = true;
      this.x = 0;
      this.y = 0;
      this.width = 15;
      this.height = 15;
    };

}).call(this);
