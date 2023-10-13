const textarea = document.querySelector("textarea");
let hosted_model = document.getElementById('hostedmodel');
let sub_btn = document.getElementById('mlink');
var sttr = "";
var link;
// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let vid;

let title = document.getElementById('title');
sub_btn.addEventListener('click', () =>{
    link = hosted_model.value 
    sasa()
});
function sasa(){
    console.log("model loaaded");
// console.log(hosted_model.value);
    if(hosted_model.value != ""){
        // classifier.load('https://mohamedfarg.github.io/sasamodel/model.json',loooods);

        classifier.load(link,loooods);
    }
}
function loooods(){
    const sasa = setInterval(function() {
        classifier.classify(result);
            
        
          }, 5000);
}
function wileTraining(loss){
    if(loss == null){
        console.log("taring completed");
        classifier.classify(result);
    }else{

        console.log(loss);
    }
}
function result(error,data){
    if(error){

        console.error(error)
    }else{
        
        // method to be executed;
        label = data[0];
        textarea.innerHTML = sttr;
        sttr += label['label']+ " "
        console.log(sttr)
   
        // textSize(16);
      
        // text(label[0],10,height-10);
        
        
    }
}
function Ready(){
    console.log("ready");
}

function setup() {
    // createCanvas(400, 400);
    createCanvas(540, 380);
    // Create the video
    video = createCapture(VIDEO);
    video.size(540, 380)
    video.hide();
    model = ml5.featureExtractor('MobileNet',sasa);
    classifier = model.classification(video,Ready);

   
 
}