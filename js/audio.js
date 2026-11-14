/**
 * NASA Space Apps Challenge - Team smAsh
 * Web Audio API Sound FX Synthesizer & Speech Narration Engine
 * Fully compatible with modern Chrome, Edge, Firefox, and Safari Autoplay Policies.
 */

class SpaceAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.speechSynth = window.speechSynthesis || null;
    this.voices = [];
    this.selectedVoice = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.speechQueue = [];
    this.currentChunkIndex = 0;
    this.activeStoryId = null;
    this.activeRelic = null;
    this.onStateChangeCallback = null;

    // Load available speech voices
    if (this.speechSynth) {
      this.loadVoices();
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = () => this.loadVoices();
      }
    }

    // Attach unlock listener to resume audio context on any user interaction
    const unlockAudio = () => {
      this.init();
      ['click', 'keydown', 'touchstart'].forEach(evt => {
        document.removeEventListener(evt, unlockAudio);
      });
    };
    ['click', 'keydown', 'touchstart'].forEach(evt => {
      document.addEventListener(evt, unlockAudio, { once: true, passive: true });
    });
  }

  loadVoices() {
    if (!this.speechSynth) return;
    this.voices = this.speechSynth.getVoices();
    if (this.voices && this.voices.length > 0) {
      // Find optimal English voice
      const enVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
      this.selectedVoice = enVoices.find(v => 
        v.name.includes('Natural') || 
        v.name.includes('Google') || 
        v.name.includes('David') || 
        v.name.includes('Guy') ||
        v.name.includes('Jenny') ||
        v.name.includes('Samantha') ||
        v.name.includes('Zira')
      ) || enVoices[0] || this.voices[0];
    }
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(e => console.warn("AudioContext resume pending user gesture:", e));
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled && this.isSpeaking) {
      this.stopNarration();
    }
    return this.soundEnabled;
  }

  // Safe executor ensuring AudioContext is running before scheduling audio nodes
  executeWithAudio(fn) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().then(() => {
        try { fn(); } catch (err) { console.error("Audio execute error:", err); }
      }).catch(err => console.warn("Could not resume audio context:", err));
    } else {
      try { fn(); } catch (err) { console.error("Audio execute error:", err); }
    }
  }

  // NASA-style telemetry beep (high pitch blip)
  playTelemetryBeep() {
    this.executeWithAudio(() => {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      const freqs = [1760, 2200, 2637, 3520];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    });
  }

  // Radio squelch / mic click
  playRadioClick() {
    this.executeWithAudio(() => {
      const now = this.audioCtx.currentTime;
      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.04);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start(now);
    });
  }

  // Radar ping when selecting a relic
  playRadarPing() {
    this.executeWithAudio(() => {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  // Achievement / Badge unlock chime
  playBadgeChime() {
    this.executeWithAudio(() => {
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        const startTime = now + idx * 0.09;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    });
  }

  // Quiz wrong buzz
  playBuzz() {
    this.executeWithAudio(() => {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.1);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    });
  }

  // Register listener for UI updates (e.g. updating play/stop buttons)
  onStateChange(cb) {
    this.onStateChangeCallback = cb;
  }

  notifyStateChange() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isSpeaking: this.isSpeaking,
        isPaused: this.isPaused,
        activeStoryId: this.activeStoryId,
        activeRelic: this.activeRelic,
        chunkIndex: this.currentChunkIndex + 1,
        totalChunks: this.speechQueue.length,
        currentText: this.speechQueue[this.currentChunkIndex] || ""
      });
    }
  }

  /**
   * Split long story text into sentence chunks to prevent Chromium SpeechSynthesis freeze bug.
   */
  splitIntoChunks(text, maxChars = 160) {
    const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
    const chunks = [];
    let currentChunk = "";

    for (let s of sentences) {
      s = s.trim();
      if (!s) continue;
      if (currentChunk.length + s.length < maxChars) {
        currentChunk += (currentChunk ? " " : "") + s;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = s;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  }

  /**
   * Start storytelling narration with queue management
   */
  narrateStory(relic, onEndCallback) {
    if (!this.speechSynth) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    // If currently reading the same story and not paused, stop it
    if (this.isSpeaking && this.activeStoryId === relic.id && !this.isPaused) {
      this.stopNarration();
      return;
    }

    this.stopNarration();

    // Prepare story narrative text
    const narrativeIntro = `Transmission log: ${relic.name}. Callsign: ${relic.callsign}. Quote: ${relic.story.quote}.`;
    const chaptersText = relic.story.chapters.map(ch => `${ch.heading}. ${ch.text}`).join(" ");
    const fullStory = `${narrativeIntro} ${chaptersText}`;

    // Split into safe chunks
    this.speechQueue = this.splitIntoChunks(fullStory, 160);
    this.currentChunkIndex = 0;
    this.activeStoryId = relic.id;
    this.activeRelic = relic;
    this.isSpeaking = true;
    this.isPaused = false;
    this.onStoryEnd = onEndCallback;

    this.playRadioClick();
    this.notifyStateChange();
    this.speakNextChunk();
  }

  speakNextChunk() {
    if (!this.isSpeaking || this.isPaused || !this.speechSynth) return;

    if (this.currentChunkIndex >= this.speechQueue.length) {
      this.stopNarration();
      if (this.onStoryEnd) this.onStoryEnd();
      return;
    }

    const chunk = this.speechQueue[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (!this.selectedVoice) {
      this.loadVoices();
    }
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        this.notifyStateChange();
        setTimeout(() => this.speakNextChunk(), 120);
      }
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error:", e);
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        this.notifyStateChange();
        this.speakNextChunk();
      }
    };

    if (this.speechSynth.paused) {
      this.speechSynth.resume();
    }

    this.speechSynth.speak(utterance);
    this.notifyStateChange();
  }

  togglePause() {
    if (!this.isSpeaking) return;

    if (!this.isPaused) {
      // Pause
      this.isPaused = true;
      if (this.speechSynth) this.speechSynth.cancel();
      this.notifyStateChange();
    } else {
      // Resume
      this.isPaused = false;
      this.speakNextChunk();
    }
  }

  stopNarration() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.activeStoryId = null;
    this.activeRelic = null;
    this.speechQueue = [];
    this.currentChunkIndex = 0;
    this.playRadioClick();
    this.notifyStateChange();
  }

  // Quick Comms Check to test both audio synthesizer and speech
  testComms() {
    this.playRadioClick();
    setTimeout(() => this.playTelemetryBeep(), 100);
    setTimeout(() => {
      if (this.speechSynth) {
        this.speechSynth.cancel();
        const utt = new SpeechSynthesisUtterance("Comms check online. RelicVoyager systems nominal.");
        utt.rate = 1.0;
        if (!this.selectedVoice) this.loadVoices();
        if (this.selectedVoice) utt.voice = this.selectedVoice;
        this.speechSynth.speak(utt);
      }
    }, 300);
  }
}

// Attach globally to window
window.spaceAudio = new SpaceAudioEngine();
var spaceAudio = window.spaceAudio;
