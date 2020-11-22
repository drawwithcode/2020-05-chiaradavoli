let socket = io();
let myColor = "white";
//img
let myImage;
//texts
let myMainText = "WELCOME TO THE LABYRINTH";
let myOtherText = "try to exit the labyrinth before another player does";
let myOtherOtherText = "drag the mouse to create a path";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);
  push();
  fill("black");
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height / 10 * 9, width, 50);
  textFont("Goldman")
  textSize(25);
  textAlign(CENTER);
  fill(newPlayerColor);
  text("New player joined: " + newPlayerColor, width / 2, height / 10 * 9);
  pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id);
}

function preload() {
    myImage = loadImage("./assets/images/labirinto.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  background("black");

}

function drawOtherMouse(data) {
  push();
  stroke(data.color);
  strokeWeight(5);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}


function draw() {
  imageMode(CENTER);
  image(myImage, width / 2, height / 2, myImage.width / 1.8, myImage.height / 1.8);

  //main
  push();
  fill("white");
  noStroke();
  textSize(30);
  textFont("Goldman");
  textAlign(CENTER);
  text(myMainText, width / 2, 100);
  pop();

  //text
  push();
  fill("white");
  noStroke();
  textSize(15);
  textFont("Goldman");
  textAlign(CENTER);
  text(myOtherText, width / 2, 150);
  pop();

  //text 2
  push();
  fill("white");
  noStroke();
  textSize(15);
  textFont("Goldman");
  textAlign(CENTER);
  text(myOtherOtherText, width / 2, height / 10 * 8.3);
  pop();
}

function mouseDragged() {

  push();
  stroke(myColor);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();

  var message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color: myColor,
  };
  //sent to the server
  socket.emit("mouse", message);
}
