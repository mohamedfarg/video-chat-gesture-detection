
// var speechRecognition = window.webkitSpeechRecognition

// var recognition = new speechRecognition()

// var textbox = $("#textbox")

// var instructions = $("#instructions")

// var content = ''

// recognition.continuous = true

// // recognition is started

// recognition.onstart = function() {

//  instructions.text("Voice Recognition is On")

// }

// recognition.onspeechend = function() {

//  instructions.text("No Activity")

// }

// recognition.onerror = function() {

//  instruction.text("Try Again")

// }

// recognition.onresult = function(event) {

//  var current = event.resultIndex;

//  var transcript = event.results[current][0].transcript



//  content += transcript

//  textbox.val(content)

// }

// $("#start-btn").click(function(event) {

//  recognition.start()

// })
// $("#abort-btn").click(function(event) {

//     recognition.abort();
//     console.log('Speech recognition aborted.');

// })

// textbox.on('input', function() {

//  content = $(this).val()

// })

var speechRecognition = window.webkitSpeechRecognition

var recognition = new speechRecognition()

var textbox = document.getElementById('textbox')
var instructions = document.getElementById('instructions')
var start_btn = document.getElementById('start-btn')
var abort_btn = document.getElementById('abort-btn')



var content = ''

recognition.continuous = true

// recognition is started

recognition.onsoundstart = () => {
    console.log('Some sound is being received');

 instructions.innerText ="Voice Recognition is On"

}

recognition.addEventListener('speechend', () => {
    console.log('Speech has stopped being detected');

 instructions.innerText = "No Activity"

});

recognition.addEventListener('onerror', function() {

 instruction.innerText = "Try Again"

});

recognition.addEventListener('result', (event) => {

 var current = event.resultIndex;

 var transcript = event.results[current][0].transcript



 content += transcript

 textbox.innerText = content

});

start_btn.onclick = () => {
    recognition.start();
    console.log('Ready to receive a color command.');
  }

abort_btn.onclick = () => {
  recognition.abort();
  console.log('Speech recognition aborted.');
}

textbox.addEventListener('input', function() {

 content = textbox.val

})