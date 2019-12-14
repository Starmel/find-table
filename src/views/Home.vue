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
    </section>

    <button class="button home__button" @click="getResult">ПОСЧИТАТЬ</button>

    <h1>Результат: {{ result }}</h1>
    <br />
    {{ rules.data }}
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
      let res = { result: 0 };
      this.rules.data.forEach(element => {
        if (element.result > res.result) res = element;
      });
      this.result = res.fuzzyAreas.output.type.ranges[0];
      console.log(res.fuzzyAreas.output.type.ranges[0]);
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
