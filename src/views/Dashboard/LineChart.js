import { Line } from "vue-chartjs";

export default {
  extends: Line,
  name: "LineChart",
  props: ["data"],
  mounted() {
    // reformat in the way the lib wants
    let chartData = {
      labels: ['$0', '$5', '$10', '$15', '$20', '$25', '$30'],
      datasets: [
        {
          label: "CS2040",
          borderColor	: "#001f3f",
          data: [0, 0, 3, 10, 5, 2, 1, 0],
          fill: false,
        },
        {
            label: "BT2101",
            borderColor	: "#FF851B",
            fill: false,
            data: [0, 0, 2, 7, 6, 3, 1, 0],
        },
        {
            label: "CS1010S",
            borderColor	: "#01FF70",
            fill: false,
            data: [0, 5, 15, 18, 17, 10, 4, 0],
        }
      ]
    };

    // for (let i = 0; i < this.data.length; i++) {
    //   chartData.labels.push(this.data[i].date);
    //   chartData.datasets[0].data.push(this.data[i].views);
    // }

    this.renderChart(chartData, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
};
