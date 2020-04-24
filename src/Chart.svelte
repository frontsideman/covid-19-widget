<script>
  import { afterUpdate } from "svelte";
  import Chart from "chart.js";
  import { translations } from "./translations.js";
  import { getLang } from './utils.js'

  export let data = {};
  export let labels = [];

  const { confirmed = {}, deaths = {}, recovered = {} } = data;
  const lang = getLang();
  const t = translations[lang];

  const createChart = () => {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${Math.max(...confirmed)} - ${t.confirmed}`,
            data: confirmed,
            backgroundColor: ["rgba(255, 0, 0, 0.3)"],
            borderColor: ["rgba(255, 0, 0, 1)"],
            borderWidth: 1
          },
          {
            label: `${Math.max(...deaths)} - ${t.deaths}`,
            data: deaths,
            backgroundColor: ["rgba(0, 0, 255, 0.3)"],
            borderColor: ["rgba(0, 0, 255, 1)"],
            borderWidth: 1
          },
          {
            label: `${Math.max(...recovered)} - ${t.recovered}`,
            data: recovered,
            backgroundColor: ["rgba(0, 255, 0, 0.3)"],
            borderColor: ["rgba(0, 255, 0, 1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          align: "center",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  };
  Chart.defaults.global.defaultFontFamily = '"Courier New", Courier, monospace';

  afterUpdate(() => {
    createChart();
  });
</script>



<canvas id="myChart" width="600" height="400"></canvas>



