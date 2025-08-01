<script setup lang="ts">
// TODO: Use custom severity buttons if there is time.
import { computed, ref } from "vue";

const props = defineProps<{
  med: { name: string; dose: string; times: number[] };
}>();

const medTimes = ["Morning", "Noon", "Evening", "Night"];
const timeIcons = ["sunrise", "sun", "sunset", "moon"];
const medicationList = [
  "Aspirin",
  "Paracetamol",
  "LDN",
  "Anti-histamine",
  "Vitamin D",
  "Vitamin B",
];

const localMed = ref(props.med);
const filteredSuggestions = ref([] as string[]);
const takenMeds = ref(
  props.med.times.map((t) => ({ time: t, takenMeds: false })),
);
const selectedTimes = ref(props.med.times.map((t) => medTimes[t]));
const isEditMode = ref(false);

const activityIsEmpty = computed(() => localMed.value.name.trim().length < 1);

function search(event: { query: string }) {
  filteredSuggestions.value = medicationList.filter((s) =>
    s.toLowerCase().includes(event.query.toLowerCase()),
  );
}
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
            v-model="localMed.name"
            :emptySearchMessage="'Adding: ' + localMed.name"
            :suggestions="filteredSuggestions"
            :invalid="activityIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
          <PInputText v-model="localMed.dose" style="width: 40%" />
        </div>
        <PSelectButton
          class="severity-selector mb-4"
          v-model="selectedTimes"
          :options="medTimes"
          multiple
          size="large"
          fluid
        >
          <template #option="slotProps">
            <span style="width: 100%">
              {{ slotProps.option }}
            </span>
          </template>
        </PSelectButton>
        <p class="description is-italic mb-3">
          Note: This will only change this entry. To make a permanent change,
          use the <a>medication list</a>.
        </p>
        <PButton
          label="Save"
          variant="outlined"
          severity="contrast"
          fluid
          :onClick="() => (isEditMode = false)"
        />
      </div>

      <div class="check-mode" v-else>
        <div class="is-flex is-align-items-center mb-4">
          <p class="med title is-size-6 m-0">
            <span class="name mr-2">{{ localMed.name }}</span>
            <span class="dose">({{ localMed.dose }})</span>
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
        <template v-for="(time, index) in localMed.times" :key="time">
          <div>
            <div class="is-flex is-align-items-center mb-2">
              <i
                class="ti has-text-bold is-size-5 mr-2"
                :class="'ti-' + timeIcons[time]"
              ></i>
              <p class="time is-flex-grow-1">{{ medTimes[time] }}</p>
              <PSelectButton
                class="done-selector"
                v-model="takenMeds[index].takenMeds"
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

<style lang="css">
.med-card .p-card-body {
  padding: 0.75rem;
}

.med-card .description {
  font-size: 0.9rem;
}
</style>
