<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const budget = 16;
const currentBudget = ref(budget);
const boundedBudget = computed(() =>
  currentBudget.value >= 0 ? currentBudget : 0,
);
const steps = ref(Number(localStorage.getItem("steps")).valueOf());
const stepCost = computed(() => {
  if (steps.value > 10000) return 16;
  if (steps.value > 8000) return 4;
  if (steps.value > 6000) return 2;
  return 1;
});

const activities = [
  {
    name: "Work",
    cost: 10,
    icon: "briefcase",
    completed: false,
  },
  {
    name: "Make dinner",
    cost: 2,
    icon: "chef-hat",
    completed: false,
  },
  {
    name: "Clean up",
    cost: 2,
    icon: "wash",
    completed: false,
  },
  {
    name: "Shower",
    cost: 1,
    icon: "bath",
    completed: false,
  },
];

function getSymptoms() {
  const json = localStorage.getItem("symptoms");
  if (!json) return;

  const symptoms: { symptom: string; severity: number; timestamp: Date }[] =
    JSON.parse(json);

  const factor = symptoms
    .filter((s) => s.symptom === "Brainfog")
    .map((s) => s.severity)
    .reduce((prev, curr) => prev + curr);
  currentBudget.value -= factor;
}

function getActivities() {
  const json = localStorage.getItem("activities");
  if (!json) return;

  const doneActivities: { activity: string; severity: number }[] =
    JSON.parse(json);

  const factor = activities
    .filter((a) => doneActivities.map((a) => a.activity).includes(a.name))
    .map((a) => a.cost)
    .reduce((prev, curr) => prev + curr);
  currentBudget.value -= factor;

  activities
    .filter((a) => doneActivities.map((a) => a.activity).includes(a.name))
    .forEach((a) => (a.completed = true));
}

function getSleep() {
  const json = localStorage.getItem("sleep");
  if (!json) return;

  const sleep: { quality: number; length: string } = JSON.parse(json);

  const factor = (4 / sleep.quality - 1) * 2;
  currentBudget.value -= factor;
}

onMounted(() => {
  getSymptoms();
  getActivities();
  getSleep();
});
</script>

<template>
  <div id="diagnostic-pacing" class="mt-6">
    <div class="budget">
      <h1 class="title is-4">Your energy budget for today</h1>
      <PKnob
        size="200"
        :min="0"
        :max="budget"
        :strokeWidth="10"
        :readonly="true"
        :valueTemplate="`{value} / ${budget}`"
        v-model="boundedBudget"
      />
      <h2 class="subtitle is-5 mb-2" style="margin-top: -0.7rem">
        Points left
      </h2>
      <p class="description has-text-grey mb-4">
        Last calculated:
        {{
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>
      <div class="px-5">
        <p class="has-text-centered">
          This is your energy budget for the rest of the day based on the data
          you have provided.
        </p>
        <p class="mt-2 has-text-grey has-text-centered">
          This value will be updated throughout the day based on your activity.
        </p>
      </div>
      <div class="mt-6 costs" style="width: 100%">
        <PCard v-if="steps">
          <template #content>
            <div class="is-flex is-align-items-center">
              <i class="is-size-5 ti ti-walk"></i>
              <p class="ml-2 has-text-weight-bold is-flex-grow-1">
                Steps: {{ steps }}
              </p>
              <p class="description has-text-grey">
                <span>Energy cost: </span>
                <span>{{ stepCost }}</span>
              </p>
            </div>
          </template>
        </PCard>
        <PCard v-for="activity in activities" :key="activity.name">
          <template #content>
            <div class="is-flex is-align-items-center">
              <i class="is-size-5" :class="'ti ti-' + activity.icon"></i>
              <p class="has-text-weight-bold ml-2">
                {{ activity.name }}
              </p>
              <p class="description has-text-grey is-flex-grow-1 ml-2">
                ({{ activity.completed ? "Completed" : "Not completed" }})
              </p>
              <p class="description has-text-grey">
                <span>Energy cost: </span>
                <span>{{ activity.cost }}</span>
              </p>
            </div>
          </template>
        </PCard>
      </div>
    </div>
  </div>
</template>
