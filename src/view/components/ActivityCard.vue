<script setup lang="ts">
import { ref } from "vue";

// prettier-ignore
const options = ref([
  {
    label: "1",
    description: "Low impact. I can safely do <u>more</u> than 5-6 such activities without a crash.",
  },
  {
    label: "2",
    description: "Medium impact. I <u>cannot</u> safely do more than 3-6 such activities without crashing.",
  },
  {
    label: "3",
    description: "High impact. I <u>cannot</u> safely do more than one such activity without crashing.",
  },
  {
    label: "4",
    description: "Severe impact. I <u>cannot</u> safely do such an activity without crashing.",
  },
]);

const selected = ref(options.value[1]);
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-content-center">
        <p class="title is-size-6 m-0">Placeholder task</p>
        <PSelectButton
          v-model="selected"
          :options="options"
          optionLabel="label"
          size="large"
        >
        </PSelectButton>
      </div>
      <p class="mb-3">
        <span>Description: </span>
        <span v-html="selected.description"></span>
      </p>
    </template>
  </PCard>
</template>

<style lang="css"></style>
