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

const breadcrumbs = [
  { label: "Morning baseline" },
  { label: "Symptoms" },
  { label: "Meds and Supplements" },
  { label: "Activities" },
];
const route = useRoute();

const multiPageView = computed(() => route.query.view === "multi-page");

const currentPageNr = computed(() =>
  route.query.page && typeof route.query.page === "string"
    ? parseInt(route.query.page) - 1
    : -1,
);

// const isModeMorning = computed(
//   () => !route.query.mode && route.query.mode === "morning",
// );

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
    <div id="multi-page-view" v-if="multiPageView">
      <div class="page-indicator my-5">
        <span
          :class="{ active: currentPageNr === 0 }"
          class="indicator"
          @click="() => router.push({ query: { ...route.query, page: 1 } })"
        ></span>
        <span
          :class="{ active: currentPageNr === 1 }"
          class="indicator mx-2"
          @click="() => router.push({ query: { ...route.query, page: 2 } })"
        ></span>
        <span
          :class="{ active: currentPageNr === 2 }"
          class="indicator mx-2"
          @click="() => router.push({ query: { ...route.query, page: 3 } })"
        ></span>
        <span
          :class="{ active: currentPageNr === 3 }"
          class="indicator"
          @click="() => router.push({ query: { ...route.query, page: 4 } })"
        ></span>
      </div>
      <div class="stats" v-if="currentPageNr === 0">
        <h2 class="title is-4">Morning baseline</h2>
        <h3 class="subtitle is-5">Are you having a crash?</h3>
        <CrashCard />
        <h3 class="subtitle is-5">Total steps</h3>
        <StepsCard />
        <h3 class="subtitle is-5">How did you sleep last night?</h3>
        <SleepCard />
        <h3 class="subtitle is-5">Check fatigue level</h3>
        <PMessage class="my-3" severity="info"
          >Please choose at least one of these options to measure your energy
          level.</PMessage
        >
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

      <div class="symptoms" v-if="currentPageNr === 1">
        <h2 class="title is-4">Symptoms</h2>
        <h3 class="subtitle is-5">What symptoms do you have?</h3>
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

      <div class="meds" v-if="currentPageNr === 2">
        <h2 class="title is-4">Meds and supplements</h2>
        <h3 class="subtitle is-5">What meds/supplements did you take?</h3>
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

      <div class="activities" v-if="currentPageNr === 3">
        <h2 class="title is-4">Activities</h2>
        <h3 class="subtitle is-5">Did you complete these activities?</h3>
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
        v-if="currentPageNr === 3"
      />
      <PButton
        class="mt-5"
        label="Next"
        size="large"
        severity="secondary"
        fluid
        rounded
        :onClick="
          () =>
            router.push({
              query: { ...route.query, page: `${currentPageNr + 2}` },
            })
        "
        v-if="currentPageNr !== 3"
      />
    </div>
    <div id="one-page-view" v-else>
      <div class="stats">
        <h2 class="title is-4">Morning baseline</h2>
        <h3 class="subtitle is-5">Are you having a crash?</h3>
        <CrashCard />
        <h3 class="subtitle is-5">Total steps</h3>
        <StepsCard />
        <h3 class="subtitle is-5">How did you sleep last night?</h3>
        <SleepCard />
        <h3 class="subtitle is-5">Check fatigue level</h3>
        <PMessage class="my-3" severity="info"
          >Please choose at least one of these options to measure your energy
          level.</PMessage
        >
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
      <br />
      <br />
      <div class="symptoms">
        <h2 class="title is-4">Symptoms</h2>
        <h3 class="subtitle is-5">What symptoms do you have?</h3>
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
      <br />
      <br />

      <div class="meds">
        <h2 class="title is-4">Meds and supplements</h2>
        <h3 class="subtitle is-5">What meds/supplements did you take?</h3>
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
      <br />
      <br />

      <div class="activities">
        <h2 class="title is-4">Activities</h2>
        <h3 class="subtitle is-5">Did you complete these activities?</h3>
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
  </div>
</template>

<style lang="css">
.page-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator {
  display: inline-block;
  min-width: 1rem;
  min-height: 0.2rem;
  background-color: lightgrey;
  border-radius: 50px;
  flex-grow: 1;
}
.indicator.active {
  background-color: grey;
}
</style>
