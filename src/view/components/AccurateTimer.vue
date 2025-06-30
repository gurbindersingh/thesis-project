<script setup lang="ts">
import { TimerWorker } from "@/webworkers/timer/TimerWorker";
import { computed, ref } from "vue";

const props = defineProps<{ workTime: number; breakTime: number }>();
const timerResolution = 100;

let time = ref(props.workTime * 1000);
let isWork = true;
let isRunning = ref(false);

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
  () => (isWork ? props.workTime : props.breakTime) > time.value,
);
const seconds = computed(() =>
  String(Math.floor(time.value / 1000)).padStart(2, "0"),
);
const milliseconds = computed(() =>
  String(Math.floor((time.value % 1000) / timerResolution)),
);

function startTimer() {
  timerWorker.startTimer(time.value);
  isRunning.value = true;
}

function pauseTimer() {
  timerWorker.stopTimer();
  isRunning.value = false;
}

function resetTimer() {
  time.value = (isWork ? props.workTime : props.breakTime) * 1000;
}

function timerCompleted() {
  isWork = !isWork;
  isRunning.value = false;
  resetTimer();
}
</script>

<template>
  <div class="timer m-4">
    <h2 class="is-sr-only">Timer</h2>
    <p class="time">
      <span class="is-size-2"> {{ seconds }}.{{ milliseconds }} </span>
      <span class="ml-1" aria-hidden="true">s</span>
    </p>
    <p class="is-size-5">
      <span v-if="isWork">Messen!</span>
      <span v-else>Pause</span>
    </p>

    <button
      class="has-text-info is-large"
      @click.stop="startTimer"
      v-if="!isRunning"
    >
      <span class="icon is-large">
        <i class="ti ti-player-play-filled"></i>
      </span>
    </button>

    <button
      class="has-text-info is-large"
      v-if="isRunning"
      @click.stop="pauseTimer"
    >
      <span class="icon is-large">
        <i class="ti ti-player-pause-filled"></i>
      </span>
    </button>
    <button
      class="has-text-info is-large"
      :class="{ 'is-invisible': isRunning }"
      @click.stop="timerCompleted"
      :disabled="isRunning"
    >
      <span class="icon is-large">
        <i class="ti ti-player-track-next-filled"></i>
      </span>
    </button>
    <button
      class="has-text-info is-large"
      :class="{ 'is-invisible': isRunning || !isPaused }"
      @click.stop="resetTimer"
      :disabled="isRunning || !isPaused"
    >
      <span class="icon is-large">
        <i class="reset-icon ti ti-rotate"></i>
      </span>
    </button>
  </div>
</template>
