<script setup lang="ts">
// TODO: Use custom severity buttons if there is time.
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  med: string;
  dose: string;
  times: number[];
  taken: boolean[];
  isEditMode: boolean;
  onDelete?: () => void;
}>();

const timeOptions = [
  {
    order: 0,
    label: "Morning",
    icon: "sunrise",
    taken: props.taken[0] || false,
  },
  {
    order: 1,
    label: "Noon",
    icon: "sun",
    taken: props.taken[1] || false,
  },
  {
    order: 2,
    label: "Evening",
    icon: "sunset",
    taken: props.taken[2] || false,
  },
  {
    order: 3,
    label: "Night",
    icon: "moon",
    taken: props.taken[3] || false,
  },
];
const autocompleteList = [
  "Aspirin",
  "Paracetamol",
  "LDN",
  "Anti-histamine",
  "Vitamin D",
  "Vitamin B",
];

const isEditMode = ref(props.isEditMode);

const medName = ref(props.med);
const dose = ref(props.dose);
const filteredSuggestions = ref([] as string[]);
const selectedTimes = ref(props.times.map((t) => timeOptions[t]));

const medNameIsEmpty = computed(() => medName.value.trim().length < 1);

function search(event: { query: string }) {
  filteredSuggestions.value = autocompleteList.filter((s) =>
    s.toLowerCase().includes(event.query.toLowerCase()),
  );
}

onMounted(() => {
  for (let i = 0; i < props.times.length; i++) {
    timeOptions[props.times[i]].taken = props.taken[i];
  }
});
</script>

<template>
  <PCard class="med-card">
    <template #content>
      <div class="edit-mode" v-if="isEditMode">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between mb-4"
        >
          <PAutoComplete
            class="is-flex-grow-1 mr-2"
            v-model="medName"
            placeholder="Medication name"
            :emptySearchMessage="'Adding: ' + medName"
            :suggestions="filteredSuggestions"
            :invalid="medNameIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
          <PInputText v-model="dose" placeholder="Dose" style="width: 40%" />
          <PButton icon="ti ti-trash" variant="text" severity="contrast" />
        </div>
        <PSelectButton
          class="time-selector mb-4"
          v-model="selectedTimes"
          :options="timeOptions"
          optionLabel="label"
          multiple
          size="large"
          fluid
        >
        </PSelectButton>
        <p class="description is-italic mb-3">
          Note: This will only change this entry. To make a permanent change,
          use the <a>medication list</a>.
        </p>
        <PButton
          label="Save"
          variant="outlined"
          severity="contrast"
          rounded
          fluid
          :onClick="() => (isEditMode = false)"
        />
      </div>

      <div class="check-mode" v-else>
        <div class="is-flex is-align-items-center mb-4">
          <p class="med title has-text-weight-medium is-size-6 m-0">
            <span class="name mr-2">{{ medName }}</span>
            <span class="dose">({{ dose }})</span>
          </p>
          <PButton
            class="p-0"
            variant="text"
            icon="ti ti-settings"
            severity="secondary"
            size="large"
            :onClick="() => (isEditMode = true)"
          />
        </div>
        <template
          v-for="time in selectedTimes.sort((a, b) => a.order - b.order)"
          :key="time.order"
        >
          <div>
            <div class="is-flex is-align-items-center mb-2">
              <i
                class="ti has-text-bold is-size-5 mr-2"
                :class="'ti-' + time.icon"
              ></i>
              <p class="time is-flex-grow-1">{{ time.label }}</p>
              <PSelectButton
                class="done-selector"
                v-model="time.taken"
                :options="['Yes', 'No']"
                :optionValue="(val: string) => val === 'Yes'"
                size="large"
              />
            </div>
          </div>
        </template>
      </div>
    </template>
  </PCard>
</template>
