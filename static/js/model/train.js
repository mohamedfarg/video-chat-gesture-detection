
let mobilenet;
let classifier;
let video;
let label = 'loading model';
let trainButton = document.getElementById('train');
let speakButton = document.getElementById('speak');
let AddClassButton = document.getElementById('Add');
let saveButton = document.getElementById('save');
let class_title = document.getElementById('class_title');
var chat = document.getElementById('model_result');
var my_console = document.getElementById('console');
var txt;

function setup() {

createCanvas(540, 380);
// Create the video
    createCanvas(540, 380);
    // Create the video
    video = createCapture(VIDEO);
    video.size(540, 380)
    video.hide();
    model = ml5.featureExtractor('MobileNet',modelReady);
    classifier = model.classification(video,videoReady);

   

 // to add class in classifier model
  AddClassButton.addEventListener('click',function() {
    
    for(let i =0 ; i<10;i++){

      txt = class_title.value;
      console.log(txt);
      
      my_console.value = my_console.value + txt + '\r\n';
      // console.log(txt);
      classifier.addImage(txt);
    }
    
  });

// train classifier
  trainButton.addEventListener('click',function() {
    classifier.train(whileTraining);
  });

 // save classifier
  saveButton.addEventListener('click',function() {
    classifier.save();
  });
}

function modelReady() {
    console.log('Model is ready!!!');
  }
  
  function videoReady() {
    console.log('Video is ready!!!');
  }
  
  function whileTraining(loss) {
    if (loss == null) {
      console.log('Training Complete');
      my_console.innerText=my_console.value = my_console.value +'Training Complete'  + '\r\n';
      get_predections();
      classifier.classify(gotResults);
    } else {
        my_console.innerText=my_console.value = my_console.value+ loss  + '\r\n';
    }
  }
  
  function gotResults(error, result) {
    if (error) {
   

      console.error(error);
    } else {
      // label = result;
      label = result[0].label;
      chat.value = chat.value + label  + ' ';
    //   const sasa = setInterval(function() {
        
        
    //     classifier.classify(gotResults);
    //       }, 10000);
    //   // classifier.classify(gotResults);
    // }
  }


}
function get_predections(){
  const sasa = setInterval(function() {
    classifier.classify(gotResults);
        
    
      }, 10000);
}