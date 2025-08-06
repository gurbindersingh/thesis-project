<script setup lang="ts">
import { ref } from "vue";

const isDone = ref(false);
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-items-center">
        <i class="ti ti-trending-down has-text-weight-bold is-size-4 mr-5" />
        <p class="has-text-weight-semibold">Crashing (PEM)</p>
        <div class="spacer is-flex-grow-1"></div>
        <PSelectButton
          class="done-selector"
          v-model="isDone"
          :options="['Yes', 'No']"
          :optionValue="(val: string) => val === 'Yes'"
        />
      </div>
    </template>
  </PCard>
</template>
