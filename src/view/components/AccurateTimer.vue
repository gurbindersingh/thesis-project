<script setup lang="ts">
import { TimerWorker } from "@/webworkers/timer/TimerWorker";
import { computed, ref } from "vue";

const props = defineProps<{ workTime: number; breakTime: number }>();
const timerResolution = 100;

const time = ref(props.workTime * 1000);
const isWork = ref(true);
const isRunning = ref(false);

const timerWorker = new TimerWorker(timerResolution).setupEventListeners([
  {
    onEvent: "tick",
    execute() {
      time.value -= timerResolution;
    },
  },
  {
    onEvent: "completed",
    execute() {
      timerCompleted();
    },
  },
]);

const isPaused = computed(
  () => (isWork.value ? props.workTime : props.breakTime) * 1000 > time.value,
);
const seconds = computed(() =>
  String(Math.floor(time.value / 1000)).padStart(2, "0"),
);
const milliseconds = computed(() =>
  String(Math.floor((time.value % 1000) / timerResolution)),
);

function startTimer() {
  isRunning.value = true;
  timerWorker.startTimer(time.value);
  console.log("Starting timer", isRunning.value, isPaused.value);
}

function pauseTimer() {
  isRunning.value = false;
  timerWorker.stopTimer();
  console.log("Pausing timer", isRunning.value, isPaused.value);
}

function resetTimer() {
  time.value = (isWork.value ? props.workTime : props.breakTime) * 1000;
  console.log("Resetting timer", isRunning.value, isPaused.value);
}

function timerCompleted() {
  isRunning.value = false;
  isWork.value = !isWork.value;
  resetTimer();
}
</script>

<template>
  <div class="timer m-4 mt-6">
    <h2 class="is-sr-only">Timer</h2>
    <p class="is-size-4">
      <span v-if="isWork">Measure strength</span>
      <span v-else>Take a break</span>
    </p>
    <p class="time">
      <span class="is-size-2"> {{ seconds }}.{{ milliseconds }} </span>
      <span class="ml-1" aria-hidden="true">s</span>
    </p>

    <PButton
      class=""
      icon="ti ti-player-play-filled"
      rounded
      size="large"
      variant="outlined"
      v-if="!isRunning"
      :onClick="startTimer"
    />
    <PButton
      class=""
      icon="ti ti-player-pause-filled"
      rounded
      size="large"
      variant="outlined"
      v-if="isRunning"
      :onClick="pauseTimer"
    />
    <PButton
      class=""
      :class="{ 'is-invisible': isRunning }"
      :onClick="timerCompleted"
      :disabled="isRunning"
      icon="ti ti-player-skip-forward-filled"
      variant="outlined"
      severity="secondary"
      size="large"
      rounded
    />
    <PButton
      class="reset-icon"
      :class="{ 'is-invisible': isRunning || !isPaused }"
      :onClick="resetTimer"
      :disabled="isRunning || !isPaused"
      icon="ti ti-rotate"
      variant="outlined"
      severity="secondary"
      size="large"
      rounded
    />
  </div>
</template>
