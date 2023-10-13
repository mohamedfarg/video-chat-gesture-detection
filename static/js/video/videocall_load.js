// // const textarea = document.querySelector("textarea");
// // let hosted_model = document.getElementById('hostedmodel');
// // let sub_btn = document.getElementById('mlink');
// var sttr = "";
// var link;
// // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier;

// // A variable to hold the image we want to classify
// let vid;

// // let title = document.getElementById('title');
// // sub_btn.addEventListener('click', () =>{
// //     link = hosted_model.value 
// //     sasa()
// // });
// function sasa(){
//     console.log("model loaaded");
//     classifier.load('https://mohamedfarg.github.io/sasamodel/model.json',loooods);
// // console.log(hosted_model.value);
//     // if(hosted_model.value != ""){

//     //     classifier.load(link,loooods);
//     // }
// }
// function loooods(){
//     console.log("got")
//     // const sasa = setInterval(function() {
//     //     classifier.classify(result);
            
        
//     //       }, 10000);
// }
// function wileTraining(loss){
//     if(loss == null){
//         console.log("taring completed");
//         classifier.classify(result);
//     }else{

//         console.log(loss);
//     }
// }
// function result(error,data){
//     if(error){

//         console.error(error)
//     }else{
        
//         // method to be executed;
//         label = data[0];
//         textarea.innerHTML = sttr;
//         sttr += label['label']+ " "
//         console.log(sttr)
   
//         // textSize(16);
      
//         // text(label[0],10,height-10);
        
        
//     }
// }
// function Ready(){
//     console.log("ready");
// }

// function setup() {
//     // createCanvas(400, 400);
//     createCanvas(540, 380);
//     // Create the video
//     video = createCapture(localVideo.srcObject);
//     video.size(540, 380)
//     video.hide();
//     model = ml5.featureExtractor('MobileNet',sasa);
//     classifier = model.classification(video,Ready);

   
 
// }
// Save/Load Model
// A Beginner's Guide to Machine Learning with ml5.js
// The Coding Train / Daniel Shiffman
// https://youtu.be/eeO-rWYFuG0
// https://thecodingtrain.com/learning/ml5/4.1-ml5-save-load-model.html
// https://editor.p5js.org/codingtrain/sketches/1g9C6OKX

let mobilenet;
let classifier;
let video;
let label = 'loading model';
let happyButton;
let sadButton;
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
  // classifier.load('model.json', customModelReady);
}

// function customModelReady() {
//   console.log('Custom Model is ready!!!');
//   label = 'model ready';
//   classifier.classify(gotResults);
// }

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
//   createCanvas(320, 270);
createCanvas(480, 120);
let constraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    },
    optional: [{ maxFrameRate: 10 }]
  },
  audio: true
};
createCapture(constraints, function(stream) {
  console.log(stream);
});

//   background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

 
}

// function draw() {
//   background(0);
//   image(video, 0, 0, 320, 240);
//   fill(255);
//   textSize(16);
//   text(label, 10, height - 10);
// }

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}
