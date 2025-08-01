<script setup lang="ts">
import { ref } from "vue";

const isEditMode = ref(false);
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-items-center">
        <i class="ti ti-walk has-text-weight-bold is-size-4 mr-2" />
        <p class="is-size-5">1204</p>
        <div class="space is-flex-grow-1"></div>
        <PButton
          variant="text"
          icon="ti ti-pencil"
          severity="secondary"
          size="large"
          :onClick="() => (isEditMode = true)"
        />
      </div>
    </template>
  </PCard>
</template>
