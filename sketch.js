//Create variables here
var dog ,dogimg1,dogimg2
var foodStock,foodS
var database
function preload()
{
 
  //load images here
  dogimg1=loadImage("dogimg.png")
  dogimg2=loadImage("dogimg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  foodStock.set(20)
  dog=createSprite(250,350,10,60)
  dog.addImage(dogimg1)
  dog.scale=0.2

  
}


function draw() {  
  background(46,139,87)
  if(foodS!==undefined){
  textSize(20)
  fill("white")
  text("Note:press UP_ARROW to feed dog",50,50)
  text("food: "+foodS,150,150)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogimg2)
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimg1)
  }
  if(foodS===0){
    foodS=20
  }
  drawSprites();
  }
  
  
  //add styles here

}

function writeStock(x){
  if(x<=0){
  x=0
  }  
  else{
    x= x-1
  }
  database.ref("/").update({
    food:x
  })
  

  
}
function readStock(data){
    foodS = data.val();
  }

