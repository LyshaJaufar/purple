var canvas = document.querySelector( 'canvas')
var colorBlue = '#A2CCB6'
var colorYellow = '#FCEEB5'
var colorRed = '#EE786E'

const randomInt = ( min, max ) => Math.floor( Math.random() * ( max - min ) + min)
const randomFloat = ( min, max ) => Math.random() * ( max - min ) + min

const PI = Math.PI
var _w, _h
function refreshSize() {
  _w = canvas.width = innerWidth
  _h = canvas.height = innerHeight
}; refreshSize();

addEventListener( 'resize', () => {
  refreshSize()
  init()
})

var c = canvas.getContext( '2d')

const mouse = { x: undefined, y: undefined }
canvas.addEventListener( 'mousemove', ev => {
  mouse.x = ev.x
  mouse.y = ev.y
})



class Wave {
  constructor( y, length, amplitude, color, level) {
    // u( x, t) = A * sin ( w*t + k*x + Φ )
    this.interval = 0;
    this.length = length;
    this.amplitude = amplitude
    this.y = this.yy = y
    this.level = level || 1
    this.color = color
    this.dy = 1
  }
  draw() {
    c.beginPath()
      c.moveTo( 0, this.y)
      for ( let x = 0; x < _w; x++ ) {
        c.lineTo( x,
                  this.y + Math.sin( x * this.length + this.interval ) * this.amplitude / 2 + Math.sin( x * this.length * 0.3 + this.interval * 2 ) * this.amplitude / 2
                )
      }
      c.lineTo( _w, _h) 
      c.lineTo( 0, _h) 
      c.lineTo( 0, this.y) 
      c.strokeStyle = '#372952'
      c.stroke()
      c.fillStyle = '#6d5a92'
      c.fill()
    c.closePath()
    
  }
  update() {
    this.draw()
    if ( this.y > _h + _h/3 ) {
      this.dy = -this.dy
    } else {
      this.dy += 0.03
    }
    
    this.y += this.dy
    this.interval += 0.01
  }
}






