<template>
  <section class="results-section">
    <table  class="results-table">
      <thead>
        <tr><th>Name</th><th>Result</th></tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.name">
          <td>{{ result.name }}</td><td>{{ result.result ? 'voted' : "not yet voted"}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";

interface EstimationStatusProps {
  currentEstimationVariant: EstimationVariant
}

const props = defineProps<EstimationStatusProps>()

const results = ref([]);

onMounted( async () => {
  await fetch("http://localhost:3000/estimation/vote", {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({variant: props.currentEstimationVariant})
  })
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