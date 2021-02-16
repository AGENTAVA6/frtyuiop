prediction_1 ="";
prediction_2 = "";
var synth = window.speechSynthesis;
speak_data = "Welcome!!!.     to     the    hand     gesture     Web    app.        Here      you     can     show     the       following     emojies    and     the     computer     will     automaticly      recognise     it. There   are  three  types    of     emojies     the    computer    can reconginise. Good     ,    bad    and   victory.  have     a       good        time       playing       with       it ";
var utterthis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);
Webcam.set({
    height: 300,
    width: 350,
    image_quality: 'jpg'
})
camera = document.getElementById("camera")
Webcam.attach('#camera')
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">'
    })
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ccKAwSUfQ/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded!")
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1 ;
    speak_data_2 = "The second  prediction is " + prediction_2 ;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
 if(error){
console.error(error);
 }
 else{
     console.log(results);
     document.getElementById("result_emotion_name").innerHTML = results[0].label;
     document.getElementById("result_emotion_name2").innerHTML = results[1].label;
     prediction_1 = results[0].label;
     prediction_2 = results[1].label
     speak();
 }
 
 if(results[0].label == "victiory"){
  document.getElementById("update_emoji").innerHTML = "&#9996;";
}
if(results[0].label == "bad"){
  document.getElementById("update_emoji").innerHTML = "&#128078;";
}
if(results[0].label == "good"){
  document.getElementById("update_emoji").innerHTML = "&#128077;";
}
if(results[1].label == "victiory"){
  document.getElementById("update_emoji2").innerHTML = "&#9996;";
}
if(results[1].label == "bad"){
  document.getElementById("update_emoji2").innerHTML = "&#128078;";
}
if(results[1].label == "good"){
  document.getElementById("update_emoji2").innerHTML = "&#128077;";
}
}