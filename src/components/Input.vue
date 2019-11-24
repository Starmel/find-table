<template>
  <form class="in">
    <p>{{ data }}</p>
    <textarea class="in__input" v-model="dataInput" />
    <button class="in__button button" @click.prevent="generation">
      Подтвердить
    </button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Input",

  data() {
    return {
      dataInput: ""
    };
  },

  computed: {
    ...mapGetters(["data"])
  },

  created() {
    this.dataInput = this.data;
  },

  methods: {
    async generation() {
      await this.$store.dispatch("inputData", this.dataInput);
      this.$emit("input", "Output");
    }
  }
};
</script>

<style lang="scss" scoped>
.in {
  display: flex;
  flex-direction: column;
  width: 300px;

  &__input {
    min-width: 300px;
    min-height: 300px;
  }

  &__button {
    margin: 15px 0;
  }
}
</style>
