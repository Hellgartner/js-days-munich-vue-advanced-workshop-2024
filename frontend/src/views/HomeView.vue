<template>
  <div class="login-form">
    <div class="heading">Next Generation Scrum Poker</div>
    <div class="name-input">Name: <input class="input-field" v-model="input" /></div>
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref<string>('')
const login = () => {
  // ToDo Exercise 4.3 Use VueRouter here
  window.location.assign('/estimation')

  // ToDo Exercise 4.6 Use a named route here
}
</script>

<style scoped lang="scss">
.login-form {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-areas:
    'heading'
    'name'
    'login';
  min-height: 100vh;
  min-width: 100vw;
  grid-row-gap: 20px;
  font-family: sans-serif;
}

.heading {
  grid-area: heading;
  padding-bottom: 10px;
  font-size: 32px;
  color: rgb(5, 99, 165);
}

.name-input {
  font-size: 18px;
  line-height: 150%;
  grid-area: name;
  align-items: baseline;

  display: flex;
  gap: 10px;

  .input-field {
    flex-grow: 1;
    font-size: 18px;
    line-height: 150%;
  }
}

.login-button {
  grid-area: login;
  font-size: 18px;
  line-height: 150%;
  height: 36px;
}
</style>
