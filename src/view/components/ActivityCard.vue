<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  activity: string;
  initialMode?: "edit" | "check";
}>();

// prettier-ignore
const severityOptions = ref([
  {
    label: "1",
    description: "Low impact. I can safely do <em>more</em> than 5-6 such activities without a crash.",
  },
  {
    label: "2",
    description: "Medium impact. I <em>cannot</em> safely do more than 3-6 such activities without crashing.",
  },
  {
    label: "3",
    description: "High impact. I <em>cannot</em> safely do more than one such activity without crashing.",
  },
  {
    label: "4",
    description: "Severe impact. I <em>cannot</em> safely do such an activity without crashing.",
  },
]);

const selectedSeverity = ref(severityOptions.value[1]);
const isDone = ref(false);
// const isEditMode = ref(props.initialMode && props.initialMode == "edit");
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div
        class="selector mb-3 is-flex is-align-items-center is-justify-content-space-between"
      >
        <p class="activity title is-size-6 m-0">
          {{ activity }}
        </p>
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <PSelectButton
            class="done-selector"
            v-model="isDone"
            :options="['Yes', 'No']"
            :optionValue="(val: string) => val === 'Yes'"
            size="large"
          />
          <PSelectButton
            class="severity-selector"
            v-model="selectedSeverity"
            :options="severityOptions"
            optionLabel="label"
            size="large"
          >
          </PSelectButton>
          <PButton
            variant="text"
            icon="ti ti-settings"
            severity="secondary"
            size="large"
          />
          <PButton
            variant="text"
            icon="ti ti-check"
            severity="secondary"
            size="large"
          />
          <PButton
            variant="text"
            icon="ti ti-trash"
            severity="secondary"
            size="large"
          />
        </div>
      </div>
      <hr class="my-3" />
      <p class="description has-text-grey-light">
        <span>Description: </span>
        <span v-html="selectedSeverity.description"></span>
      </p>
    </template>
  </PCard>
</template>

<style lang="css">
.activity-card {
  .description {
    font-size: 0.9rem;
  }
}
</style>
