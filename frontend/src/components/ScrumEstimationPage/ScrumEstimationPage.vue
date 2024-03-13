<template>
  <div v-if="error" class="error">Backend not reachable, please reload the page</div>
  <div class="center-content">
    <ScrumEstimation
      :initial-estimation-variant="initialEstimationVariant"
      @estimation-variant-changed="startVotingWithVariant"
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
import useVotingBackend from '@/composables/useVotingBackend'
import type { EstimationResult } from '@/types/EstimationResult'
import type { EstimationVariant } from '@/services/scrumEstimationValuesProvider'

const initialEstimationVariant: EstimationVariant = 'fibonacci'
const playerEstimationResult = ref<EstimationResult>({ name: 'Player' })
const { results, startVotingWithVariant, error } = useVotingBackend(true, initialEstimationVariant)

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  // ToDo Exercise 5.3 Use players voting result from the pinia store
  return [...results.value, playerEstimationResult.value]
})

const updatePlayersResult = (result: string | undefined) => {
  // ToDo Exercise 5.4 Save the user's voting result in the pinia store
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
