<script>
	import { isTooltipOpen } from "./stores.js";
  import { translations } from "./translations.js";
  import { getLang } from './utils.js'

  const lang = getLang();
  const t = translations[lang];

	const handleClick = () => {
	  isTooltipOpen.update(a => !a);
	}
</script>



<button on:click={handleClick}>
  <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
  </svg>
  <span class="sr-only">{t.btnInfo}</span>
</button>



<style>
	button {
	  flex-shrink: 0;
	  background: none;
	  color: var(--white);
    border: none;
	  padding: 0;
	  display: block;
	  cursor: pointer;
    margin: 0 10px 0 0;
	}
	button:hover,
	button:active,
	button:focus {
	  cursor: pointer;
	}
</style>
