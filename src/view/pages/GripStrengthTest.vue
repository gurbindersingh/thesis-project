<script setup lang="ts">
import AccurateTimer from "@/view/components/AccurateTimer.vue";
import GripStrengthRecords from "@/view/components/GripStrengthRecords.vue";
</script>

<template>
  <div class="hand-grip-test">
    <h1 class="title is-size-3"></h1>
    <PMessage class="mb-3" severity="warn" icon="ti ti-alert-triangle"
      >Do not take this test if even minimal exertion like this causes you to
      crash.</PMessage
    >
    <PMessage class="mb-3" severity="info" icon="ti ti-info-circle"
      >When taking a measurement, hold for 2 to 3 seconds before releasing.
      Alternate sides after every measurement. You may take additional
      measurements to increase the accuracy.</PMessage
    >
    <AccurateTimer :workTime="5" :breakTime="15" />
    <div class="mt-6"></div>
    <GripStrengthRecords />
  </div>
</template>
