var mode = true;
var mic;
var volhistory = []; //mic input gets converted and is put into the array
var song;
var amp;
var button;
var v;
var slider;
var val;

function preload() {
  song = loadSound("welcome.mp3");
}

function togglemic() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(800, 800);
  button = createButton("MIC");
  button.mousePressed(togglemic);
  button = createButton("SAVE IMAGE");
  button.mousePressed(saveimage);
  intro = new Intro(); //object of Intro Function
  sound = new Sound(); //object of Sound Function
  mic = new p5.AudioIn();
  mic.start();
  slider = createSlider(1, 100, 10, 10);
  slider.position(150, 810);
  slider.style("width", "80px");
  val = slider.value();
  //create an amplitude object that will use mic as input
  amp = new p5.Amplitude();
  amp.setInput(mic);

  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function saveimage() {
  save("mySVG.svg");
}

function draw() {
  background(255, 0, 0);
  if (mode == true) {
    intro.show();
  }
  if (mode == false) {
    val = slider.value();
    sound.show();
    var vol = amp.getLevel();
    volhistory.push(vol); //puts vol value into array
    stroke(255);
    noFill();

    translate(width / 2, height / 2);
    beginShape(); //circle function
    for (var i = 0; i < 360; i++) {
      var r = map(volhistory[i] * val, 0, 1, 10, 100);
      var x = r * cos(i);
      var y = r * sin(i);
      v = vertex(x, y);
    }
    endShape();

    for (let i = 0; i < 6; i++) {
      //kaleidoScope function
      image(v, 0, -height / 2);
      // mirror the image directly next to this
      push();
      rotate(60);
      scale(-1, 1);
      image(v, 0, -height / 2);
      pop();
      // rotate before doing the next pair
      rotate(120);
    }

    if (volhistory.length > 360) {
      //remove Previous Values
      volhistory.splice(0, 1);
    }
  }
}

function keyPressed() {
  if (key == " ") {
    clear();
    mode = false;

    console.log("SPACE");
  }
}
