<template>
  <section class="results-section">
    <table  class="results-table">
      <thead>
        <tr><th>Name</th><th>Result</th></tr>
      </thead>
      <tbody>
        <tr v-for="result in results">
          <td>{{ result.name }}</td><td>{{ result.result ? result.result : "not yet voted"}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const results = ref([]);

onMounted( async () => {
  const fetchResult = await fetch("http://localhost:3000/estimation/results")
  results.value = await fetchResult.json()
} )
</script>

<style scoped lang="scss">
.results-section {
  margin-top: 3vh;
}

.results-table {
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 3px solid black;
  border-radius: 10px;
}
</style>