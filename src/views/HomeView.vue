<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter();
const login = () => router.push({path: "estimation"});
</script>

<template>
  <main>
    <div>
      <span>Name:</span> <input>
    </div>
    <button @click="login">Login</button>
  </main>
</template>
