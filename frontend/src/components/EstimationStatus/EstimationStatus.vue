<template>
  <section class="results-section">
    <div  class="results-table">

        <div class="header">Name</div><div class="header">Voting Status</div>
        <div>&nbsp;</div><div>&nbsp;</div>
        <template v-for="result in props.estimationResults" :key="result.name">
          <div>{{ result.name }}</div><div>{{ result.result ? 'voted' : "not yet voted"}}</div>
        </template>
    </div>
  </section>
</template>

<script setup lang="ts">

interface EstimationResult {
  name: string;
  result?: string;
}
interface EstimationStatusProps {
  estimationResults : EstimationResult[]
}

const props = defineProps<EstimationStatusProps>()


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