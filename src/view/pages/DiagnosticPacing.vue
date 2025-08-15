<script setup lang="ts">
import { ref } from "vue";

const budget = 12;
const currentBudget = ref(10);
const steps = ref(localStorage.getItem("steps"));
const activities = ref([
  {
    name: "Work",
    cost: 8,
    icon: "briefcase",
  },
  {
    name: "Make dinner",
    cost: 2,
    icon: "chef-hat",
  },
  {
    name: "Clean up",
    cost: 2,
    icon: "wash",
  },
  {
    name: "Shower",
    cost: 1,
    icon: "bath",
  },
]);
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
        v-model="currentBudget"
      />
      <h2 class="subtitle is-5 mb-2">Points</h2>
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
              <p class="ml-2 has-text-weight-bold">Steps: {{ steps }}</p>
            </div>
          </template>
        </PCard>
        <PCard v-for="activity in activities" :key="activity.name">
          <template #content>
            <div class="is-flex is-align-items-center">
              <i class="is-size-5" :class="'ti ti-' + activity.icon"></i>
              <p class="has-text-weight-bold is-flex-grow-1 ml-2">
                {{ activity.name }}
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
