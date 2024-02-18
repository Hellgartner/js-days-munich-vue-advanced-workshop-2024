<template>
  <div
    class="awesomescrumestimation-card"
    :class="props.selected ? 'awesomescrumestimation-card--selected' : ''"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  selected: boolean
}>()
</script>

<style scoped lang="scss">
@import '../../style/scrumestimation_card';
</style>
