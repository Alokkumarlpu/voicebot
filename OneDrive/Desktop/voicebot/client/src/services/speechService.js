// Speech Recognition Service using Web Speech API
class SpeechService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.setupRecognition();
  }

  setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
  }

  startListening(language = 'hi') {
    return new Promise((resolve, reject) => {
      let transcript = '';

      this.recognition.lang = language === 'hi' ? 'hi-IN' : 
                              language === 'ta' ? 'ta-IN' :
                              language === 'te' ? 'te-IN' :
                              'en-US';

      this.recognition.onstart = () => {
        transcript = '';
      };

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
      };

      this.recognition.onend = () => {
        resolve(transcript);
      };

      this.recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.start();
    });
  }

  stopListening() {
    this.recognition.stop();
  }

  speak(text, language = 'hi') {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' :
                       language === 'ta' ? 'ta-IN' :
                       language === 'te' ? 'te-IN' :
                       'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => {
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const speechService = new SpeechService();
