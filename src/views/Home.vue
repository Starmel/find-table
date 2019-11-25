<template>
  <div class="home">
    <nav class="nav">
      <div
        class="nav__button"
        :class="{ active: button == 'Input' }"
        @click="button = 'Input'"
      >
        Ввод данных
      </div>
      <div
        class="nav__button"
        :class="{ active: button == 'Output' }"
        @click="button = 'Output'"
      >
        Результат
      </div>
      <div
        class="nav__button"
        :class="{ active: button == 'Task' }"
        @click="button = 'Task'"
      >
        Описание задачи
      </div>
    </nav>
    <component :is="button" @input="changeInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      button: "Input"
    };
  },

  components: {
    Input: () => import("@/components/Input.vue"),
    Output: () => import("@/components/Output.vue"),
    Task: () => import("@/components/Task.vue")
  },

  methods: {
    changeInput(val) {
      this.button = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  &__button {
    user-select: none;
    color: $accent;
    padding: 10px;
    width: min-content;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    text-decoration: none;
    border: 2px solid transparent;
    border-bottom: 2px solid black;

    & + & {
      margin-left: 15px;
    }

    &:hover {
      cursor: pointer;
      color: black;
      border-bottom-color: $accent;
      transition: all 0.3s ease-out;
    }

    &.active {
      border-color: $accent;
      pointer-events: none;
    }
  }
}
</style>
