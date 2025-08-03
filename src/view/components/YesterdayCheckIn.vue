<script setup lang="ts">
import { ref } from "vue";
import ActivityCard from "./ActivityCard.vue";
import MedsCard from "./MedsCard.vue";
import StepsCard from "./StepsCard.vue";

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
</script>

<template>
  <div id="yesterday">
    <h2 class="title is-5">Yesterday</h2>
    <div class="steps">
      <h3 class="has-text-weight-bold is-6 mb-2">Total steps</h3>
      <StepsCard />
    </div>
    <div class="activities my-5">
      <h3 class="is-6 mb-2 has-text-weight-bold">
        Did you complete these activities?
      </h3>
      <!--TODO: Ask user to check off the activities they managed to do yesterday.-->
      <template v-for="activity in activities" :key="activity.activity">
        <ActivityCard
          class="mb-1"
          :activity="activity.activity"
          :severity="activity.severity"
          :icon="activity.icon"
          :is-edit-mode="activity.isEditMode"
          :is-done="activity.isDone"
        />
      </template>
      <PButton
        class="mt-2"
        label="Add activity"
        icon="ti ti-plus"
        variant="outlined"
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
      <h3 class="has-text-weight-bold is-6 mb-4">
        Did you take your meds yesterday?
      </h3>
      <template v-for="med in meds" :key="med.name">
        <MedsCard
          class="mb-1"
          :med="med.name"
          :dose="med.dose"
          :times="med.times"
          :is-edit-mode="med.isEditMode"
          :taken="med.taken"
        />
      </template>
      <PButton
        class="mt-2"
        label="Add med"
        icon="ti ti-plus"
        variant="outlined"
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
    <div>
      <!-- <h3>Steps</h3> -->
    </div>
    <!-- <div class="meds"> -->
    <!--   <h3>Did you take your medications?</h3> -->
    <!--   <PCard> -->
    <!--     <template #content> -->
    <!--       <p>Test</p> -->
    <!--     </template> -->
    <!--   </PCard> -->
    <!-- </div> -->
  </div>
</template>
