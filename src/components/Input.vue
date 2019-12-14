<template>
  <form class="in">
    <label>Высота</label>
    <input class="in__input" v-model="height" />
    <label>Ширина</label>
    <input class="in__input" v-model="width" />
    <label>Материал</label>
    <input class="in__input" v-model="material" />
    <label>Место для протягивания ног</label>
    <input class="in__input" v-model="place" />
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
      height: null,
      width: null,
      material: null,
      place: null
    };
  },

  computed: {
    ...mapGetters(["data"])
  },

  methods: {
    async generation() {
      let { height, width, material, place } = this;
      await this.$store.dispatch("inputData", {
        height,
        width,
        material,
        place
      });
      this.$emit("input", "Output");
    }
  }
};
</script>

<style lang="scss" scoped>
.in {
  display: flex;
  flex-direction: column;
  text-align: left;

  &__input {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
  }

  &__button {
    margin: 15px 0;
  }
}
</style>
