<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.button {
  color: white;
  background: rgb(0, 153, 255);
  padding: 10px;
  width: min-content;
  font-size: 18px;
  border: 0;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    background: rgb(7, 84, 136);
    transition: all 0.3s ease-out;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 50px;
}

ul,
li {
  text-decoration: none;
  list-style: none;
}
</style>
