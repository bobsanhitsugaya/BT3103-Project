import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "BarChart",
  props: ["data"],
  mounted() {
    // reformat in the way the lib wants
    let chartData = {
      labels: [],
      datasets: [
        {
          label: "CS2040",
          backgroundColor: "#001f3f",
          data: ['3']
        },
        {
          label: "BT2101",
          backgroundColor: "#FF851B",
          data: ['5']
        },
        {
            label: "CS1010S",
            backgroundColor: "#01FF70",
            data: ['8']
        }
      ]
    };

    // for (let i = 0; i < this.data.length; i++) {
    //   chartData.labels.push(this.data[i].date);
    //   chartData.datasets[0].data.push(this.data[i].new);
    //   chartData.datasets[1].data.push(this.data[i].old);
    // }

    this.renderChart(chartData, {
      responsive: true,
      maintainAspectRatio: false,
      beginAtZero: true,
      scales: {
        xAxes: [
          {
            stacked: false,
            ticks: {
                beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            stacked: false,
            ticks: {
                beginAtZero: true
            }
          }
        ]
      }
    });
  }
};