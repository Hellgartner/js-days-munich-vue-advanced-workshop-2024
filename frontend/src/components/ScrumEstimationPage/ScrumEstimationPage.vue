<template>
  <div class="center-content">
    <ScrumEstimation :initial-estimation-variant="currentEstimationVariant" @estimation-variant-changed="setCurrentEstimationVariant"></ScrumEstimation>
    <EstimationStatus :current-estimation-variant="currentEstimationVariant"></EstimationStatus>
  </div>
</template>

<script setup lang="ts">
  import ScrumEstimation from "@/components/ScrumEstimation/ScrumEstimation.vue";
  import EstimationStatus from "@/components/EstimationStatus/EstimationStatus.vue";
  import {ref} from "vue";
  import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";

  let currentEstimationVariant = ref<EstimationVariant>('fibonacci');

  const setCurrentEstimationVariant = (variant: EstimationVariant) => {
      currentEstimationVariant.value = variant
  }
</script>
