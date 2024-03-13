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

async function startVotingWithCurrentVariant(variant: EstimationVariant) {
  // ToDo Exercise 2.1 Part 1/2: Do a backend call to rigger a new voting session
  // ToDo Exercise 3.3 Part 1/2: In case the backend reponses with an error update 'error' with the error message
}

const setCurrentEstimationVariant = (newVariant: EstimationVariant) => {
  playerEstimationResult.value.result = undefined
}

const updatePlayersResult = (result: string | undefined) => {
  // ToDo Exercise 5.4 Save the user's voting result in the pinia store
  playerEstimationResult.value.result = result
}

async function fetchVotingResults() {
  // ToDo Exercise 2.2 Part 1/3: Query voting results from the backend
  // ToDo Exercise 3.3 Part 2/2: In case the backend responds with an error update 'error' with the error message
}

onMounted(async () => {
  // ToDo Exercise 2.1 Part 2/2: Start voting new voting
  // ToDo Exercise 2.2 Part 2/3: Start polling voting results
})

onUnmounted(() => {
  // ToDo Exercise 2.3 Part 2/3: Do you need to clean-up something? 🤔
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
