<script setup lang="ts">
import { ref } from "vue";
import ActivityCard from "./ActivityCard.vue";
import MedsCard from "./MedsCard.vue";
import StepsCard from "./StepsCard.vue";
import SymptomsCard from "./SymptomsCard.vue";
import SleepCard from "./SleepCard.vue";
import CrashCard from "./CrashCard.vue";

const activities = ref([
  {
    activity: "Work",
    severity: 3,
    isEditMode: false,
    isDone: true,
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
    isDone: true,
    icon: "bath",
  },
]);

const meds = ref([
  {
    name: "LDN",
    isEditMode: false,
    taken: [true],
    dose: "25 ml",
    times: [0],
  },
  {
    name: "PPI",
    isEditMode: false,
    taken: [true, false],
    dose: "4.5 mg",
    times: [0, 2],
  },
  {
    name: "Pain med",
    isEditMode: false,
    taken: [true, true, false, false],
    dose: "2 g/5 ml",
    times: [0, 1, 2, 3],
  },
]);

const symptoms = ref([
  {
    symptom: "Brainfog",
    severity: 2,
    isEditMode: false,
  },
  {
    symptom: "Neck pain",
    severity: 2,
    isEditMode: false,
  },
  {
    symptom: "Heartburn",
    severity: 1,
    isEditMode: false,
  },
]);
</script>

<template>
  <div id="yesterday">
    <h2 class="title is-4 has-text-primary">Today</h2>
    <div class="stats">
      <h3 class="subtitle is-6">Are you having a crash?</h3>
      <CrashCard />
      <h3 class="subtitle is-6">Total steps</h3>
      <StepsCard />
      <h3 class="subtitle is-6">How did you sleep last night?</h3>
      <SleepCard />
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
    <div class="meds">
      <h3 class="subtitle is-6">Did you take your meds/supplements?</h3>
      <template v-for="med in meds" :key="med.name">
        <MedsCard
          :med="med.name"
          :dose="med.dose"
          :times="med.times"
          :is-edit-mode="med.isEditMode"
          :taken="med.taken"
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
              times: [0, 2],
              isEditMode: true,
              taken: [],
            })
        "
      />
    </div>
    <div class="symptoms">
      <h3 class="subtitle is-6">What symptoms did you have?</h3>
      <template v-for="symptom in symptoms" :key="symptom.symptom">
        <SymptomsCard
          :symptom="symptom.symptom"
          :severity="symptom.severity"
          :is-edit-mode="symptom.isEditMode"
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
              severity: 2,
              isEditMode: true,
            })
        "
      />
    </div>
  </div>
</template>

<style lang="css"></style>
