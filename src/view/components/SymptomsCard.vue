<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  symptom: string;
  severity?: number;
  isEditMode?: boolean;
  onDelete?: () => void;
}>();

const severityOptions = [
  {
    value: 0,
    description: "I have no symptoms.",
  },
  {
    value: 1,
    description: "My symptoms are only noticable if I pay attention.",
  },
  {
    value: 2,
    description:
      "I am constantly aware of my symptoms but they do not impact any activities.",
  },
  {
    value: 3,
    description: "I am unable to do some activities due to the symptoms.",
  },
  {
    value: 4,
    description:
      "I am unable to do due a lot of the activities due to the symptoms.",
  },
  {
    value: 5,
    description:
      "I am unable to do most of the activities due to the symptoms.",
  },
  {
    value: 6,
    description:
      "The symptoms are so severe that it is hard to think of anything else. Even talking and listening is difficult.",
  },
  {
    value: 7,
    description:
      "I had to go to the emergency room to get help for my symptoms.",
  },
];
const allSuggestions = ["Headache", "Neck pain", "Backpain", "Brainfog"];
// const colorValues = redToGreenSteps(5).reverse();

const isEditMode = ref(props.isEditMode);
const symptom = ref(props.symptom ? props.symptom : "");
const selectedSeverity = ref(
  props.severity ? severityOptions[props.severity] : severityOptions[0],
);
const timestamp = ref(null as Date | null);
const filteredSuggestions = ref([] as string[]);

const symptomIsEmpty = computed(() => symptom.value.trim().length < 1);

watch(selectedSeverity, (newSeverity, oldSeverity) => {
  // if (!timestamp.value)
  timestamp.value = new Date();

  const json = localStorage.getItem("symptoms");
  const symptoms: Array<{
    symptom: string;
    severity: number;
    timestamp: string;
  }> = json ? JSON.parse(json) : [];

  const i = symptoms.findIndex(
    (a) =>
      a.symptom === symptom.value &&
      a.timestamp === timestamp.value?.toISOString(),
  );

  console.log(newSeverity, oldSeverity);

  if (!newSeverity && i >= 0) {
    timestamp.value = null;
    console.log("Remove");
    symptoms.splice(i, 1);
  } else if (newSeverity) {
    console.log("Add");
    const newData = {
      symptom: symptom.value,
      severity: newSeverity.value,
      timestamp: timestamp.value?.toISOString(),
    };
    if (i < 0) {
      symptoms.push(newData);
    } else {
      symptoms[i] = newData;
    }
  }
  localStorage.setItem("symptoms", JSON.stringify(symptoms));
});

function search(event: { query: string }) {
  filteredSuggestions.value = allSuggestions.filter((s) =>
    s.toLowerCase().includes(event.query.toLowerCase()),
  );
}
</script>

<template>
  <PCard class="symptoms-card">
    <template #content>
      <div class="edit-mode" v-if="isEditMode">
        <div class="is-flex mb-2 is-align-items-center">
          <PAutoComplete
            class="is-flex-grow-1"
            v-model="symptom"
            :emptySearchMessage="'Add new symptom: ' + symptom"
            :suggestions="filteredSuggestions"
            :invalid="symptomIsEmpty"
            completeOnFocus
            fluid
            @complete="search"
          />
        </div>
        <div class="mb-2">
          <div class="mb-2">
            <p class="mb-2 has-text-weight-medium">
              When did you experience this symptom?
            </p>
            <div class="spacer is-flex-grow-1"></div>
            <PDatePicker
              class="datepicker-timeonly"
              v-model="timestamp"
              showTime
              showButtonBar
              fluid
            />
          </div>
        </div>
        <div class="mt-4">
          <PCheckbox binary />
          <label class="mt-4 ml-2"
            >Show symptom every day until I delete it
          </label>
        </div>
        <!-- <hr class="my-3" /> -->
        <!-- <div class="severity-descriptions mb-4"> -->
        <!--   <p class="has-text-weight-medium">Severity descriptions</p> -->
        <!--   <template v-for="severity in severityOptions" :key="severity.value"> -->
        <!--     <p -->
        <!--       class="description my-2" -->
        <!--       :style="{ color: colorValues[severity.value - 1].css }" -->
        <!--     > -->
        <!--       <span class="mr-2">Severity {{ severity.value }}:</span -->
        <!--       ><span>{{ severity.description }}</span> -->
        <!--     </p> -->
        <!--   </template> -->
        <!-- </div> -->
        <div class="is-flex mt-5">
          <PButton
            label="Delete"
            severity="secondary"
            variant="text"
            icon="ti ti-trash"
            :onClick="onDelete"
            fluid
            rounded
          />
          <div class="spacer mx-2"></div>
          <PButton
            label="Save"
            severity="secondary"
            rounded
            fluid
            :onClick="() => (isEditMode = false)"
          />
        </div>
      </div>
      <div class="show-mode" v-else>
        <div class="is-flex is-align-items-center">
          <div>
            <p
              class="activity title has-text-weight-medium is-size-6 m-0"
              style="min-width: 5rem"
            >
              {{ symptom }}
            </p>
          </div>
          <PButton
            variant="text"
            icon="ti ti-pencil"
            severity="secondary"
            size="large"
            :onClick="() => (isEditMode = true)"
          />
          <div class="spacer is-flex-grow-1"></div>
          <p class="description has-text-grey">
            {{
              timestamp
                ? timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }}
          </p>
        </div>
        <PSelectButton
          class="severity-selector"
          v-model="selectedSeverity"
          :options="severityOptions"
          :allowEmpty="false"
          optionLabel="value"
          fluid
        />
      </div>
      <p
        class="mt-2 severity description"
        v-if="!isEditMode && selectedSeverity"
      >
        Severity: {{ selectedSeverity.description }}
      </p>
    </template>
  </PCard>
</template>

<style lang="css"></style>
