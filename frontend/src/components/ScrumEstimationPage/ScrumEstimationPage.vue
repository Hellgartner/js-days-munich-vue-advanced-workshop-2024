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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { EstimationResult } from '@/types/EstimationResult'
import type { EstimationVariant } from '@/services/scrumEstimationValuesProvider'
import dummyEstimationResults from '@/assets/DummyEstimationResults'

const initialEstimationVariant: EstimationVariant = 'fibonacci'
const playerEstimationResult = ref<EstimationResult>({ name: 'Player' })
const results = ref<EstimationResult[]>(dummyEstimationResults)
const error = ref<String | false>(false)
const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  // ToDo Exercise 5.3 Use players voting result from the pinia store
  return [...results.value, playerEstimationResult.value]
})

async function startVotingWithVariant(variant: EstimationVariant) {
  await fetch('http://localhost:3000/estimation/vote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ variant })
  })
}

const updatePlayersResult = (result: string | undefined) => {
  // ToDo Exercise 5.4 Save the user's voting result in the pinia store
  playerEstimationResult.value.result = result
}

const getVotingResultsFromBackend = async ():Promise<EstimationResult[]> => {
  const fetchResult = await fetch('http://localhost:3000/estimation/results')
  return fetchResult.json()
}

async function fetchVotingResults() {
  // ToDo Exercise 2.2 Query voting results from the backend and update the components state
}

onMounted(async () => {
  // ToDo Exercise 2.1 Start voting new voting
  // ToDo Exercise 2.2 Start polling voting results
})

onUnmounted(() => {
  // ToDo Exercise 2.3 Do you need to clean-up something? 🤔
})
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
