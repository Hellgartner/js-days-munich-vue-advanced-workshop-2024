<template>
  <div v-if="communicationError" class="error">
    Backend not reachable, please reload the page
  </div>
  <div class="center-content">
    <ScrumEstimation :initial-estimation-variant="currentEstimationVariant"
                     @estimation-variant-changed="setCurrentEstimationVariant"
                     @estimationChanged="updatePlayersResult">
    >
    </ScrumEstimation>
    <EstimationStatus :estimation-results="resultsIncludingPlayerResult" data-testid="estimation-status"></EstimationStatus>
  </div>
</template>

<script setup lang="ts">
  import ScrumEstimation from "@/components/ScrumEstimation/ScrumEstimation.vue";
  import EstimationStatus from "@/components/EstimationStatus/EstimationStatus.vue";
  import {computed, onMounted, onUnmounted, ref} from "vue";
  import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";

  interface EstimationResult {
    name: string;
    result?: string;
  }

  const communicationError = ref(false)
  //to be moved to store + name to be done properly
  const playerResult = ref<EstimationResult>({
    name: "player",
    result: undefined
  })

  async function startVotingWithCurrentVariant(variant:EstimationVariant) {
    try{
    await fetch("http://localhost:3000/estimation/vote", {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({variant})
    })}
    catch (e) {
      console.error(e);
      communicationError.value = true;
    }
  }
  let currentEstimationVariant = ref<EstimationVariant>('fibonacci');

  const setCurrentEstimationVariant = (variant: EstimationVariant) => {
      currentEstimationVariant.value = variant
      startVotingWithCurrentVariant(variant)
  }

  const results = ref<EstimationResult[]>([]);

  async function fetchVotingResults() {
    try {
      const fetchResult = await fetch("http://localhost:3000/estimation/results")
      results.value = await fetchResult.json()
    } catch (e) {
      console.error(e)
      results.value = []
    }
  }

  let intervalId: number|undefined = undefined;

  onMounted( async () => {
    await startVotingWithCurrentVariant(currentEstimationVariant.value);
    intervalId = setInterval(fetchVotingResults, 1000) as unknown as number
  } )

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
    return [...results.value, playerResult.value]
  })

  const updatePlayersResult = (result: string|undefined) => {
    playerResult.value.result = result
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
