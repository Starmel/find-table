<template>
  <div id="output">
    Hello
    <Chart
      :chartdata="chartdata"
      :options="options"
      :width="150"
      :height="150"
    />
  </div>
</template>

<script>
export default {
  name: "Output",

  components: {
    Chart: () => import("@/components/UI/Chart.vue")
  },

  data() {
    return {
      chartdata: null,
      options: null
    };
  },

  mounted() {
    this.fillData();
  },

  methods: {
    fillData() {
      this.chartdata = {
        labels: Array.from(Array(7), (d, i) => i),
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [10, 50, 30, 40, 50, 20, 70]
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
