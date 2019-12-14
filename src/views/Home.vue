<template>
  <div class="home">
    <section id="variables">
      <h2 class="home__title">Задайте переменные:</h2>
      <form v-on:submit.prevent>
        <div
          v-for="input in variables.inputs"
          class="variables__item"
          :key="input.name"
        >
          <label for="variables__name">{{ input.name }}</label>
          <input
            type="number"
            step="any"
            id="example-value"
            v-model="input.example"
          />
          <span
            class="variables__area"
            v-for="fuzzyArea in input.fuzzyAreas"
            :key="fuzzyArea.name"
            >{{
              fuzzyArea.type.value(fuzzyArea.type.ranges, input.example)
            }}</span
          >
        </div>
      </form>
    </section>

    <button class="button" @click="getResult">ПОСЧИТАТЬ</button>
  </div>
</template>

<script>
/**
 * Берем отсюда
 * variables - значения из exampleVariables (для нашего случая)
 * rules - правила для нашего случая
 */
import config from "@/config";

export default {
  name: "Home",

  data() {
    return config;
  },

  methods: {
    getResult() {
      let res = { result: 0 };
      this.rules.data.forEach(element => {
        if (element.result > res.result) res = element;
      });
      console.log(res.fuzzyAreas.output.type.ranges[0]);
    },

    toggleNorm() {
      let newNorm;
      if (this.rules.newRule.type === "AND") newNorm = "OR";
      else newNorm = "AND";
      this.rules.newRule = {
        ...this.rules.newRule,
        type: newNorm
      };
    },

    checkValue(rule) {
      const compareFunction = rule.type === "AND" ? Math.min : Math.max;
      const inputs = rule.fuzzyAreas.inputs;
      const data = [];
      inputs.forEach((element, index) => {
        const example = this.variables.inputs[index].example;
        data.push(element.type.value(element.type.ranges, example));
      });
      const result = data.reduce((next, prev) => compareFunction(next, prev));
      return result;
    },

    createRule() {
      this.rules = {
        ...this.rules,
        data: [
          ...this.rules.data,
          {
            ...this.rules.newRule,
            fuzzyAreas: {
              inputs: [...this.rules.newRule.fuzzyAreas.inputs],
              output: { ...this.rules.newRule.fuzzyAreas.output }
            },
            result: this.checkValue(this.rules.newRule)
          }
        ]
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  text-align: left;
}
</style>
