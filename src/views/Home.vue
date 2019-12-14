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
          <label class="variables__name"
            >{{ input.name }} от {{ input.fuzzyAreas[0].type.ranges[0] + 1 }} до
            {{
              input.fuzzyAreas[input.fuzzyAreas.length - 1].type.ranges[
                input.fuzzyAreas[input.fuzzyAreas.length - 1].type.ranges
                  .length - 1
              ]
            }}</label
          >
          <input
            type="number"
            :min="input.fuzzyAreas[0].type.ranges[0]"
            :max="
              input.fuzzyAreas[input.fuzzyAreas.length - 1].type.ranges[
                input.fuzzyAreas[input.fuzzyAreas.length - 1].type.ranges
                  .length - 1
              ]
            "
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
    <div v-if="isSuccess">
      <h3>Название правила: {{ resultName }}</h3>
      <h3>Результат: {{ resultNumber }}</h3>
      <h3>Диапазон: {{ resultRange }}</h3>
      <div v-for="(input, index) in variables.inputs" :key="index">
        <h3>
          {{ input.name }}:
          {{ resultInputs[index] ? resultInputs[index].name : "" }}
        </h3>
      </div>
    </div>
    <h3 v-else>Похоже, что-то введено неправильно.</h3>
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
      result: "",
      isSuccess: false
    };
  },

  computed: {
    resultName() {
      try {
        return this.result.fuzzyAreas.output.name;
      } catch {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isSuccess = false;
        return "";
      }
    },

    resultNumber() {
      try {
        return this.result.result;
      } catch {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isSuccess = false;
        return "";
      }
    },

    resultRange() {
      try {
        return this.result.fuzzyAreas.output.type.ranges;
      } catch {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isSuccess = false;
        return "";
      }
    },

    resultInputs() {
      try {
        return this.result.fuzzyAreas.inputs;
      } catch {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isSuccess = false;
        return "";
      }
    }
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
        this.isSuccess = true;
      } catch (e) {
        console.log(e);
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
