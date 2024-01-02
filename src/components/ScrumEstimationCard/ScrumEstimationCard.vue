<template>
  <ToggleableCard
    :selected="props.value === props.selectedValue"
    @click="emitSelected"
    data-testid="scrum-estimation-card"
  >
    {{ props.value }}
  </ToggleableCard>
</template>

<script lang="ts" setup>
import ToggleableCard from "../ToggleableCard/ToggleableCard.vue";

const props = defineProps<{
  value: string;
  selectedValue?: string;
}>();

const emit = defineEmits<{
  (e: "selected", value: string): void;
}>();

const emitSelected = () => {
  emit("selected", props.value);
};
</script>
