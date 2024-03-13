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

const initialEstimationVariant: EstimationVariant = 'fibonacci'
const playerEstimationResult = ref<EstimationResult>({ name: 'Player' })
const results = ref<EstimationResult[]>([])
const error = ref<String | false>(false)
const loading = ref(true)
const doPoll = true

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  // ToDo Exercise 5.3 Use players voting result from the pinia store
  return [...results.value, playerEstimationResult.value]
})

async function startVotingWithVariant(variant: EstimationVariant) {
  try {
    await fetch('http://localhost:3000/estimation/vote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ variant })
    })
  } catch (e) {
    // ToDo Exercise 3.3 Part 1/2: In case the backend responses with an error update 'error' with the error message
  }
}

const updatePlayersResult = (result: string | undefined) => {
  // ToDo Exercise 5.4 Save the user's voting result in the pinia store
  playerEstimationResult.value.result = result
}

async function fetchVotingResults() {
  try {
    const fetchResult = await fetch('http://localhost:3000/estimation/results')
    results.value = await fetchResult.json()
    loading.value = false
  } catch (e) {
    // ToDo Exercise 3.3 Part 2/2: In case the backend responds with an error update 'error' with the error message
  }
}

let intervalId: number | undefined = undefined

onMounted(async () => {
  if (initialEstimationVariant) {
    await startVotingWithVariant(initialEstimationVariant)
  }
  if (doPoll) {
    intervalId = setInterval(fetchVotingResults, 1000) as unknown as number
  } else {
    await fetchVotingResults()
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
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
