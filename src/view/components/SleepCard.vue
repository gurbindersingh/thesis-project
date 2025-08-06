<script setup lang="ts">
import { redToGreenSteps } from "@/services/color-steps";
import { ref } from "vue";

const sleepScoreOptions: Array<{ score: number; description: string }> = [
  {
    score: 1,
    description: "Awful. Got little to no sleep.",
  },
  {
    score: 2,
    description: "Bad. I got less than 6 hours of uninterrupted sleep.",
  },
  {
    score: 3,
    description: "Decent. I got at least 6 hours of uninterrupted sleep.",
  },
  {
    score: 4,
    description: "Good. I got at least 8 hours of uninterrupted sleep.",
  },
];
const colorValues = redToGreenSteps(4);

const isEditMode = ref(false);
const sleepTime = ref("07:23");
const selectedScore = ref(
  null as { score: number; description: string } | null,
);
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-items-center">
        <i class="ti ti-zzz has-text-weight-bold is-size-4 mr-5" />
        <PInputText v-model="sleepTime" type="time" v-if="isEditMode" />
        <p class="has-text-weight-semibold" v-else>
          <span>{{ sleepTime }}</span>
          <span class="ml-1">h</span>
        </p>
        <PButton
          variant="text"
          icon="ti ti-check"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = false)"
          v-if="isEditMode"
        />
        <PButton
          variant="text"
          icon="ti ti-pencil"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = true)"
          v-else
        />
        <div class="spacer is-flex-grow-1"></div>
        <PSelectButton
          class="severity-selector"
          v-model="selectedScore"
          :options="sleepScoreOptions"
          optionLabel="score"
        />
      </div>
      <p
        class="description mt-2"
        :style="{
          color: colorValues[selectedScore ? selectedScore.score - 1 : 0].css,
        }"
        v-if="selectedScore"
      >
        {{ selectedScore?.description }}
      </p>
    </template>
  </PCard>
</template>
