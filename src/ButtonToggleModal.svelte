<script>
	import { isModalOpen } from "./stores.js";
  import { translations } from "./translations.js";
  import { getLang } from './utils.js'

  const lang = getLang();
  const t = translations[lang];

	let isActiveClass = false;

	isModalOpen.subscribe(value => {
	  isActiveClass = value;
	});

	const handleClick = () => {
	  isModalOpen.update(a => !a);
	};
</script>



<button on:click={handleClick} class="{isActiveClass ? 'active' : ''}">
  <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon" data-icon="chevron-circle-down" data-prefix="fas" viewBox="0 0 512 512">
    <path fill="currentColor" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"/>
  </svg>
  <span class="sr-only">{t.btnModal}</span>
</button>



<style>
	button {
	  background: none;
	  flex-shrink: 0;
	  color: var(--white);
	  border: none;
	  border-radius: 3px;
	  padding: 0;
	  display: block;
	  cursor: pointer;
    margin: 0;
	}
	button:hover,
	button:active,
	button:focus {
	  cursor: pointer;
	}
	.active {
	  transform: rotate(180deg);
	  transform-origin: center center;
	}
</style>
