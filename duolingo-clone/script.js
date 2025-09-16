// Function to speak text (Speech Synthesis)
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; // Language of the voice
  speech.volume = 1;     // Volume level (0 to 1)
  speech.rate = 1;       // Rate of speech (normal speed)
  speech.pitch = 1;      // Pitch of the voice (normal pitch)
  speechSynthesis.speak(speech);
}

// Check if the browser supports Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  // Set up Speech Recognition
  recognition.lang = 'en-US'; // Language
  recognition.interimResults = false; // Whether intermediate results are shown
  recognition.maxAlternatives = 1;  // Max alternatives

  // Start recognition on button click
  document.getElementById("start").addEventListener("click", () => {
    recognition.start(); // Start listening for speech
    speakText("Listening for your command...");
  });

  // When speech is recognized
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log('Recognized Speech:', transcript);

    // Respond based on what the user said
    if (transcript.toLowerCase().includes('start learning')) {
      speakText('Starting your learning journey!');
      window.location.href = 'course.html'; // Redirect to courses page
    } else if (transcript.toLowerCase().includes('profile')) {
      speakText('Redirecting to your profile.');
      window.location.href = 'profile.html'; // Redirect to profile page
    } else {
      speakText('Sorry, I didn\'t understand that. Please try again.');
    }
  };

  recognition.onerror = function(event) {
    speakText('Sorry, I couldn\'t hear you. Please try again.');
  };
} else {
  console.log("Speech Recognition not supported in this browser.");
}
