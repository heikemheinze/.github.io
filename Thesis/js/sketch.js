let style;
let video;
let startStopBtn;
let isTransferring = false;
let resultImg;

function setup() {
  createCanvas(320, 240).parent('canvas-container');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // The button to start and stop the transfer process
  startStopBtn = select('#start-stop');
  startStopBtn.mousePressed(startStop);
  startStopBtn.hide();

  // Create a new style transfer method with a defined style.
  // We give the video as the second argument
  // style = ml5.styleTransfer('models/udnie', video, modelLoaded);
  style = ml5.styleTransfer('models/wave', video, modelLoaded);
}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransferring & resultImg.width > 0) {
    // console.log(resultImg)
    image(resultImg, 0, 0, 320, 240);
  } else {
    image(video, 0, 0, 320, 240);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  console.log('Model Loaded');
  startStopBtn.show();
}

// Start and stop the transfer process
function startStop() {
  if (isTransferring) {
    select('#start-stop').html('Start');
  } else {
    select('#start-stop').html('Stop');
    // Make a transfer using the video
    style.transfer(gotResult);
  }
  isTransferring = !isTransferring;
}

// When we get the results, update the result image src
function gotResult(err, img) {
  if(err){
    console.error(err);
    return;
  }
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    style.transfer(gotResult);
  }
}
