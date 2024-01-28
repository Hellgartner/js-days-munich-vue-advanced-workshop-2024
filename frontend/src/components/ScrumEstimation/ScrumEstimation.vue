<template>
  <div class="container">
    <h1 class="headline">Awesome scrum estimation</h1>
    <ScrumEstimationCard
      v-for="estimationValue in estimationValuesToShow"
      :key="estimationValue"
      :value="estimationValue"
      :selected-value="selectedValue"
      @selected="selectCard"
    >
      {{ estimationValue }}
    </ScrumEstimationCard>
    <div>
      <button @click="removeSelection">Remove selection</button>
    </div>
    <div>
      <select v-model="selectedSelectionType" @change="selectEstimationVariant">
        <option
          v-for="type in possibleSelectionTypes"
          :key="type"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import scrumEstimationValues, {type EstimationVariant} from "@/services/scrumEstimationValuesProvider";
import ScrumEstimationCard from "../ScrumEstimationCard/ScrumEstimationCard.vue";

interface EstimationProps  {
  initialEstimationVariant: EstimationVariant
}

const props = defineProps<EstimationProps>()

const emit = defineEmits<{
  (e: "estimationVariantChanged", value: EstimationVariant): void;
}>();

const selectedValue = ref<string | undefined>(undefined);
const possibleSelectionTypes = ref(Object.keys(scrumEstimationValues));
const selectedSelectionType =
  ref<EstimationVariant>(props.initialEstimationVariant);
const estimationValuesToShow = computed(
  () => scrumEstimationValues[selectedSelectionType.value]
);

const selectCard = (valueToSelect: string) => {
  selectedValue.value = valueToSelect;
};

const removeSelection = () => {
  selectedValue.value = undefined;
};

const selectEstimationVariant = () => {
  console.log("selected variant", selectedSelectionType.value)
  emit('estimationVariantChanged', selectedSelectionType.value)
}

</script>

<style scoped lang="scss">
.headline {
  color: red;
  font-size: 20px;
}

.container {
  text-align: center;
}
</style>
