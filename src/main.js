import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    country: 'belarus', // set country
    appTitle: '', // set app title, default COVID-19 {country}
    colorRed: '', // override red color, default #f00
    colorGreen: '', // override green color, default #0f0
    colorBlack: '', // override black color, default #010101
    colorWhite: '', // override white color, default #fff
		customStyleClass: '', // throw custom styles, possibility to override styles, just increase specificity
  }
});

export default app;
