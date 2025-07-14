<script setup lang="ts">
import AccurateTimer from "@/view/components/AccurateTimer.vue";
import GripStrengthRecords from "@/view/components/GripStrengthRecords.vue";
</script>

<template>
  <div class="hand-grip-test">
    <h1 class="title is-size-3 has-text-centered"></h1>
    <AccurateTimer :workTime="3" :breakTime="15" />
    <GripStrengthRecords />
  </div>
</template>

<style lang="css"></style>
