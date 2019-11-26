<template>
  <div class="task">
    <h2>Описание задачи</h2>
    <p>
      «Подбор стола для сидения за ним (при заданной глубине)»
    </p>
    <h3>Входные значения</h3>
    <vue-plotly
      class="task__chart"
      :data="data1"
      :layout="layout1"
      :options="options"
    />
    <vue-plotly
      class="task__chart"
      :data="data2"
      :layout="layout2"
      :options="options"
    />
    <vue-plotly
      class="task__chart"
      :data="data3"
      :layout="layout3"
      :options="options"
    />
    <vue-plotly
      class="task__chart"
      :data="data4"
      :layout="layout4"
      :options="options"
    />
    <h3>Выходное значение</h3>
    <vue-plotly
      class="task__chart"
      :data="data5"
      :layout="layout5"
      :options="options"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePlotly from "@statnett/vue-plotly";

export default {
  name: "Task",

  components: {
    VuePlotly: VuePlotly
  },

  data() {
    return {
      layout1: { title: "Высота" },
      layout2: { title: "Ширина, глубину не берем" },
      layout3: { title: "Материал (степень прочности)" },
      layout4: { title: "Место для протягивания ног" },
      layout5: { title: "Стоит ли сидеть за столом"},

      data1: [
        { name: "Столешница лежит на полу", x: [0, 7, 15], y: [0, 1, 0] },
        { name: "Ниже стула", x: [12, 20, 35], y: [0, 1, 0] },
        { name: "Как стул", x: [20, 30, 50, 80], y: [0, 1, 1, 0] },
        { name: "Как стол", x: [70, 80, 90, 130], y: [0, 1, 1, 0] },
        {
          name: "С рост человека и выше",
          x: [120, 160, 180, 200],
          y: [0, 1, 1, 0]
        }
      ],

      data2: [
        {
          name: "Возможно можно положить телефон боком",
          x: [0, 8, 28],
          y: [0, 1, 0]
        },
        {
          name: "Можно положить раскрытую тетрадь",
          x: [25, 38, 55],
          y: [0, 1, 0]
        },
        {
          name: "Можно положить раскрытую тетрадь, локти и что-нибудь мелкое",
          x: [40, 60, 75, 120],
          y: [0, 1, 1, 0]
        },
        {
          name: "Можно растянуть руки в разные стороны",
          x: [100, 130, 160, 200],
          y: [0, 1, 1, 0]
        }
      ],

      data3: [
        { name: "Палки и листья", x: [0, 3, 8], y: [0, 1, 0] },
        { name: "Картон", x: [5, 10, 20], y: [0, 1, 0] },
        { name: "Фанера", x: [18, 45, 60], y: [0, 1, 0] },
        { name: "Дерево/дсп", x: [50, 55, 75, 85], y: [0, 1, 1, 0] },
        {
          name: "Камень",
          x: [80, 95, 100],
          y: [0, 1, 1]
        }
      ],

      data4: [
        { 
          name: "Хватит для детской ступни", 
          x: [0, 12, 15, 23], 
          y: [0, 1, 1, 0]
        },
        { name: "Хватит для большой ступни", x: [20, 28, 35], y: [0, 1, 0] },
        { 
          name: "Норм, если согнуть ноги в коленях", 
          x: [30, 40, 50, 65], 
          y: [0, 1, 1, 0]
        },
        { 
          name: "Можно расправить ноги среднего роста человеку", 
          x: [60, 85, 100], 
          y: [0, 1, 0] 
        },
        {
          name: "Можно расправить ноги высокого роста человеку и еще останется место",
          x: [90, 110, 150],
          y: [0, 1, 0]
        }
      ],

      data5: [
        { 
          name: "Это не похоже на стол", 
          x: [0, 5, 10], 
          y: [0, 1, 0]
        },
        { name: "Лучше не садиться, но если очень хочется...", x: [7, 14, 23], y: [0, 1, 0] },
        { 
          name: "Это стол за 100 рублей, что-то легкое положить норм", 
          x: [18, 28, 35], 
          y: [0, 1, 0]
        },
        { 
          name: "Можно сесть и попробовать писать за столом", 
          x: [30, 40, 50, 60], 
          y: [0, 1, 1, 0] 
        },
        {
          name: "Удобно печатать и стол выдержит агрессивное печатание",
          x: [53, 65, 80, 85],
          y: [0, 1, 1, 0]
        },
        {
          name: "Можно танцевать",
          x: [78, 92, 100],
          y: [0, 1, 1]
        }
      ],

      // степень принадлежности y, x - единицы измерения
      options: {}
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
      this.chartdata1 = {
        labels: [
          0,
          7,
          12,
          15,
          20,
          30,
          35,
          50,
          70,
          80,
          90,
          120,
          130,
          160,
          180,
          200
        ],
        datasets: [
          {
            data: [0, 1, 0.5, 0, null],
            label: "Столешница лежит на полу",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [null, null, 0, 0.5, 1, 0.5, 0],
            label: "Ниже стула",
            borderColor: "#8e5ea2",
            fill: false
          },
          {
            data: [...Array(4).fill(null), 0, 1, 1, 1, 0.5, 0],
            label: "Как стул",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [...Array(8).fill(null), 0, 1, 1, 0.5, 0],
            label: "Как стол",
            borderColor: "#e8c3b9",
            fill: false
          },
          {
            data: [...Array(11).fill(null), 0, 0.5, 1, 1, 0],
            label: "С рост человека и выше",
            borderColor: "#c45850",
            fill: false
          }
        ]
      };
      this.chartdata2 = {
        labels: [0, 8, 15, 25, 38, 40, 55],
        datasets: [
          {
            data: [0, 1, 0],
            label: "Столешница лежит на полу",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [0, 0, 1, 0],
            label: "Ниже стула",
            borderColor: "#8e5ea2",
            fill: false
          },
          {
            data: [0, 0, 0, 1, 1, 0],
            label: "Как стул",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [0, 0, 0, 0, 1, 1, 1],
            label: "Как стол",
            borderColor: "#e8c3b9",
            fill: false
          },
          {
            data: [0, 0, 1, 1],
            label: "С рост человека и выше",
            borderColor: "#c45850",
            fill: false
          }
        ]
      };
      this.chartdata3 = {
        labels: Array.from(Array(7), (d, i) => i),
        datasets: [
          {
            label: "Условие 3",
            backgroundColor: "#f87979",
            data: this.data
          }
        ]
      };
      this.chartdata4 = {
        labels: Array.from(Array(7), (d, i) => i),
        datasets: [
          {
            label: "Условие 4",
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

<style lang="scss" scoped>
.task {
  text-align: left;
  line-height: 200%;

  &__chart {
    width: 100%;
    height: 350px;
  }
}

h3 {
  color: $accent;
}
</style>
