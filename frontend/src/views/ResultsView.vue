<template>
  <div class="results-view">
    <h1 class="results-view__heading">Result</h1>
    <EstimationResults
      :estimation-results="resultsIncludingPlayerResult"
      class="results-view__estimation-status"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EstimationResults from '@/components/EstimationResult/EstimationResults.vue'
import type { EstimationResult } from '@/components/EstimationStatus/EstimationStatus.vue'

const results = ref<EstimationResult[]>([])

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, {name: "Player", result: "toDo"}]
})

async function fetchVotingResults() {
  const fetchResult = await fetch('http://localhost:3000/estimation/results')
  results.value = await fetchResult.json()
}

onMounted(async () => {
  await fetchVotingResults()
})
</script>

<style scoped lang="scss">
.results-view {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-areas:
    'heading'
    'status'
    'reset';
  min-height: 100vh;
  min-width: 100vw;
  grid-row-gap: 20px;
  font-family: sans-serif;
}

.results-view__heading {
  grid-area: heading;
  padding-bottom: 10px;
  color: rgb(5, 99, 165);
  justify-self: center;
}

.results-view__estimation-status {
  grid-area: status;
}

.results-view__reset {
  grid-area: reset;
}
</style>
