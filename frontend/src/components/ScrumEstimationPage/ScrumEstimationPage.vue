<template>
  <div class="center-content">
    <ScrumEstimation :initial-estimation-variant="currentEstimationVariant" @estimation-variant-changed="setCurrentEstimationVariant"></ScrumEstimation>
    <EstimationStatus :estimation-results="results"></EstimationStatus>
  </div>
</template>

<script setup lang="ts">
  import ScrumEstimation from "@/components/ScrumEstimation/ScrumEstimation.vue";
  import EstimationStatus from "@/components/EstimationStatus/EstimationStatus.vue";
  import {onMounted, onUnmounted, ref} from "vue";
  import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";
  async function startVotingWithCurrentVariant(variant:EstimationVariant) {
    await fetch("http://localhost:3000/estimation/vote", {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({variant})
    })
  }
  let currentEstimationVariant = ref<EstimationVariant>('fibonacci');

  const setCurrentEstimationVariant = (variant: EstimationVariant) => {
      currentEstimationVariant.value = variant
      startVotingWithCurrentVariant(variant)
  }

  const results = ref([]);

  async function fetchVotingResults() {
    const fetchResult = await fetch("http://localhost:3000/estimation/results")
    results.value = await fetchResult.json()
  }

  let intervalId: number|undefined = undefined;

  onMounted( async () => {
    await startVotingWithCurrentVariant(currentEstimationVariant.value);
    intervalId = setInterval(fetchVotingResults, 1000) as unknown as number
  } )

  onUnmounted(() => {
    clearInterval(intervalId)
  })
</script>
