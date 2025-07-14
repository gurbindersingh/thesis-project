<script setup lang="ts">
// TODO: Use custom severity buttons if there is time.
import { ref } from "vue";

const props = defineProps<{
  med: { name: string; dose: number; times: number[] };
}>();

const medTimes = ["Morning", "Noon", "Evening", "Night"];
const takenMeds = ref(
  props.med.times.map((t) => ({ time: t, takenMeds: false })),
);
const isEditMode = ref(false);
const med = ref(props.med);
</script>

<template>
  <PCard class="med-card">
    <template #content>
      <div class="is-flex is-align-items-center mb-4">
        <p class="med title is-size-6 m-0">
          <span class="name mr-2">{{ med.name }}</span>
          <span class="dose">({{ med.dose }} mg)</span>
        </p>
        <PButton
          class="p-0"
          variant="text"
          icon="ti ti-settings"
          severity="secondary"
          size="large"
          @click="() => (isEditMode = true)"
        />
      </div>
      <template v-for="(time, index) in med.times" :key="time">
        <div>
          <div
            class="is-flex is-align-items-center is-justify-content-space-between mb-2"
          >
            <p class="time">{{ medTimes[time] }}</p>
            <PSelectButton
              class="done-selector"
              v-model="takenMeds[index].takenMeds"
              :options="['Yes', 'No']"
              :optionValue="(val: string) => val === 'Yes'"
              size="large"
            />
          </div>
        </div>
      </template>
    </template>
  </PCard>
</template>

<style lang="css">
.med-card .p-card-body {
  padding: 0.75rem;
}
</style>
