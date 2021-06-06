prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera')

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">'
    })
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EDZmRhdCC/model.json', modelLoaded)
function modelLoaded() {
    console.log("model loaded")
}
function speak() {
    synth = window.SpeechSynthesis;
    speakdata1 = "The First Prediction Is " + prediction1;
    speakdata2 = "The Second Prediction Is " + prediction2;
    utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis)
}

function check() {
    img = document.getElementById('captured_image')
    console.log("image_captured");
    classifier.classify(img, gotresult)
    console.log("model executed");
}

function gotresult(result, error) {
    if (error) {
        console.error(error)
    }
    else {


        console.log(result);

        prediction1 = result[0].label;
        prediction2 = result[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        document.getElementById("result_emotion_name2").innerHTML = prediction2;

        if (prediction1 == "happy") {
            document.getElementById("updatehand").innerHTML = "&#128522"
        }
        if (prediction1 == "sad") {
            document.getElementById("updatehand").innerHTML = "&#128532"
        }
        if (prediction1 == "angry") {
            document.getElementById("updatehand").innerHTML = "&#128548"
        }
        if (prediction1 == "crying") {
            document.getElementById("updatehand").innerHTML = "&#128557"
        }


        if (prediction2 == "happy") {
            document.getElementById("updatehand2").innerHTML = "&#128522"
        }
        if (prediction2 == "sad") {
            document.getElementById("updatehand2").innerHTML = "&#128532"
        }
        if (prediction2 == "angry") {
            document.getElementById("updatehand2").innerHTML = "&#128548"
        }
        if (prediction2 == "crying") {
            document.getElementById("updatehand2").innerHTML = "&#128557"
        }
        speak();
    }
    
}

