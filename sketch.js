//Create variables here
var dog,dogImg,happyDogImg,database,food,foodStock,lastFed,fedTime,feed,addFood,foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 700);
  database = firebase.database();

  foodObj = new Food () ;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(800,200,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton ("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("blue");
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

fill("black");
textSize(20);
if(lastFed >= 12) {
  text("Last Feed : " + lastFed % 12 + "PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}

drawSprites();
}

//function to read food Stock
function readStock(data){
food=data.val();
foodObj.updateFoodStock(food);
}


//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDogImg);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
 Food:foodObj.getFoodStock(),
 FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
food++;
database.ref('/').update({
 Food:food
})
}

  
  



