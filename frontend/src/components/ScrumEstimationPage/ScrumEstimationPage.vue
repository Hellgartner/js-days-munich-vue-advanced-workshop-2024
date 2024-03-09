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
import { computed } from 'vue'
import useVotingBackend, { type EstimationResult } from '@/composables/useVotingBackend'
import { usePlayerResultStore } from '@/stores/PlayerEstimationResultStore'

const playerResultStore = usePlayerResultStore()

const initialEstimationVariant = 'fibonacci'
const { results, setCurrentEstimationVariant, error } = useVotingBackend(
  true,
  initialEstimationVariant
)

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, playerResultStore.results]
})

const updatePlayersResult = (result: string | undefined) => {
  playerResultStore.setPlayerResult(result)
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
