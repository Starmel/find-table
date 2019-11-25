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
import { mapGetters } from "vuex";

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

  computed: {
    ...mapGetters(["data"])
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
            data: this.data
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
