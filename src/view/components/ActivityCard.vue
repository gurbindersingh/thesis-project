<script setup lang="ts">
// TODO: Use custom severity buttons if there is time.
import { createColorSteps } from "@/services/color-steps";
import { computed, ref } from "vue";

const props = defineProps<{
  activity?: string;
  severity?: number;
  isEditMode?: boolean;
  icon: string;
  isDone?: boolean;
  onDelete?: () => void;
}>();

// prettier-ignore
const severityOptions = ref([
  {
    value: 1,
    impact: "low",
    description: "I can safely do <em>more</em> than 5-6 such activities without a crash.",
  },
  {
    value: 2,
    impact: "mild",
    description: "I <em>cannot</em> safely do more than 3-6 such activities without crashing.",
  },
  {
    value: 3,
    impact: "high",
    description: "I <em>cannot</em> safely do more than one such activity a day without crashing.",
  },
  {
    value: 4,
    impact: "severe",
    description: "I <em>cannot</em> safely do such an activity a day without crashing.",
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
const colorValues = createColorSteps(0, 120, 4).reverse();

const localActivity = ref(props.activity ? props.activity : "");
const isEditMode = ref(props.isEditMode || !props.activity);
const selectedSeverity = ref(
  props.severity
    ? severityOptions.value[props.severity - 1]
    : severityOptions.value[2],
);
const isDone = ref(props.isDone);

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
            :emptySearchMessage="'Add new activity: ' + localActivity"
            :suggestions="filteredSuggestions"
            :invalid="activityIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
          <PButton icon="ti ti-trash" variant="text" severity="contrast" />
        </div>

        <p
          class="description mb-2"
          :style="{
            color: colorValues[selectedSeverity.value - 1].css,
          }"
        >
          <span class="mr-1 is-capitalized">{{ selectedSeverity.impact }}</span>
          <span>impact:</span>
          <span class="ml-1" v-html="selectedSeverity.description"></span>
        </p>
        <PSelectButton
          class="severity-selector mb-4"
          v-model="selectedSeverity"
          :options="severityOptions"
          optionLabel="value"
          size="large"
          fluid
        >
          <!-- <template #option="slotProps"> -->
          <!--   <span style="width: 100%"> -->
          <!--     {{ slotProps.option.value }} -->
          <!--   </span> -->
          <!-- </template> -->
        </PSelectButton>
        <PButton
          label="Save"
          severity="secondary"
          fluid
          rounded
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
          <p class="activity title has-text-weight-medium is-size-6 m-0">
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
