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
          label: "Jon Tan",
          backgroundColor: "#0074D9",
          data: ['3']
        },
        {
          label: "Joshua Lee",
          backgroundColor: "#2ECC40",
          data: ['5']
        },
        {
            label: "Megan Lim",
            backgroundColor: "#FF4136",
            data: ['8']
        },
        {
            label: "Sarah Tay",
            backgroundColor: "#FF851B",
            data: ['6']
        },
        {
            label: "Lee Ah Hock",
            backgroundColor: "#7FDBFF",
            data: ['12']
        },
        {
            label: "Jeremy Sim",
            backgroundColor: "#B10DC9",
            data: ['3']
        },
        {
            label: "Daryl Pong",
            backgroundColor: "#FFDC00",
            data: ['6']
        },
        {
            label: "Mary Turner",
            backgroundColor: "#001f3f",
            data: ['2']
        },
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