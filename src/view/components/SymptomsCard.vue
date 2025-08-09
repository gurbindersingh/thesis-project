<script setup lang="ts">
import { redToGreenSteps } from "@/services/color-steps";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  symptom: string;
  severity?: number;
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
const colorValues = redToGreenSteps(5).reverse();

const isEditMode = ref(props.isEditMode);
const symptom = ref(props.symptom ? props.symptom : "");
const selectedSeverity = ref(
  props.severity ? severityOptions[props.severity] : null,
);
const timestamp = ref(null as Date | null);
const filteredSuggestions = ref([] as string[]);

const symptomIsEmpty = computed(() => symptom.value.trim().length < 1);

watch(selectedSeverity, (newSeverity) => {
  if (!newSeverity) return;

  if (!timestamp.value) timestamp.value = new Date();

  const json = localStorage.getItem("symptoms");
  const parsedData: Array<{ symptom: string; severity: number }> = json
    ? JSON.parse(json)
    : [];

  const newData = {
    symptom: symptom.value,
    severity: newSeverity.value,
  };

  const containsSymptom =
    parsedData.filter(
      (a) => a.symptom === newData.symptom && a.severity === newData.severity,
    ).length > 0;

  if (containsSymptom) {
    return;
  }
  parsedData.push(newData);
  localStorage.setItem("symptoms", JSON.stringify(parsedData));
});

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
          <PButton
            severity="secondary"
            variant="text"
            icon="ti ti-trash"
            :onClick="onDelete"
            rounded
          />
          <PButton
            severity="secondary"
            icon="ti ti-check"
            rounded
            :disabled="symptomIsEmpty"
            :onClick="() => (isEditMode = false)"
          />
        </div>
        <hr class="my-3" />
        <div class="severity-descriptions">
          <template v-for="severity in severityOptions" :key="severity.value">
            <p
              class="description my-2"
              :style="{ color: colorValues[severity.value - 1].css }"
            >
              <span class="mr-2">Severity {{ severity.value }}:</span
              ><span>{{ severity.description }}</span>
            </p>
          </template>
        </div>
      </div>
      <div class="show-mode is-flex is-align-items-center" v-else>
        <div>
          <p
            class="activity title has-text-weight-medium is-size-6 m-0"
            style="min-width: 5rem"
          >
            {{ symptom }}
          </p>
          <p class="description has-text-grey">
            {{
              timestamp
                ? timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }}
          </p>
        </div>
        <PButton
          variant="text"
          icon="ti ti-settings"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = true)"
        />
        <div class="spacer is-flex-grow-1"></div>
        <PSelectButton
          class="severity-selector"
          v-model="selectedSeverity"
          :options="severityOptions"
          optionLabel="value"
        />
      </div>
    </template>
  </PCard>
</template>

<style lang="css"></style>
