<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { chartData } from "./chart-data";

const impacts = [
  {
    icon: "briefcase",
    label: "Activity",
    factor: "Work.",
    percentage: 80,
  },
  {
    icon: "shopping-cart",
    label: "Activity",
    factor: "Grocery Shopping.",
    percentage: 60,
  },
  {
    icon: "pill",
    label: "Med/Supplement",
    factor: "Not taking LDN.",
    percentage: 60,
  },
  {
    icon: "zzz",
    label: "Sleep",
    factor: "Sleeping less than 6 hours.",
    percentage: 50,
  },
  {
    icon: "zzz",
    label: "Sleep",
    factor: "Sleeping later than 11am.",
    percentage: 50,
  },
  {
    icon: "pill",
    label: "Med/Supplement",
    factor: "Taking H2I",
    percentage: 25,
  },
  {
    icon: "pill",
    label: "Med/Supplement",
    factor: "Not taking Vitamin B",
    percentage: 15,
  },
];

const compareOptions = [
  { label: "Energy level (average)", data: chartData.map((d) => d.energyAvg) },
  { label: "Energy level (morning)", data: chartData.map((d) => d.energyMax) },
  { label: "Energy level (evening)", data: chartData.map((d) => d.energyMin) },
  { label: "Total activity cost", data: chartData.map((d) => d.totalCost) },
  { label: "Work", data: chartData.map((d) => d.work) },
  { label: "Grocery shopping", data: chartData.map((d) => d.grocery) },
  { label: "Shower", data: chartData.map((d) => d.shower) },
  { label: "Make dinner", data: chartData.map((d) => d.makeDinner) },
  { label: "Clean up", data: chartData.map((d) => d.cleanUp) },
  { label: "LDN", data: chartData.map((d) => d.ldn) },
  { label: "Antihistamine", data: chartData.map((d) => d.h1i) },
  { label: "Vitamin B", data: chartData.map((d) => d.vitB) },
  { label: "Pain med", data: chartData.map((d) => d.painMed) },
  { label: "Brain fog", data: chartData.map((d) => d.brainFog) },
  { label: "Neck pain", data: chartData.map((d) => d.neckPain) },
  { label: "Heartburn", data: chartData.map((d) => d.heartBurn) },
];
const dayOfTheWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const compareSource = ref(compareOptions[2]);
const compareWith = ref(compareOptions[3]);
const compareWithOptions = computed(() =>
  compareOptions.filter((o) => o.label !== compareSource.value.label),
);
// https://www.chartjs.org/docs/latest/configuration/
const currentChartConfig = computed(() => ({
  type: "line",
  options: {
    responsive: true,
    stacked: false,
    aspectRatio: 1.6,
    scales: {
      yLeft: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          lineWidth: (context: { tick: { value: number } }) =>
            context.tick.value === 0 ? 3 : 1,
        },
      },
    },
  },
  data: {
    labels: dayOfTheWeek,
    datasets: [
      {
        ...compareSource.value,
        yAxisID: "yLeft",
      },
      {
        type: "bar",
        ...compareWith.value,
        yAxisID: "yLeft",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  },
}));

onMounted(() => {
  console.log(chartData);
});
</script>

<template>
  <div id="retrospective">
    <h1 class="title is-3 has-text-primary">Impacts</h1>
    <div class="impacts">
      <h2 class="title is-5 has-text-grey mb-3">
        Things that affect your energy levels the most
      </h2>
      <PCard v-for="impact in impacts" :key="impact">
        <template #content>
          <div class="is-flex is-align-items-center">
            <i class="is-size-5 mr-2 ti" :class="'ti-' + impact.icon"></i>
            <p class="is-flex-grow-1">
              <span class="has-text-weight-bold mr-1">{{ impact.label }}:</span>
              <span>
                {{ impact.factor }}
              </span>
            </p>
          </div>
        </template>
      </PCard>
    </div>
    <div class="chart mt-6">
      <h2 class="title is-5 has-text-grey mb-3">Chart</h2>
      <div class="is-flex is-align-items-center mb-2">
        <label for="" style="min-width: 6rem">Show</label>
        <PSelect
          class="is-flex-grow-1"
          :options="['Week', 'Month']"
          defaultValue="Week"
        />
      </div>
      <div class="is-flex is-align-items-center mb-2">
        <label for="" style="min-width: 6rem">Compare</label>
        <PSelect
          class="is-flex-grow-1"
          :options="compareOptions"
          optionLabel="label"
          v-model="compareSource"
        />
      </div>
      <div class="is-flex is-align-items-center">
        <label for="" style="min-width: 6rem">With</label>
        <PSelect
          class="is-flex-grow-1"
          :options="compareWithOptions"
          optionLabel="label"
          v-model="compareWith"
        />
      </div>
      <PChart
        class="mt-4"
        :type="currentChartConfig.type"
        :options="currentChartConfig.options"
        :data="currentChartConfig.data"
        v-if="compareSource && compareWith"
      />
    </div>
  </div>
</template>