class FootPrint {
  constructor( x, y, size, obj) {
    this.x = x
    this.y = y
    this.left = true
    this.right = false
    this.period = 0
    this.size = size 
    this.rads = 0
    this.color = '#403923'

    if ( obj ) {
      this.guide = obj
      this.isAuto = false
    } else {
      this.guide =  {
        x: randomInt( -2, 2),
        y: randomInt( -2, 2)
      }
      this.isAuto = true
    }

  }
  draw() {
  //this method is just a drawing
    
    let color = this.color
    if ( this.left ) {
      c.save()
      c.translate( this.x, this.y)
      c.rotate( this.rads )
      c.save()
      c.rotate( PI/2 )
      c.translate( -this.size * 20 , 0)
      c.beginPath()
      c.ellipse( 0 + this.size * 10, 0 - this.size * 43, this.size * 4, this.size * 6, 0.3, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 + this.size , 0 - this.size * 43, this.size * 3.5, this.size * 5, 0.2, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath() 

      c.beginPath()
      c.ellipse( 0 + this.size * -7, 0 - this.size * 41, this.size * 3, this.size * 4.5, 0, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 + this.size * -12.5, 0 - this.size * 37, this.size * 2.5, this.size * 4, -0.1, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 + this.size * -17, 0 - this.size * 33, this.size * 2, this.size * 3.5, -0.2, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 
                  0, 0 - this.size * 20,
                  this.size * 15, this.size * 8,
                  -0.85, PI/2, 0, true
      )
      c.arc( 0, 0 - this.size * 20, this.size * 15, -PI/4, PI , true)
      c.bezierCurveTo(
                        0 - this.size * 15, 0 - this.size * 20,
                        0 - this.size * 7, 0 + this.size * 10 ,
                        0 - this.size * 8, 0 + this.size * 10
      )
      c.arc( 0, 0 + this.size * 10 , this.size * 8, PI , -PI/6 , true)
      c.bezierCurveTo( 
                        0, 0 ,
                        0, 0 - this.size * 7,
                        0 + this.size * 8, 0 - this.size * 17
      )
      c.fillStyle = color
      c.fill()
      c.closePath()   
      c.restore()    
      c.restore()    
      
    }
    
    if ( this.right ) {
      
      c.save()
      c.translate( this.x, this.y)
      c.rotate( this.rads )
      c.save()
      c.rotate( PI/2 )
      c.translate( this.size * 20, 0)
      c.beginPath()
      c.ellipse( 0 - this.size * 10, 0 - this.size * 43, this.size * 4, this.size * 6, -0.3, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 - this.size , 0 - this.size * 43, this.size * 3.5, this.size * 5, -0.2, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath() 

      c.beginPath()
      c.ellipse( 0 - this.size * -7, 0 - this.size * 41, this.size * 3, this.size * 4.5, 0, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 - this.size * -12.5, 0 - this.size * 37, this.size * 2.5, this.size * 4, 0.1, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()

      c.beginPath()
      c.ellipse( 0 - this.size * -17, 0 - this.size * 33, this.size * 2, this.size * 3.5, 0.2, PI*2, 0, true)
      c.fillStyle = color
      c.fill()
      c.closePath()    
      
      
      c.beginPath()
      c.ellipse( 0, 0 - this.size * 20, this.size * 15, this.size * 8, 179.85, PI*3/2, PI*2)
      c.arc( 0, 0 - this.size * 20, this.size * 15, PI*6/5, 0 )
      c.bezierCurveTo(  
                        0 + this.size * 15, 0 - this.size * 20,
                        0 + this.size * 7, 0 + this.size * 10,
                        0 + this.size * 8, 0 + this.size * 10 
      )
      c.arc( 0, 0 + this.size * 10 , this.size * 8, 0, PI*7/6 )
      c.bezierCurveTo( 
                       0, 0 ,
                       0, 0 - this.size * 7,
                       0 - this.size * 8, 0 - this.size * 17 
      )
      c.fillStyle = color
      c.fill()
      c.closePath()
      c.restore()
      c.restore()
    }

    this.left = !this.left
    this.right = !this.right
  }
  rotation () {


    if ( this.isAuto ) {

      if ( Math.random() < 0.4 ) {
        this.guide.x += randomFloat( -1, 1)
        this.guide.y += randomFloat( -1, 1)
      }

      let x = this.guide.x 
      let y = this.guide.y 
      let radians = Math.atan(y/x)
      if( this.guide.x < 0) radians += PI
      this.rads = radians

    } else {

      let x = this.guide.x - this.x
      let y = this.guide.y - this.y
      let radians = Math.atan(y/x)
      if( this.guide.x < this.x) radians += PI
      this.rads = radians

    }
  }
  move( ) {
    if ( this.isAuto ) {

      if ( this.x + Math.abs (this.guide.x) > _w ||
           this.x - Math.abs (this.guide.x) < 0) {
           this.guide.x  = -this.guide.x
      }  
      
      if ( this.y + Math.abs (this.guide.y) > _h ||
           this.y - Math.abs (this.guide.y) < 0) {
           this.guide.y  = -this.guide.y       
      } 

      this.x += this.guide.x
      this.y += this.guide.y
    } else {
      this.x = this.guide.x
      this.y = this.guide.y
    }
  }
  beforeDraw(){

    if ( this.period == 20  ) {
      this.rotation()
      this.draw( )
      this.period = 0
    } else if ( this.x == mouse.x && this.y == mouse.y) {
      this.draw( )
      this.period = 0 
    }
    this.period += 1

  }
  update( objGuia = this.velocity ) {
    if ( this.x && this.y ) this.beforeDraw()
    this.move()
  }
}

function init() {
  sand(1);
  window.wave = new Wave( _h - _h/3, 0.01, 100, '#82D0D9')
  window.imAFoot = new FootPrint( mouse.x, mouse.y, 0.5, mouse)
  window.other = new FootPrint( _w/2, _h/2, 0.5)
}
init()

// Modify the drawMoon function to draw eyes on the moon
function drawMoon(x, y, radius, color, drawEyes) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fillStyle = color;
  c.fill();
  c.closePath();

  if (drawEyes) {
    // Draw the left eye
    c.beginPath();
    c.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.2, 0, Math.PI * 2);
    c.fillStyle = 'lightblue';
    c.fill();
    c.closePath();

    // Draw the right eye
    c.beginPath();
    c.arc(x - radius * 0.4, y + radius * 0.3, radius * 0.2, 0, Math.PI * 2);
    c.fillStyle = 'lightblue';
    c.fill();
    c.closePath();

    // Draw the right eye
    c.beginPath();
    c.arc(x + radius * 0.45, y + radius * 0.4, radius * 0.2, 0, Math.PI * 2);
    c.fillStyle = 'lightblue';
    c.fill();
    c.closePath();
  }
}

function loop() {
  requestAnimationFrame(loop);
  sand(0.06);

  wave.update();
  imAFoot.update();
  other.update();

  // Draw the moon with eyes on top of everything
  drawMoon(_w - 100, 100, 30, '#c1e6e8', true);
}

// Call the loop function to start the animation
loop();

// Call the loop function to start the animation
loop();

function sand (opacity) {
  c.fillStyle = `rgba(242, 218, 189, ${opacity})`
  c.fillRect(0,0, _w, _h)
}
loop();