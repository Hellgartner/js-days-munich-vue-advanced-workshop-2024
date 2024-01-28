<template>
  <section class="results-section">
    <div  class="results-table">

        <div class="header">Name</div><div class="header">Voting Status</div>
        <div>&nbsp;</div><div>&nbsp;</div>
        <template v-for="result in results" :key="result.name">
          <div>{{ result.name }}</div><div>{{ result.result ? 'voted' : "not yet voted"}}</div>
        </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";

interface EstimationStatusProps {
  currentEstimationVariant: EstimationVariant
}

const props = defineProps<EstimationStatusProps>()

const results = ref([]);

async function fetchVotingResults() {
  const fetchResult = await fetch("http://localhost:3000/estimation/results")
  results.value = await fetchResult.json()
}

let intervalId: number|undefined = undefined;

onMounted( async () => {
  await fetch("http://localhost:3000/estimation/vote", {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({variant: props.currentEstimationVariant})
  })

  intervalId = setInterval(fetchVotingResults, 1000) as unknown as number
} )

onUnmounted(() => {
  clearInterval(intervalId)
})
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
</style>