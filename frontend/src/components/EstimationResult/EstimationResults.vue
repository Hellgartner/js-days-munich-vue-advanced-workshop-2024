<template>
  <section>
    <div class="results-table">
      <div class="header">Name</div>
      <div class="header">Vote</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <template v-for="result in props.estimationResults" :key="result.name">
        <div>{{ result.name }}</div>
        <div class="results-table__right-column">{{ result.result }}</div>
      </template>
    </div>
    <div class="button-container">
      <button @click="goToEstimationPage()" class="button">Reset results</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EstimationResult } from '@/types/EstimationResult'

const props = defineProps<{
  estimationResults: EstimationResult[]
}>()

const goToEstimationPage = () => {
  // ToDo Exercise 4.5 Use VueRouter here
  window.location.assign('/estimation')

  // ToDo Exercise 4.6 Use a named route here

  // ToDo Exercise 5.6 Reset the user's voting result
}
</script>

<style scoped lang="scss">
.results-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 3px solid black;
  max-width: 400px;
  border-radius: 10px;
}

.results-table__right-column {
  justify-items: center;
}

.header {
  font-weight: bold;
}

.button-container {
  text-align: center;
  margin-top: 30px;
}

.button {
  padding: 10px;
}

.status-icon {
  height: 1em;
}
</style>
