<script setup lang="ts">
import { ref } from "vue";

const budget = 12;
const current = ref(10);

const chartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702, 620],
      // backgroundColor: [
      //   "rgba(249, 115, 22, 0.2)",
      //   "rgba(6, 182, 212, 0.2)",
      //   "rgb(107, 114, 128, 0.2)",
      //   "rgba(139, 92, 246 0.2)",
      // ],
      // borderColor: [
      //   "rgb(249, 115, 22)",
      //   "rgb(6, 182, 212)",
      //   "rgb(107, 114, 128)",
      //   "rgb(139, 92, 246)",
      // ],
      // borderWidth: 1,
    },
  ],
};
</script>

<template>
  <div class="diagnostic-pacing mt-6">
    <div class="budget">
      <h1 class="title is-4">Your budget for today</h1>
      <PKnob
        size="200"
        :min="0"
        :max="budget"
        :strokeWidth="10"
        v-model="current"
      />
      <h2 class="subtitle is-5 mb-2">Energy points.</h2>
      <p class="description has-text-grey mb-4">
        Last calculated:
        {{
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>
      <div class="px-5">
        <p class="has-text-centered">
          This is your energy budget for the rest of the day based on the data
          you have provided.
        </p>
        <p class="mt-2 has-text-grey has-text-centered">
          This value will be adjusted throughout the day as you check of more
          things and the more steps you accumulate.
        </p>
      </div>
      <!-- <div style="margin-top: 4rem; width: 100%"> -->
      <!--   <h2 class="title is-6 mb-3 has-text-centered">Previous budgets</h2> -->
      <!--   <PChart -->
      <!--     style="width: 100%" -->
      <!--     type="bar" -->
      <!--     :data="chartData" -->
      <!--     :options="{}" -->
      <!--   /> -->
      <!-- </div> -->
    </div>
  </div>
</template>
