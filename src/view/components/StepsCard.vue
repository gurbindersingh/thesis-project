<script setup lang="ts">
import { ref } from "vue";

const isEditMode = ref(false);
const stepCount = ref(1204);
const time = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
</script>

<template>
  <PCard class="activity-card">
    <template #content>
      <div class="is-flex is-align-items-center">
        <i class="ti ti-walk has-text-weight-bold is-size-4 mr-5" />
        <PInputNumber v-model="stepCount" v-if="isEditMode" />
        <p class="has-text-weight-semibold" v-else>{{ stepCount }}</p>
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
        <div class="spacer is-flex-grow-1"></div>
        <p class="description has-text-grey">
          <span>Last checked: </span>
          <span>{{ time }}</span>
          <PButton icon="ti ti-refresh" variant="text" severity="secondary" />
        </p>
      </div>
    </template>
  </PCard>
</template>
