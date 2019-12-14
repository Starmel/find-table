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
          <label class="variables__name">{{ input.name }}</label>
          <input
            type="number"
            v-model="input.example"
            class="variables__input"
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
      <h3>
        Справа показывается, к какому диапазону и насколько принадлежит
        значение.
      </h3>
    </section>

    <button class="button home__button" @click="getResult">ПОСЧИТАТЬ</button>

    <h1>Результат:</h1>
    <div v-if="result">
      <h3>Название правила: {{ result.fuzzyAreas.output.name }}</h3>
      <h3>Результат: {{ result.result }}</h3>
      <h3>Диапазон: {{ result.fuzzyAreas.output.type.ranges }}</h3>
      <div v-for="(input, index) in variables.inputs" :key="index">
        <h3>{{ input.name }}: {{ result.fuzzyAreas.inputs[index].name }}</h3>
      </div>
    </div>
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
    return {
      ...config,
      result: ""
    };
  },

  methods: {
    getResult() {
      try {
        let res = { result: 0 };
        this.rules.data.forEach(element => {
          element.result = this.checkValue(element);
          if (element.result > res.result) {
            res = element;
          }
        });
        this.result = res;
      } catch {
        this.result = "Похоже, для такой комбинации не задано правило.";
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  color: $white;
  background: $accent;
  padding: 10px;
  width: min-content;
  font-size: 18px;
  border: 0;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background: $accent-darker;
    transition: all 0.3s ease-out;
  }
}

.home {
  &__button {
    margin: 15px 0;
  }
}

.variables {
  &__name {
    padding-right: 15px;
    font-size: 16px;
  }

  &__input {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 16px;
  }

  &__area {
    padding-left: 10px;
  }
}
</style>
