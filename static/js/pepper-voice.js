// Pepper Voice - Soft girl voice for children
const PepperVoice = {
    speak: function(text, callback) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        utterance.pitch = 1.4;
        utterance.volume = 1;
        
        const voices = window.speechSynthesis.getVoices();
        // Find a soft girl voice
        const softVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google UK English Female')) ||
                          voices.find(v => v.lang === 'en-US' && v.name.includes('Samantha')) ||
                          voices.find(v => v.lang === 'en-US' && v.name.includes('Victoria')) ||
                          voices.find(v => v.lang === 'en-US' && v.name.includes('Karen')) ||
                          voices.find(v => v.lang === 'en-US');
        
        if (softVoice) utterance.voice = softVoice;
        
        if (callback) utterance.onend = callback;
        window.speechSynthesis.speak(utterance);
    },
    
    correct: function() { this.speak("Great job! That's correct! 🎉"); },
    wrong: function() { this.speak("Try again! You can do it! 💪"); },
    levelUp: function(level) { this.speak(`Congratulations! You reached level ${level}! 🌟`); },
    welcome: function(name) { this.speak(`Welcome ${name}! Let's play and learn together! 💕`); }
};

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
}
