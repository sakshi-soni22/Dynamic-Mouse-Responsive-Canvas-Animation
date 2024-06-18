/**
 * @type HTMLCanvasElement
 */

var canvas= document.getElementById('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var mouse ={
    x:undefined,
    y:undefined
}
 
var maxRadius=40;
//var minRadius=2;  after removing mouse the radii of circles doesnt go to their original size

var colorArray=[
    '#BF247A',
    '#812B8C',
    '#2A2359',
    '#D9731A',
    '#BF3939',
];

window.addEventListener('mousemove', 
    function(event)
    {
        mouse.x=event.x;
        mouse.y=event.y;
    })

window.addEventListener('resize', 
    function()
    {
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

        init();
    })

function Circle(x, y, dx, dy, r)     
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.r=r;
    this.minRadius=r;
    this.color=colorArray[Math.floor(Math.random() * colorArray.length)];
    //floor gives the lowest whole no closest to the color

    this.draw=function()
    {
        c.beginPath();     
        c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        //c.fillStyle= colorArray[Math.floor(Math.random() * colorArray.length)]; this will
        // colors over and over again since we've called draw fn in update 
        c.fillStyle= this.color;
        c.fill();
    }
    this.update = function()
    {
        if(this.x + this.r > innerWidth || this.x - this.r < 0)
        {
            this.dx= -this.dx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0)
        {
            this.dy= -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //interaction between mouse and circles
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50)
        {
            if(this.r<maxRadius)
            {
                this.r+=1;
            }
            
        }
        else if(this.r>this.minRadius)//if just else{} this will decrease the radius and circle will diappear
        {
            this.r-=1;
        }

        this.draw();
    }
}

circleArray=[];
for(var i=0; i<600; i++)
{
    var r= Math.random()*3 +1;  // to create circles of various radii
    var x=Math.random()*(innerWidth- 2*r) + r;
    var y=Math.random()*(innerHeight- 2*r)+ r;
    var dx = (Math.random()-0.5)*2; 
    var dy = (Math.random()-0.5)*2;
    circleArray.push(new Circle(x, y, dx, dy, r))
}

function init()
{
    circleArray=[];
    for(var i=0; i<600; i++)
    {
        var r= Math.random()*3 +1;  // to create circles of various radii
        var x=Math.random()*(innerWidth- 2*r) + r;
        var y=Math.random()*(innerHeight- 2*r)+ r;
        var dx = (Math.random()-0.5)*2; 
        var dy = (Math.random()-0.5)*2;
        circleArray.push(new Circle(x, y, dx, dy, r))
    }
}
function animate()
{
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);  

    for(var i=0; i<circleArray.length; i++)
    {
        circleArray[i].update();
    }
}
init();
animate();