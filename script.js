// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
//codepen.io/SteveJRobertson/pen/emGWaR

const synth = window.speechSynthesis;

new Vue({
  el: '#text2speech',
  template: '#text2speechTemplate',
  data: function () {
    return {
      voices: [],
      voice: null,
      rate: 10,
      pitch: 1,
      text: '',
      notFound: false,
    };
  },
  mounted: function () {
    setTimeout(() => {
      if (synth) {
        this.populateVoiceList();
      } else {
        this.notFound = true;
        alert(
          `Your browser does not support speech synthesis.\nWe recommend you use Google Chrome.`
        );
      }
    }, 500);
  },
  methods: {
    populateVoiceList() {
      voices = synth.getVoices();
      this.voices = voices;
      this.voice = this.voices.find((v) => v.default);
    },

    handleSpeak() {
      if (this.notFound) {
        alert(
          `Your browser does not support speech synthesis.\nWe recommend you use Google Chrome.`
        );
        return;
      }

      if (!this.text) {
        alert('Write some text to read.');
        return;
      }

      const utterThis = new SpeechSynthesisUtterance(this.text);
      utterThis.pitch = this.pitch;
      utterThis.rate = this.rate;
      utterThis.voice = this.voice;

      synth.speak(utterThis);
    },
  },
});
