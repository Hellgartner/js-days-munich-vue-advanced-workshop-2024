<template>
  <div v-if="error" class="error">Backend not reachable, please reload the page</div>
  <div class="center-content">
    <ScrumEstimation
      :initial-estimation-variant="initialEstimationVariant"
      @estimation-variant-changed="setCurrentEstimationVariant"
      @estimationChanged="updatePlayersResult"
    >
      >
    </ScrumEstimation>
    <EstimationStatus
      :estimation-results="resultsIncludingPlayerResult"
      data-testid="estimation-status"
    ></EstimationStatus>
  </div>
</template>

<script setup lang="ts">
import ScrumEstimation from '@/components/ScrumEstimation/ScrumEstimation.vue'
import EstimationStatus from '@/components/EstimationStatus/EstimationStatus.vue'
import { computed, ref } from 'vue'
import type { EstimationResult } from '@/types/EstimationResult'
import type { EstimationVariant } from '@/services/scrumEstimationValuesProvider'
import dummyEstimationResults from '@/assets/DummyEstimationResults'

const initialEstimationVariant: EstimationVariant = 'fibonacci'
const playerEstimationResult = ref<EstimationResult>({ name: 'player' })
const results = ref<EstimationResult[]>(dummyEstimationResults)
const error = ref(false)
const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, playerEstimationResult.value]
})

const setCurrentEstimationVariant = (newVariant: EstimationVariant) => {
  playerEstimationResult.value.result = undefined
}

const updatePlayersResult = (result: string | undefined) => {
  playerEstimationResult.value.result = result
}
</script>

<style scoped lang="scss">
.error {
  background-color: red;
  color: white;
  text-align: center;
  padding: 2em;
  font-size: large;
  font-weight: bold;
  border-radius: 20px;
}
</style>
