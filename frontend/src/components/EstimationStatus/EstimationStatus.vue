<template>
  <section class="results-section" data-testid="estimation-status">
    <div class="results-table">
      <div class="header">Name</div>
      <div class="header">Voting Status</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <template v-for="result in props.estimationResults" :key="result.name">
        <div data-testid="result-name">{{ result.name }}</div>
        <div>
          <YesIcon v-if="!!result.result" class="status-icon" />
          <NoIcon v-else class="status-icon" />
        </div>
      </template>
    </div>
    <div class="button-container">
      <button @click="goToResultsPage()" class="button" :disabled="disabled">Show results</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YesIcon from '../../assets/done-icon.svg'
import NoIcon from '../../assets/red-x-line-icon.svg'
import type { EstimationResult } from '@/types/EstimationResult'

export interface EstimationStatusProps {
  estimationResults: EstimationResult[]
}

const props = defineProps<EstimationStatusProps>()

const disabled = computed(() => {
  return (
    !props.estimationResults ||
    props.estimationResults.length == 0 ||
    !props.estimationResults.every((result) => !!result.result)
  )
})

const goToResultsPage = () => {
  //Todo
}
</script>

<style scoped lang="scss">
.results-section {
  margin-top: 3vh;
}

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
