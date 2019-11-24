<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: Object,
    options: Object
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
