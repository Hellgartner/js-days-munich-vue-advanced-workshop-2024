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
import {computed, onMounted, onUnmounted, ref} from 'vue'
import type { EstimationResult } from '@/types/EstimationResult'
import type { EstimationVariant } from '@/services/scrumEstimationValuesProvider'

const initialEstimationVariant: EstimationVariant = 'fibonacci'
const playerEstimationResult = ref<EstimationResult>({ name: 'Player' })
const results = ref<EstimationResult[]>([])
const error = ref<String | undefined>(undefined)
const loading = ref(true)
const doPoll = true

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, playerEstimationResult.value]
})

async function startVotingWithCurrentVariant(variant: EstimationVariant) {
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
    console.error(e)
    error.value = '' + e
  }
}
const currentEstimationVariant = ref<EstimationVariant>('fibonacci')

const setCurrentEstimationVariant = (newVariant: EstimationVariant): Promise<void> => {
  currentEstimationVariant.value = newVariant
  return startVotingWithCurrentVariant(newVariant)
}

const updatePlayersResult = (result: string | undefined) => {
  playerEstimationResult.value.result = result
}

async function fetchVotingResults() {
  try {
    const fetchResult = await fetch('http://localhost:3000/estimation/results')
    results.value = await fetchResult.json()
    loading.value = false
  } catch (e) {
    console.error(e)
    error.value = '' + e
    results.value = []
    loading.value = true
  }
}

let intervalId: number | undefined = undefined

onMounted(async () => {
  if (initialEstimationVariant) {
    await startVotingWithCurrentVariant(currentEstimationVariant.value)
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
