<script>
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import ButtonInfo from "./ButtonInfo.svelte";
  import ButtonToggleModal from "./ButtonToggleModal.svelte";
  import Main from "./Main.svelte";
  import Modal from "./Modal.svelte";
  import Tooltip from "./Tooltip.svelte";
  import { translations } from "./translations.js";
  import { getLang } from './utils.js'

  export let country;
  export let appTitle;
  export let colorBlack;
  export let colorRed;
  export let colorGreen;
  export let colorWhite;
	export let customStyleClass = '';

  // API provider - https://covid19api.com/
  const apiUrl = "https://api.covid19api.com/dayone/country";
  const lang = getLang();
  const t = translations[lang];
  const timeOfUpdate = 50000;
  let stats;
  let allData = [];
  let statsPrev = {};
  let timeoutID;

  const getStat = async param => {
    const covidDataKey = 'covidData';
    const timeStampKey = 'covidDataUpdateDate';
    const covidData = sessionStorage.getItem(covidDataKey);
    const updateDate = sessionStorage.getItem(timeStampKey);
    const updateDay = updateDate && (new Date(updateDate)).getDay();
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    if (covidData && (updateDay === currentDay)) {
      return JSON.parse(covidData);
    }
    const res = await fetch(`${apiUrl}/${param}`);
    const body = await res.json();

    if (res.ok) {
      sessionStorage.setItem(covidDataKey, JSON.stringify(body))
      sessionStorage.setItem(timeStampKey, currentDate);
      return body;
    } else {
      throw new Error(body);
    }
  };

  beforeUpdate(() => {
    window.clearTimeout(timeoutID);
    let root = document.documentElement;
    if (colorBlack) {
      root.style.setProperty("--black", colorBlack);
    }
    if (colorRed) {
      root.style.setProperty("--red", colorRed);
    }
    if (colorGreen) {
      root.style.setProperty("--green", colorGreen);
    }
    if (colorWhite) {
      root.style.setProperty("--white", colorWhite);
    }
  });

  onMount(async () => {
    getStat(country).then(body => {
      const dataLength = body.length;
      allData = body;
      const data = body[dataLength - 1];
      stats = data;
      if (dataLength > 1) {
        const prevData = body[dataLength - 3];
        statsPrev = prevData;
      }
    }).catch(e => {
			console.log(e);
		});
  });
</script>



<div class={`widget ${customStyleClass}`}>
  <div class="wrapper">
    <span class="appTitle">
      {@html appTitle ? appTitle : t.appTitle}
    </span>
    {#if stats}
      <Main data={stats} prevData={statsPrev} />
      <ButtonInfo />
      <ButtonToggleModal />
    {/if}
  </div>
  <Tooltip data={stats} />
</div>
<Modal data={allData} />



<style>
  :root {
    --red: #f00;
    --green: #0f0;
    --black: #010101;
    --white: #fff;
  }
  :global(*) {
    box-sizing: border-box;
  }
  :global(.sr-only) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .widget {
    position: relative;
    padding: 4px 5px;
    background: var(--black);
    color: var(--white);
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    line-height: 1;
  }
  .wrapper {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .appTitle {
    display: none;
  }
  @media (min-width: 520px) {
    .appTitle {
      display: block;
    }
  }
</style>
