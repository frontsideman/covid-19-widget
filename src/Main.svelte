<script>
  import { translations } from "./translations.js";
  import { getLang } from "./utils"

  export let prevData = {};
  export let data = {};

  const lang = getLang();
  const t = translations[lang];

  const getStatus = (data1, data2, val) => {
    let statusMark = "";
    if (!Object.keys(data1).length || !Object.keys(data2).length || !val)
      return "";
    if (data1[val] < data2[val]) {
      statusMark = `<svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon up" viewBox="0 0 256 512">
        <path fill="currentColor" d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"/>
      </svg>`;
    }
    if (data1[val] > data2[val]) {
      statusMark = `<svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon down" viewBox="0 0 256 512">
        <path fill="currentColor" d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z"/>
      </svg>`;
    }
    return statusMark;
  };
</script>



<ul>
	<li title={t.totalCount}>
    <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon" viewBox="0 0 512 512">
      <path fill="currentColor" d="M483.55 227.55H462c-50.68 0-76.07-61.27-40.23-97.11L437 115.19A28.44 28.44 0 00396.8 75l-15.24 15.22c-35.84 35.83-97.11 10.45-97.11-40.23V28.44a28.45 28.45 0 00-56.9 0V50c0 50.68-61.27 76.06-97.11 40.23L115.2 75A28.44 28.44 0 0075 115.19l15.25 15.25c35.84 35.84 10.45 97.11-40.23 97.11H28.45a28.45 28.45 0 100 56.89H50c50.68 0 76.07 61.28 40.23 97.12L75 396.8a28.45 28.45 0 0040.2 40.2l15.24-15.25c35.84-35.84 97.11-10.45 97.11 40.23v21.54a28.45 28.45 0 0056.9 0V462c0-50.68 61.27-76.07 97.11-40.23L396.8 437a28.45 28.45 0 0040.2-40.2l-15.25-15.24c-35.84-35.84-10.45-97.12 40.23-97.12h21.54a28.45 28.45 0 100-56.89zM224 272a48 48 0 1148-48 48 48 0 01-48 48zm80 56a24 24 0 1124-24 24 24 0 01-24 24z"/>
    </svg>
    <span>{data.Confirmed}</span>{@html getStatus(data, prevData, 'Confirmed')}
  </li>
	<li title={t.recoveryCount}>
    <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon" viewBox="0 0 640 512">
      <path fill="currentColor" d="M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z"/>
    </svg>
    <span>{data.Recovered}</span>{@html getStatus(data, prevData, 'Recovered')}
  </li>
  <li title={t.deathCount}>
    <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" class="svg-icon" viewBox="0 0 448 512">
      <path fill="currentColor" d="M439.15 453.06L297.17 384l141.99-69.06c7.9-3.95 11.11-13.56 7.15-21.46L432 264.85c-3.95-7.9-13.56-11.11-21.47-7.16L224 348.41 37.47 257.69c-7.9-3.95-17.51-.75-21.47 7.16L1.69 293.48c-3.95 7.9-.75 17.51 7.15 21.46L150.83 384 8.85 453.06c-7.9 3.95-11.11 13.56-7.15 21.47l14.31 28.63c3.95 7.9 13.56 11.11 21.47 7.15L224 419.59l186.53 90.72c7.9 3.95 17.51.75 21.47-7.15l14.31-28.63c3.95-7.91.74-17.52-7.16-21.47zM150 237.28l-5.48 25.87c-2.67 12.62 5.42 24.85 16.45 24.85h126.08c11.03 0 19.12-12.23 16.45-24.85l-5.5-25.87c41.78-22.41 70-62.75 70-109.28C368 57.31 303.53 0 224 0S80 57.31 80 128c0 46.53 28.22 86.87 70 109.28zM280 112c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32zm-112 0c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32z"/>
    </svg>
    <span>{data.Deaths}</span>{@html getStatus(data, prevData, 'Deaths')}
  </li>
</ul>



<style>
  :global(.svg-icon) {
    height: 14px;
    width: auto;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 35px 0 0;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    font-weight: 100;
  }
  li + li {
    margin-left: 20px;
  }
  ul :global(.up) {
    color: var(--green);
  }
  ul :global(.down) {
    color: var(--red);
  }
  span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
  }
  @media (min-width: 520px) {
    ul {
      margin: 0 35px;
    }
  }
</style>
