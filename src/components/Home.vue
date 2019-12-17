<template>
  <div class="home">
    <section id="variables">
      <h2 class="home__title">Задайте переменные:</h2>
      <form v-on:submit.prevent>
        <table>
          <tbody>
            <tr
              v-for="input in variables.inputs"
              class="variables__item variables__item-color"
              :key="input.name"
            >
              <td class="variables__name">
                {{ input.name }} от {{ input.fuzzyAreas[0].ranges[0] + 1 }} до
                {{
                  input.fuzzyAreas[input.fuzzyAreas.length - 1].ranges[
                    input.fuzzyAreas[input.fuzzyAreas.length - 1].ranges
                      .length - 1
                  ]
                }}
              </td>
              <td>
                <input
                  type="number"
                  :min="input.fuzzyAreas[0].ranges[0]"
                  :max="
                    input.fuzzyAreas[input.fuzzyAreas.length - 1].ranges[
                      input.fuzzyAreas[input.fuzzyAreas.length - 1].ranges
                        .length - 1
                    ]
                  "
                  v-model="input.value"
                  class="variables__input"
                />
              </td>
              <td class="variables__areas">
                <span
                  class="variables__area"
                  v-for="fuzzyArea in input.fuzzyAreas"
                  :key="fuzzyArea.name"
                >
                  {{
                    Math.round(
                      fuzzyValue(fuzzyArea.ranges, input.value) * 1000
                    ) / 1000
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <h3>
        Справа показывается, к какому диапазону и насколько принадлежит
        значение.
      </h3>
    </section>

    <button class="button home__button" @click="getResult">ПОСЧИТАТЬ</button>

    <h1>Результат:</h1>
    <div v-if="isSuccess">
      <h3>Название правила: {{ result.output.name }}</h3>
      <h3>Результат: {{ result.result }}</h3>
      <h3>Диапазон: {{ result.output.ranges }}</h3>
      <div v-for="(input, index) in variables.inputs" :key="index">
        <h3>
          {{ input.name }}:
          {{ result.inputs[index] ? result.inputs[index].name : "" }}
        </h3>
      </div>
    </div>
    <h3 v-else-if="isFirst">Нажмите на кнопку для подсчета.</h3>
    <h3 v-else>Похоже, что-то введено неправильно.</h3>
  </div>
</template>

<script>
/**
 * Берем отсюда
 * variables - значения из exampleVariables (для нашего случая)
 * rules - правила для нашего случая
 */
// import config2 from "@/config/config";

import config from "@/config/index";

export default {
  name: "Home",

  data() {
    return {
      ...config,
      result: "",
      isSuccess: false,
      isFirst: true
    };
  },

  methods: {
    /**
     * Справа от каждого поля ввода есть цифры. Сколько функций принадлежности
     * во входной переменной, столько и цифр.
     * Для каждой такой функции принадлежности запускается эта функция, она принимает
     * диапазон функции принадлежности и значение, которое введено в поле ввода.
     * Функция считает, насколько введенное в поле ввода значение соответствует диапазону.
     */
    fuzzyValue(ranges, inputValue) {
      try {
        if (ranges.length == 3) {
          return this.fuzzyAreas.triangle(ranges, inputValue);
        } else {
          return this.fuzzyAreas.trapezoid(ranges, inputValue);
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    getResult() {
      try {
        let res = { result: 0 };
        /**
         * Для каждого правила посчитать его "результат", а потом
         * среди всех постепенно выбрать максимальный
         */
        this.rules.forEach(rule => {
          rule.result = this.checkValue(rule);
          if (rule.result > res.result) {
            res = rule;
          }
        });
        this.result = res;
        this.isFirst = true;
        this.isSuccess = true;
      } catch {
        this.isSuccess = false;
      }
    },

    /**
     * Для каждой входной переменной берем её значение,
     * введенное в поле ввода и пушим в data это значение,
     * пройденное через fuzzyValue с помощью диапазона для
     * этой входной переменной, взятой из правила (rule).
     * В конце в data получаем что-то типа [ 0, 0.29, 0.66, 0 ], а
     * потом находим среди этого максимум
     */
    checkValue(rule) {
      const { variables } = this;
      const data = [];

      rule.inputs.forEach((input, index) => {
        const value = variables.inputs[index].value;
        data.push(this.fuzzyValue(input.ranges, value));
      });
      // Максимальное значение из массива data
      const result = data.reduce((next, prev) => Math.max(next, prev));
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
// Стили css (почти, с препроцессором)

$accent: #0099ff;
$accent-darker: #075488;
$white: white;

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
    text-align: right;
    max-width: 200px;
  }

  &__input {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 16px;
  }

  &__areas {
    min-width: 230px;
  }

  &__area {
    padding-left: 10px;
    text-align: left;
  }
}
</style>
