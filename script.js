// Oggetto per i contenuti dei titoli delle finestre About in diverse lingue
// Questo oggetto è stato mantenuto solo per i titoli dei popup per chiarezza.
// I testi lunghi dei popup sono ora gestiti direttamente nell'HTML tramite data-lang.
const aboutContent = {
    'it': {
        'aboutMeTitle': 'Chi sono',
        'aboutAiTitle': 'Riguardo l\'AI'
    },
    'en': {
        'aboutMeTitle': 'About Me',
        'aboutAiTitle': 'About AI'
    }
};

let genesisVoice = null;
let currentLanguage = 'it'; // Default language is Italian
let synth = window.speechSynthesis;
let recognition = null; // Initialize recognition to null

// Helper function to speak text
function speak(text) {
    if (synth.speaking) {
        synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = genesisVoice;
    utterance.lang = currentLanguage === 'it' ? 'it-IT' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    synth.speak(utterance);
}

// Function to set the Genesis voice
function setGenesisVoice() {
    const voices = synth.getVoices();
    let preferredVoiceName = currentLanguage === 'it' ? 'Google italiano' : 'Google US English';

    genesisVoice = voices.find(voice => voice.name.includes(preferredVoiceName) || voice.lang.startsWith(currentLanguage));

    if (!genesisVoice) {
        // Fallback to any voice if preferred not found, prioritize current language
        genesisVoice = voices.find(voice => voice.lang.startsWith(currentLanguage)) || voices[0];
    }
    console.log('Genesis voice set to:', genesisVoice ? genesisVoice.name : 'None (fallback to default)');
}

// Event listener for voices changed
synth.onvoiceschanged = () => {
    console.log('Evento Voices changed rilevato.');
    setGenesisVoice();
};

// Function to update language-dependent display elements
function updateLanguageDisplay(lang) {
    // Update main controls
    document.querySelector('.mode-select label').textContent = lang === 'it' ? 'Modalità' : 'Mode';
    document.getElementById('mode').querySelector('option[value="Creative"]').textContent = lang === 'it' ? 'Creativa' : 'Creative';
    document.getElementById('mode').querySelector('option[value="Logical"]').textContent = lang === 'it' ? 'Logica' : 'Logical';
    document.getElementById('mode').querySelector('option[value="Analytical"]').textContent = lang === 'it' ? 'Analitica' : 'Analytical';
    document.getElementById('user-input').placeholder = lang === 'it' ? 'Invia un messaggio...' : 'Send a message...';

    // Update About buttons text using data-lang attribute
    document.getElementById('about-me-btn').textContent = document.getElementById('about-me-btn').dataset[lang];
    document.getElementById('about-ai-btn').textContent = document.getElementById('about-ai-btn').dataset[lang];

    // Update popup titles (using the aboutContent object)
    document.getElementById('about-me-popup-title').textContent = aboutContent[lang].aboutMeTitle;
    document.getElementById('about-ai-popup-title').textContent = aboutContent[lang].aboutAiTitle;

    // Show/hide the correct language content for About Me popup texts
    // Questa parte si basa sul nuovo markup HTML con gli <span> specifici per lingua
    document.getElementById('about-me-popup-text-it').style.display = (lang === 'it' ? 'block' : 'none');
    document.getElementById('about-me-popup-text-en').style.display = (lang === 'en' ? 'block' : 'none');

    // Show/hide the correct language content for About AI popup texts
    // Questa parte si basa sul nuovo markup HTML con gli <span> specifici per lingua
    document.getElementById('about-ai-popup-text-it').style.display = (lang === 'it' ? 'block' : 'none');
    document.getElementById('about-ai-popup-text-en').style.display = (lang === 'en' ? 'block' : 'none');

    // Update language toggle labels
    document.querySelector('.lang-label[data-lang="it"]').classList.toggle('active', lang === 'it');
    document.querySelector('.lang-label[data-lang="en"]').classList.toggle('active', lang === 'en');
    document.getElementById('language-toggle').classList.toggle('active', lang === 'en');
}

// ... Mantieni il resto del tuo script.js come inviato l'ultima volta,
// inclusa la funzione displayMessage, sendQuery, e tutta la logica della Matrix.

// L'unica modifica nella funzione sendQuery riguarda il testo di caricamento:
// Trova questa riga:
// const loadingMessageText = 'Genesis AI sta pensando...'; // o il testo originale
// E assicurati che sia così:
// const loadingMessageText = currentLanguage === 'it' ? 'Genesis AI sta pensando...' : 'Genesis AI is thinking...';


// Il resto del tuo script.js non deve essere modificato da queste istruzioni.
// A partire dalla funzione displayMessage, fino alla chiusura del DOMContentLoaded listener.