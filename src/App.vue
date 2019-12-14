<template>
  <div id="app">
    <nav class="nav">
      <router-link class="nav__button" to="/">
        Ввод данных
      </router-link>
      <router-link class="nav__button" to="/task">
        Описание задачи
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $accent-darkest;
  margin: 50px;
}

.router-link-exact-active {
  border-color: $accent !important;
  pointer-events: none;
}

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
    border-bottom: 2px solid $black;

    & + & {
      margin-left: 15px;
    }

    &:hover {
      cursor: pointer;
      color: $black;
      border-bottom-color: $accent;
      transition: all 0.3s ease-out;
    }
  }
}
</style>
