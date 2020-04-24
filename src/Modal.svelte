<script>
  import { fade } from "svelte/transition";
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import { isModalOpen } from "./stores.js";
  import Chart from "./Chart.svelte";
  import { dateOptions } from "./constants.js";
  import { translations } from "./translations.js";
  import { getLang } from './utils.js'

  export let data;

  const lang = getLang();
  const t = translations[lang];

  let labels;
  let confirmed;
  let deaths;
  let recovered;
  let dataVals;

  afterUpdate(() => {
    labels = data.map(item =>
      new Date(item.Date).toLocaleDateString(lang, dateOptions)
    );
    confirmed = data.map(item => item.Confirmed);
    deaths = data.map(item => item.Deaths);
    recovered = data.map(item => item.Recovered);
    dataVals = { confirmed, deaths, recovered };
  });

  let modal = false;

  isModalOpen.subscribe(value => {
    modal = value;
  });

  const handle_keydown = e => {
    if (e.key === "Escape") {
      handleClose();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const handleClose = () => {
    isModalOpen.update(a => !a);
  };
</script>



<svelte:window on:keydown={handle_keydown}/>

{#if modal}
	<div class="modal-background" on:click={handleClose} transition:fade></div>
	<div class="modal" role="dialog" aria-modal="true" bind:this={modal} transition:fade>
    <Chart data={dataVals} labels={labels} />
		<!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={handleClose} type="button" class="close" aria-label="Close">
      <span aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon" viewBox="0 0 352 512">
          <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
        </svg>
      </span>
      <span class="sr-only">{t.closeModal}</span>
    </button>
	</div>
{/if}



<style>
	.modal-background {
	  position: fixed;
	  z-index: 100;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.3);
	}
	.modal {
	  font-family: "Courier New", Courier, monospace;
	  position: absolute;
	  z-index: 100;
	  left: 50%;
	  top: 50%;
	  width: auto;
	  max-width: 100%;
    height: auto;
	  max-height: 100%;
	  overflow: auto;
	  transform: translate(-50%, -50%);
	  padding: 30px 20px 20px;
	  border-radius: 3px;
	  background: var(--white);
    overscroll-behavior: contain;
	}
	button {
	  display: block;
	  position: absolute;
	  top: 5px;
	  right: 5px;
	  height: 30px;
	  width: 30px;
	  padding: 0;
    margin: 0;
	  background: none;
	  border: none;
	  cursor: pointer;
	  color: var(--black);
	}
  @media (min-width: 990px) {
    .modal {
      width: calc(100vw - 4em);
	    max-width: 900px;
      max-height: calc(100vh - 60px);
    }
  }
</style>
