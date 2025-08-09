<script setup lang="ts">
import { ref } from "vue";

const budget = 12;
const current = ref(10);
</script>

<template>
  <div class="diagnostic-pacing mt-6">
    <div class="budget">
      <h1 class="title is-4">Your budget for today</h1>
      <PKnob
        size="120"
        :min="0"
        :max="budget"
        :strokeWidth="10"
        v-model="current"
      />
      <p class="subtitle is-5">Energy points</p>
    </div>
  </div>
</template>
