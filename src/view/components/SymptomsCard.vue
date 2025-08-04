<script setup lang="ts">
import { createHslColorSteps } from "@/services/color-steps";
import { computed, ref } from "vue";

const severityOptions = [
  {
    value: 1,
    description: "My symptoms are only noticable if I pay attention.",
  },
  {
    value: 2,
    description:
      "I am always aware of the symptoms but I can continue most activities.",
  },
  {
    value: 3,
    description: "I cannot do many activities due to the symptoms.",
  },
  {
    value: 4,
    description: "The symptoms are so severe that even talking is difficult.",
  },
  {
    value: 5,
    description:
      "I had to go to the emergency room to get help for my symptoms.",
  },
];
const colorValues = createHslColorSteps(0, 120, 5).reverse();

const isEditMode = ref(true);
const symptom = ref("Symptoms");
const selectedSeverity = ref(severityOptions[1]);

const filteredSuggestions = computed(() => ["foo", "bar"]);
const symptomIsEmpty = computed(() => false);

function search() {}
</script>

<template>
  <PCard class="symptoms-card">
    <template #content>
      <div class="is-flex mb-4 is-align-items-center">
        <PAutoComplete
          class="is-flex-grow-1"
          v-model="symptom"
          :emptySearchMessage="'Adding: ' + symptom"
          :suggestions="filteredSuggestions"
          :invalid="symptomIsEmpty"
          completeOnFocus
          fluid
          @complete="search"
        />
        <PButton icon="ti ti-trash" variant="text" severity="contrast" />
      </div>
      <p
        class="description mb-2"
        :style="{
          color: `hsl(${colorValues[selectedSeverity.value - 1]} 50 50)`,
        }"
      >
        <span>Explanation:</span>
        <span class="ml-1" v-html="selectedSeverity.description"></span>
      </p>
      <PSelectButton
        class="severity-selector mb-4"
        v-model="selectedSeverity"
        :options="severityOptions"
        optionLabel="value"
        size="large"
        fluid
      />
      <PButton
        label="Save"
        severity="contrast"
        variant="outlined"
        fluid
        rounded
        :disabled="symptomIsEmpty"
        :onClick="() => (isEditMode = false)"
      />
    </template>
  </PCard>
</template>
