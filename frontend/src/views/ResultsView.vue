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
import { computed, ref } from 'vue'
import EstimationResults from '@/components/EstimationResult/EstimationResults.vue'
import type { EstimationResult } from '@/types/EstimationResult'
import dummyEstimationResults from '@/assets/DummyEstimationResults'

const results = ref<EstimationResult[]>(dummyEstimationResults)

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, { name: 'Player', result: 'toDo' }]
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
