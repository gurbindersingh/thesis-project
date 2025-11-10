<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

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

// NOTE: A watcher like this only detects changes one level deep. If you want
// to watch for all changes, pass `{deep: true}` as the third parameter. Or
// pass a callback as the first parameter if you only care for a subset of the
// data.
// watch(
//   selectedTimes,
//   (newValues) => {
//     console.log(newValues);
//   },
//   { deep: false },
// );

watch(
  () => selectedTimes.value.map((t) => t.taken),
  () => {
    const json = localStorage.getItem("meds");
    const meds: Array<{
      name: string;
      dose: string;
      times: { time: number; timeStr: string }[];
    }> = json ? JSON.parse(json) : [];

    const newData = {
      name: medName.value,
      dose: dose.value,
      times: selectedTimes.value
        .filter((t) => t.taken)
        .map((t) => ({ time: t.order, timeStr: t.label })),
    };
    console.log(newData);

    const i = meds.findIndex(
      (m) => m.name === medName.value && m.dose === dose.value,
    );
    if (i >= 0) meds[i] = newData;
    else meds.push(newData);
    localStorage.setItem("meds", JSON.stringify(meds));
  },
);
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
            :emptySearchMessage="'Adding new med: ' + medName"
            :suggestions="filteredSuggestions"
            :invalid="!medName"
            completeOnFocus
            fluid
            @complete="search"
          />
          <PInputText
            v-model="dose"
            :invalid="!dose"
            placeholder="Dose"
            style="width: 40%"
          />
          <PButton
            icon="ti ti-trash"
            variant="text"
            severity="contrast"
            :onClick="onDelete"
          />
        </div>
        <p class="has-text-weight-medium mb-2">When do you need to take it?</p>
        <PSelectButton
          class="time-selector mb-4"
          v-model="selectedTimes"
          :options="timeOptions"
          optionLabel="label"
          multiple
          fluid
        >
        </PSelectButton>
        <p class="has-text-weight-medium mb-2">Reminders</p>
        <div class="reminder-group mb-4">
          <div class="reminder is-flex is-align-items-center mb-2">
            <PCheckbox binary /><label class="ml-2">Morning</label>
            <div class="spacer is-flex-grow-1"></div>
            <PDatePicker class="datepicker-timeonly" timeOnly fluid />
          </div>
          <div class="reminder is-flex is-align-items-center mb-2">
            <PCheckbox binary /><label class="ml-2">Noon </label>
            <div class="spacer is-flex-grow-1"></div>
            <PDatePicker class="datepicker-timeonly" timeOnly fluid />
          </div>
          <div class="reminder is-flex is-align-items-center mb-2">
            <PCheckbox binary /><label class="ml-2">Evening</label>
            <div class="spacer is-flex-grow-1"></div>
            <PDatePicker class="datepicker-timeonly" timeOnly fluid />
          </div>
          <div class="reminder is-flex is-align-items-center mb-2">
            <PCheckbox binary /><label class="ml-2">Night </label>
            <div class="spacer is-flex-grow-1"></div>
            <PDatePicker class="datepicker-timeonly" timeOnly fluid />
          </div>
        </div>
        <PButton
          label="Save"
          severity="secondary"
          rounded
          fluid
          :disabled="!medName || !dose"
          :onClick="() => (isEditMode = false)"
        />
      </div>

      <div class="show-mode" v-else>
        <div class="is-flex is-align-items-center">
          <p class="med title has-text-weight-medium is-size-6 m-0">
            <span class="name mr-2">{{ medName }}</span>
            <span class="dose">({{ dose }})</span>
          </p>
          <PButton
            class="p-0 ml-1"
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
          <div class="is-flex is-align-items-center my-2">
            <i
              class="ti has-text-bold is-size-5 mr-2"
              :class="'ti-' + time.icon"
            ></i>
            <p class="time is-flex-grow-1">{{ time.label }}</p>
            <PButton
              class="mr-1 p-0"
              icon="ti ti-alarm-filled"
              variant="text"
              severity="contrast"
              size="large"
              v-if="Math.random() < 0.5"
            />
            <PSelectButton
              class="done-selector"
              v-model="time.taken"
              :options="['Yes', 'No']"
              :optionValue="(val: string) => val === 'Yes'"
              :allowEmpty="false"
            />
          </div>
        </template>
      </div>
    </template>
  </PCard>
</template>
