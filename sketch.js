/* Kripanshu Bhargava kxb162030
 Maze generation
 Algorithm :
Recursive backtracker :
The depth-first search algorithm of maze generation is frequently implemented using backtracking:

1. Make the initial cell the current cell and mark it as visited
2.  While there are unvisited cells
 1. If the current cell has any neighbours which have not been visited
 a) Choose randomly one of the unvisited neighbours
  b) Push the current cell to the stack
  c) Remove the wall between the current cell and the chosen cell
  d) Make the chosen cell the current cell and mark it as visited
2. Else if stack is not empty
  a) Pop a cell from the stack
  b) Make it the current cell
*/

var col,row;
var s=80;
var path=[];
var current ;
var canvasweidth=800;
var canvasheight=800;
var image1;
var player;
var stack=[];
var neighnborsCount;
const COLOR_START   = 'red';
const COLOR_FINISH  = 'blue';

// states
const STATES = {
  SELECT_START : 0,
  SELECT_FINISH: 1,
  SOLVE        : 2
};
var state;

// positions
var current;
var start;
var finish;
/*function preload()
{
  image1= loadImage("mazeback.jpg");
  player=loadImage("player.jpg");

}*/


function setup() {
  createCanvas(canvasweidth,canvasheight);
  col=floor(width/s);
  row=floor(height/s);

  for(var j=0; j< row; j++)
  {
    for(var i=0; i<col; i++) {
    var cell = new Cell(i,j);
    path.push(cell);
    }

  }
  current=path[0];
  frameRate(14);
}

function draw() {


  background(10);
//  image(image1,0,0);

  for(var i=0;i<path.length; i++)
  {
    path[i].show();
  }
  current.visited=true;

  var next = current.randomNeighbors();
  if(next)
  {
    next.visited=true;

    if(neighborsCount>1)
  {  stack.push(current);}

    removeBoundries(current,next);
    current=next;
  }
  else if(stack.length>0)
  {

    var cell= stack.pop();
    current = cell;


  }
}


function Cell(i,j)
{
  this.i=i;
  this.j=j;
  this.boundries=[true,true,true,true]; // top right bottom left
  this.visited=false;
//this.check=false;

/*this.playerrun = function()
 {
   var x = this.i*s;
   var y=this.j*s;
   noStroke();
   rect(x,y,s,s);
   image(player,0,0);

 } */

  this.randomNeighbors = function()
{
  var topcheck = false;
var rightcheck =false;
var bottomcheck=false;
var leftcheck=false;


  var neighbors=[];


 if(i<0 || (j-1)<0 || i>col-1 || (j-1)> row-1)
  {
topcheck=false;
  }
  else{
    var top= path[(i)+(j-1)*col];
    topcheck=true;
  }
 if((i+1)<0 || j<0 || (i+1)>col-1 || j> row-1)
  {
rightcheck=false;
  }
 else
 {
   rightcheck=true;
   var right= path[(i+1)+(j) *col];
 }
  if(i<0 || (j+1)<0 || i>col-1 || (j+1)> row-1)
  {
bottomcheck=false;
  }
  else
  {
    bottomcheck=true;
    var bottom= path[(i)+(j+1)*col];
  }
 if((i-1)<0 || j<0 || (i-1)>col-1 || j> row-1)
  {
leftcheck=false;
  }
  else
  {
    leftcheck=true;
    var left=path[(i-1)+(j)*col];
  }

  if(top && topcheck && !top.visited)
  {
    neighbors.push(top);
  }
  if(right && rightcheck && !right.visited)
  {
    neighbors.push(right);
  }
  if(bottom && bottomcheck && !bottom.visited)
  {
    neighbors.push(bottom);
  }
  if(left && leftcheck && !left.visited)
  {
    neighbors.push(left);
  }

  neighborsCount=neighbors.length;

  if( neighbors.length>0)
  {
    var p= floor(random(0,neighbors.length));
    return neighbors[p];

  }
  else
  {
    return false;
  }

}
  this.show = function()
  {
    var x=this.i*s;
    var y=this.j*s;
    stroke(255);
    noFill();
    if(this.boundries[0]){
  line(x,y,x+s,y);
    }//top
     if(this.boundries[1]){
 line(x+s,y,x+s,y+s);
   }//right
    if(this.boundries[2]){
  line(x+s,y+s,x,y+s);}
   //bottom
    if(this.boundries[3]){
   line(x,y+s,x,y);
    }//left

    if(this.visited)
    {
      noStroke();
      fill(0,0,204,100);
      rect(x,y,s,s);
    }
  }


}



function removeBoundries(a,b)
{
  var rowpart=a.i-b.i;

  if(rowpart == 1)
  {

    a.boundries[3]=false;
    b.boundries[1]=false;

  }
  else  if(rowpart == -1)
  {
    a.boundries[1]=false;
    b.boundries[3]=false;

  }

  var colpart = a.j-b.j;
  if(colpart == 1)
  {
    a.boundries[0]=false;
    b.boundries[2]=false;

  }
  else  if(colpart == -1)
  {
    a.boundries[2]=false;
    b.boundries[0]=false;

  }


}
