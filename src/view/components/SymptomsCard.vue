<script setup lang="ts">
import { createColorSteps } from "@/services/color-steps";
import { computed, ref } from "vue";

const props = defineProps<{
  symptom: string;
  severity: number;
  isEditMode?: boolean;
  onDelete?: () => void;
}>();

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
const allSuggestions = ["Headache", "Neck pain", "Backpain", "Brainfog"];
const colorValues = createColorSteps(77, 142, 5).reverse();
// const colorValues = createColorSteps(0, 120, 5).reverse();

const isEditMode = ref(props.isEditMode);
const symptom = ref(props.symptom ? props.symptom : "");
const selectedSeverity = ref(severityOptions[props.severity]);

const filteredSuggestions = ref([] as string[]);
const symptomIsEmpty = computed(() => symptom.value.trim().length < 1);

function search(event: { query: string }) {
  filteredSuggestions.value = allSuggestions.filter((s) =>
    s.toLowerCase().includes(event.query.toLowerCase()),
  );
}
</script>

<template>
  <PCard class="symptoms-card">
    <template #content>
      <div class="edit-mode" v-if="isEditMode">
        <div class="is-flex mb-2 is-align-items-center">
          <PAutoComplete
            class="is-flex-grow-1"
            v-model="symptom"
            :emptySearchMessage="'Add new symptom: ' + symptom"
            :suggestions="filteredSuggestions"
            :invalid="symptomIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
          <PButton icon="ti ti-trash" variant="text" severity="contrast" />
        </div>
        <PSelectButton
          class="severity-selector mb-2"
          v-model="selectedSeverity"
          :options="severityOptions"
          optionLabel="value"
          size="large"
          fluid
        />
        <p
          class="description mb-2"
          :style="{
            color: colorValues[selectedSeverity.value - 1].css,
          }"
        >
          <span>Explanation:</span>
          <span class="ml-1" v-html="selectedSeverity.description"></span>
        </p>
        <PButton
          label="Save"
          severity="secondary"
          fluid
          rounded
          :disabled="symptomIsEmpty"
          :onClick="() => (isEditMode = false)"
        />
      </div>
      <div class="show-mode is-flex is-align-items-center" v-else>
        <p class="activity title has-text-weight-medium is-size-6 m-0">
          {{ symptom }}
        </p>
        <PButton
          variant="text"
          icon="ti ti-settings"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = true)"
        />
        <div class="spacer is-flex-grow-1"></div>
        <p class="description has-text-grey">
          <span class="is-capitalized mr-1"
            >Severity: {{ selectedSeverity.value }}/5</span
          >
        </p>
      </div>
    </template>
  </PCard>
</template>
