<script setup lang="ts">
// TODO: Use custom severity buttons if there is time.
import { computed, ref } from "vue";

const props = defineProps<{
  activity?: string;
  severity?: number;
  initialMode?: "edit" | "check";
  icon: string;
}>();

// prettier-ignore
const severityOptions = ref([
  {
    label: 1,
    impact: "low",
    severityClass: "has-text-success",
    description: "I can safely do <em>more</em> than 5-6 such activities without a crash.",
  },
  {
    label: 2,
    impact: "mild",
    severityClass: "has-text-warning",
    description: "I <em>cannot</em> safely do more than 3-6 such activities without crashing.",
  },
  {
    label: 3,
    impact: "high",
    severityClass: "has-text-caution",
    description: "I <em>cannot</em> safely do more than one such activity without crashing.",
  },
  {
    label: 4,
    impact: "severe",
    severityClass: "has-text-danger",
    description: "I <em>cannot</em> safely do such an activity without crashing.",
  },
]);
const allSuggestions = [
  "Work",
  "Cook",
  "Get groceries",
  "Doctor's visit",
  "Return package",
  "Go to pharmacy",
];

const localActivity = ref(props.activity ? props.activity : "");
const isEditMode = ref(
  (props.initialMode && props.initialMode == "edit") || !props.activity,
);
const selectedSeverity = ref(
  props.severity
    ? severityOptions.value[props.severity - 1]
    : severityOptions.value[2],
);
const isDone = ref(false);

const filteredSuggestions = ref([] as string[]);

const activityIsEmpty = computed(() => localActivity.value.trim().length < 1);

function search(event: { query: string }) {
  filteredSuggestions.value = allSuggestions.filter((s) =>
    s.toLowerCase().includes(event.query.toLowerCase()),
  );
}
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="edit-mode" v-if="isEditMode">
        <div class="is-flex mb-4">
          <PButton
            class="mr-2"
            :icon="'ti ti-' + icon"
            variant="outlined"
            severity="contrast"
          />
          <PAutoComplete
            class="is-flex-grow-1"
            v-model="localActivity"
            :emptySearchMessage="'Adding: ' + localActivity"
            :suggestions="filteredSuggestions"
            :invalid="activityIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
        </div>
        <PSelectButton
          class="severity-selector mb-2"
          v-model="selectedSeverity"
          :options="severityOptions"
          size="large"
          fluid
        >
          <template #option="slotProps">
            <span style="width: 100%">
              {{ slotProps.option.label }}
            </span>
          </template>
        </PSelectButton>
        <p
          class="description mb-4"
          :class="selectedSeverity.severityClass + '-40'"
        >
          <span class="mr-1 is-capitalized">{{ selectedSeverity.impact }}</span>
          <span>impact:</span>
          <span class="ml-1" v-html="selectedSeverity.description"></span>
        </p>
        <PButton
          label="Save"
          severity="contrast"
          size="large"
          variant="outlined"
          fluid
          :disabled="activityIsEmpty"
          :onClick="() => (isEditMode = false)"
        />
      </div>

      <div class="check-mode is-flex is-align-items-center" v-else>
        <i
          class="ti has-text-weight-bold is-size-4 mr-3"
          :class="'ti-' + icon"
        ></i>
        <div>
          <p class="activity title is-size-6 m-0">
            {{ localActivity }}
          </p>
          <p class="description has-text-grey">
            <span class="is-capitalized mr-1">{{
              selectedSeverity.impact
            }}</span>
            <span>impact</span>
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
        <div class="is-flex-shrink-0">
          <PSelectButton
            class="done-selector"
            v-model="isDone"
            :options="['Yes', 'No']"
            :optionValue="(val: string) => val === 'Yes'"
            size="large"
          />
        </div>
      </div>
      <div
        class="is-flex is-align-items-center is-justify-content-space-between"
      ></div>
    </template>
  </PCard>
</template>

<style lang="css">
.activity-card .description {
  font-size: 0.9rem;
}

.activity-card .p-card-body {
  padding: 0.75rem;
}

.has-text-caution {
  color: hsl(23, 100%, 61%);
}

.has-text-caution-40 {
  color: hsl(25, 100%, 45%);
}
</style>
