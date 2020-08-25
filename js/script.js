    function runSpeechRecognition() {
        var output = document.getElementById("myText");
        var show = document.getElementById("show");
        var action = document.getElementById("action");
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // This runs when the speech recognition service starts
        recognition.onstart = function () {
            action.innerHTML = "<small>listening, please speak...</small>";
        };

        recognition.onspeechend = function () {
            action.innerHTML = "<small>stopped listening, hope you are done...</small>";
            recognition.stop();
        }

        // This runs when the speech recognition service returns result
        recognition.onresult = function (event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;
            show.innerHTML ="<strong>Text show here:</strong>"
            show.classList.remove("hide");
             output.innerHTML =  transcript;
            output.classList.remove("hide");
            console.log(transcript)
            console.log(typeof transcript)
        //     c=parseInt(transcript)
        //     console.log(c)
        //    console.log(typeof c)
        //    output.innerHTML=c+5;
        };

        // start recognition
        recognition.start();
    }

    //  voice
    function checkCompablity() {
        if (!('speechSynthesis' in window)) {
            alert('your browser not suported');
        }
    };
    checkCompablity();
    var voiceOptions = document.getElementById('voiceOptions');
    // var volumeSlider = document.getElementById('volumeSlider');
    // var rateSlider = document.getElementById('rateSlider');
    // var pitchSlider = document.getElementById('pitchSlider');
    var myText = document.getElementById('myText');
    var voiceMap = [];
    function loadVoices() {
        var voices = speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        var voice = voices[i];
        var option = document.createElement('option');
        option.value = voice.name;
        option.innerHTML = voice.name;
        voiceOptions.appendChild(option);
        voiceMap[voice.name] = voice;
    };
    };
    window.speechSynthesis.onvoiceschanged= function (e) {
        loadVoices();
    };
    function speak() {
        var msg = new SpeechSynthesisUtterance();
        // msg.volume = volumeSlider.value;
        msg.voice = voiceMap[voiceOptions.value];
        // msg.rate = rateSlider.value;
        // msg.pitch = pitchSlider.value;
        msg.text = myText.textContent;
        window.speechSynthesis.speak(msg);
    };