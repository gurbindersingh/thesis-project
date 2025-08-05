<script setup lang="ts">
import { ref } from "vue";
import ActivityCard from "./ActivityCard.vue";
import MedsCard from "./MedsCard.vue";
import StepsCard from "./StepsCard.vue";
import SymptomsCard from "./SymptomsCard.vue";

const activities = ref([
  {
    activity: "Activity 1",
    severity: 3,
    isEditMode: false,
    isDone: true,
    icon: "briefcase",
  },
  {
    activity: "Activity 2",
    severity: 2,
    isEditMode: false,
    isDone: false,
    icon: "chef-hat",
  },
  {
    activity: "Activity 3",
    severity: 2,
    isEditMode: false,
    isDone: false,
    icon: "wash",
  },
  {
    activity: "Activity 4",
    severity: 1,
    isEditMode: false,
    isDone: true,
    icon: "bath",
  },
]);

const meds = ref([
  {
    name: "Med 1",
    isEditMode: false,
    taken: [true],
    dose: "25 ml",
    times: [0],
  },
  {
    name: "Med 2",
    isEditMode: false,
    taken: [true, false],
    dose: "4.5 mg",
    times: [0, 2],
  },
  {
    name: "Med 3",
    isEditMode: false,
    taken: [true, true, false, false],
    dose: "2 g/5 ml",
    times: [0, 1, 2, 3],
  },
]);

const symptoms = ref([
  {
    symptom: "Brainfog",
    severity: 4,
    isEditMode: true,
  },
]);
</script>

<template>
  <div id="yesterday">
    <h2 class="title is-4 has-text-primary">Yesterday</h2>
    <div class="steps">
      <h3 class="subtitle is-6">Total steps</h3>
      <StepsCard />
    </div>
    <div class="activities">
      <h3 class="subtitle is-6">Did you complete these activities?</h3>
      <!--TODO: Ask user to check off the activities they managed to do yesterday.-->
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
        label="Add activity"
        icon="ti ti-plus"
        variant="outlined"
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
    <div class="symptoms">
      <h3 class="subtitle is-6" style="color: oklch(50% 0.4 98)">
        What symptoms did you have?
      </h3>
      <template v-for="symptom in symptoms" :key="symptom.symptom">
        <SymptomsCard
          :symptom="symptom.symptom"
          :severity="symptom.severity"
          :is-edit-mode="symptom.isEditMode"
        />
      </template>
      <PButton
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

<style lang="css">
#yesterday .p-card {
  margin-bottom: 0.5rem;
}

#yesterday .subtitle {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

#yesterday .p-card-body {
  padding: 0.75rem;
}

#yesterday .description {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
}
</style>
