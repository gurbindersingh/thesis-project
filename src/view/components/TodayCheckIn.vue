<script setup lang="ts">
import { router } from "@/router";
import { computed, ref } from "vue";
import ActivityCard from "./ActivityCard.vue";
import CrashCard from "./CrashCard.vue";
import MedsCard from "./MedsCard.vue";
import SleepCard from "./SleepCard.vue";
import StepsCard from "./StepsCard.vue";
import SymptomsCard from "./SymptomsCard.vue";
import { useRoute } from "vue-router";

const activities = ref([
  {
    activity: "Work",
    severity: 3,
    isEditMode: false,
    isDone: false,
    icon: "briefcase",
  },
  {
    activity: "Make dinner",
    severity: 2,
    isEditMode: false,
    isDone: false,
    icon: "chef-hat",
  },
  {
    activity: "Clean up",
    severity: 2,
    isEditMode: false,
    isDone: false,
    icon: "wash",
  },
  {
    activity: "Shower",
    severity: 1,
    isEditMode: false,
    isDone: false,
    icon: "bath",
  },
]);

const meds = ref([
  {
    name: "LDN",
    isEditMode: false,
    taken: [false],
    dose: "25 ml",
    times: [0],
  },
  {
    name: "Antihistamines",
    isEditMode: false,
    taken: [false, false],
    dose: "4.5 mg",
    times: [0, 2],
  },
  {
    name: "Pain med",
    isEditMode: false,
    taken: [false, false, false, false],
    dose: "2 g/5 ml",
    times: [0, 1, 2, 3],
  },
]);

const symptoms = ref([
  {
    symptom: "Brainfog",
    isEditMode: false,
  },
  {
    symptom: "Neck pain",
    isEditMode: false,
  },
  {
    symptom: "Heartburn",
    isEditMode: false,
  },
]);

const route = useRoute();

const isModeMorning = computed(
  () =>
    !route.params.mode ||
    (typeof route.params.mode === "string" &&
      route.params.mode.endsWith("morning")),
);

function deleteSymptom(symptom: { symptom: string; isEditMode: boolean }) {
  symptoms.value.splice(symptoms.value.indexOf(symptom), 1);
}

function deleteMed(med: {
  name: string;
  isEditMode: boolean;
  taken: boolean[];
  dose: string;
  times: number[];
}) {
  meds.value.splice(meds.value.indexOf(med), 1);
}

function deleteActivity(activity: {
  activity: string;
  severity: number;
  isEditMode: boolean;
  isDone: boolean;
  icon: string;
}) {
  activities.value.splice(activities.value.indexOf(activity), 1);
}
</script>

<template>
  <div id="today">
    <div class="stats">
      <h3 class="subtitle is-6">Are you having a crash?</h3>
      <CrashCard />
      <h3 class="subtitle is-6">Total steps</h3>
      <StepsCard />
      <h3 class="subtitle is-6">How did you sleep last night?</h3>
      <SleepCard />
      <h3 class="subtitle is-6">Check fatigue level</h3>
      <PButton
        class="has-background-primary mb-2"
        label="Use hand grip strength"
        icon="ti ti-arrow-right"
        iconPos="right"
        size="large"
        rounded
        fluid
        :onClick="() => {}"
      />
      <PButton
        class="has-background-primary mb-2"
        label="Use heart-rate variability"
        icon="ti ti-arrow-right"
        iconPos="right"
        size="large"
        rounded
        fluid
        :onClick="() => {}"
      />
      <PButton
        class="has-background-primary"
        label="Use psychomotor vigiliance task"
        icon="ti ti-arrow-right"
        iconPos="right"
        size="large"
        rounded
        fluid
        :onClick="() => {}"
      />
    </div>
    <div class="symptoms">
      <h3 class="subtitle is-6">What symptoms do you have?</h3>
      <template v-for="symptom in symptoms" :key="symptom.symptom">
        <SymptomsCard
          :symptom="symptom.symptom"
          :is-edit-mode="symptom.isEditMode"
          :onDelete="() => deleteSymptom(symptom)"
        />
      </template>
      <PButton
        class="has-text-primary"
        label="Add symptom"
        icon="ti ti-plus"
        variant="outlined"
        size="large"
        rounded
        fluid
        :onClick="
          () =>
            symptoms.push({
              symptom: '',
              isEditMode: true,
            })
        "
      />
    </div>

    <div class="meds">
      <h3 class="subtitle is-6">What meds/supplements did you take?</h3>
      <template v-for="med in meds" :key="med.name">
        <MedsCard
          :med="med.name"
          :dose="med.dose"
          :times="med.times"
          :is-edit-mode="med.isEditMode"
          :taken="med.taken"
          :onDelete="() => deleteMed(med)"
        />
      </template>
      <PButton
        class="has-text-primary"
        label="Add med/supplement"
        icon="ti ti-plus"
        variant="outlined"
        size="large"
        rounded
        fluid
        :onClick="
          () =>
            meds.push({
              name: '',
              dose: '',
              times: [],
              isEditMode: true,
              taken: [],
            })
        "
      />
    </div>
    <div class="activities">
      <h3 class="subtitle is-6">Did you complete these activities?</h3>
      <template v-for="activity in activities" :key="activity.activity">
        <ActivityCard
          :activity="activity.activity"
          :severity="activity.severity"
          :icon="activity.icon"
          :is-edit-mode="activity.isEditMode"
          :is-done="activity.isDone"
          :onDelete="() => deleteActivity(activity)"
        />
      </template>
      <PButton
        class="has-text-primary"
        label="Add activity"
        variant="outlined"
        icon="ti ti-plus"
        size="large"
        rounded
        fluid
        :onClick="
          () =>
            activities.push({
              activity: '',
              severity: 2,
              isEditMode: true,
              isDone: false,
              icon: 'briefcase',
            })
        "
      />
    </div>

    <PButton
      class="mt-5 has-background-primary"
      label="Calculate budget"
      size="large"
      fluid
      rounded
      :onClick="() => router.push('/diagnostic')"
    />
  </div>
</template>

<style lang="css"></style>
