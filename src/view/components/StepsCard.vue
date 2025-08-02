<script setup lang="ts">
import { ref } from "vue";

const isEditMode = ref(false);

const stepCount = ref(1204);
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-items-center">
        <i class="ti ti-walk has-text-weight-bold is-size-4 mr-2" />
        <PInputNumber v-model="stepCount" v-if="isEditMode" />
        <p class="is-size-5" v-else>{{ stepCount }}</p>
        <div class="space is-flex-grow-1"></div>
        <PButton
          variant="text"
          icon="ti ti-check"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = false)"
          v-if="isEditMode"
        />
        <PButton
          variant="text"
          icon="ti ti-pencil"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = true)"
          v-else
        />
      </div>
    </template>
  </PCard>
</template>
