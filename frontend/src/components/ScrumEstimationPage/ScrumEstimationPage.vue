<template>
  <div v-if="communicationError" class="error">
    Backend not reachable, please reload the page
  </div>
  <div class="center-content">
    <ScrumEstimation :initial-estimation-variant="initialEstimationVariant"
                     @estimation-variant-changed="setCurrentEstimationVariant"
                     @estimationChanged="updatePlayersResult">
      >
    </ScrumEstimation>
    <EstimationStatus :estimation-results="resultsIncludingPlayerResult"
                      data-testid="estimation-status"></EstimationStatus>
  </div>
</template>

<script setup lang="ts">
import ScrumEstimation from "@/components/ScrumEstimation/ScrumEstimation.vue";
import EstimationStatus from "@/components/EstimationStatus/EstimationStatus.vue";
import {computed, ref} from "vue";
import useVotingBackend, {type EstimationResult} from "@/composables/useVotingBackend";


const communicationError = ref(false)
//to be moved to store + name to be done properly
const playerResult = ref<EstimationResult>({
  name: "player",
  result: undefined
})

const initialEstimationVariant = "fibonacci";
const {results, setCurrentEstimationVariant} = useVotingBackend(true, initialEstimationVariant)

const resultsIncludingPlayerResult = computed<EstimationResult[]>(() => {
  return [...results.value, playerResult.value]
})

const updatePlayersResult = (result: string | undefined) => {
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
