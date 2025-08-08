<script setup lang="ts">
import { router } from "@/router";
import { computed, ref } from "vue";

interface GripStrengthRecord {
  isDirty?: boolean;
  data: {
    timestamp: Date;
    strength: {
      right: number;
      left: number;
    };
  };
}

const records = ref(
  Array(3)
    .fill(0)
    .map(() => ({
      data: {
        timestamp: new Date(),
        strength: { right: 0, left: 0 },
      },
    })),
);
const dialog = ref<HTMLDialogElement>();
const isFull = computed(
  () =>
    records.value.length >= 3 &&
    records.value.every(
      (record) =>
        record.data.strength.left > 0 && record.data.strength.right > 0,
    ),
);

let onConfirmDeletion = () => {};

function addNewEntry(numberOfEntries: number) {
  for (let i = 0; i < numberOfEntries; i++) {
    records.value.push({
      data: { timestamp: new Date(), strength: { right: 0, left: 0 } },
    });
  }
}

function deleteEntry(record: GripStrengthRecord) {
  if (records.value.length <= 3) return;

  const { timestamp: toDelete } = record.data;
  records.value = records.value.filter(
    (r) => r.data.timestamp.getMilliseconds() !== toDelete.getMilliseconds(),
  );
}

function showDialog(record: GripStrengthRecord) {
  onConfirmDeletion = () => {
    deleteEntry(record);
    closeDialog();
  };
  dialog.value?.showModal();
}

function closeDialog() {
  onConfirmDeletion = () => {};
  dialog.value?.close();
}
</script>

<template>
  <div class="grip-strength-records">
    <h2 class="is-sr-only">Messungen</h2>
    <PButton
      class="has-text-primary mb-4"
      icon="ti ti-plus"
      label="Add entry"
      variant="outlined"
      rounded
      fluid
      :onClick="() => addNewEntry(1)"
    />

    <div
      class="field is-grouped"
      v-for="(record, i) in records"
      :key="record.data.timestamp.getMilliseconds() + i"
    >
      <PButton :label="i + 1" variant="text" severity="secondary" disabled />
      <PInputGroup>
        <PInputGroupAddon>L</PInputGroupAddon>
        <PInputNumber
          v-model="record.data.strength.left"
          placeholder="e.g. 15"
        ></PInputNumber>
        <PInputGroupAddon>kg</PInputGroupAddon>
      </PInputGroup>
      <PInputGroup>
        <PInputGroupAddon>R</PInputGroupAddon>
        <PInputNumber
          v-model="record.data.strength.right"
          placeholder="e.g. 15"
        ></PInputNumber>
        <PInputGroupAddon>kg</PInputGroupAddon>
      </PInputGroup>
      <PButton
        :class="i < 3 ? 'is-invisible' : ''"
        icon="ti ti-trash"
        variant="text"
        severity="secondary"
        :onClick="() => showDialog(record)"
        :disabled="i < 3"
      />
    </div>

    <PButton
      class="has-background-primary mt-5"
      label="Done"
      :disabled="!isFull"
      rounded
      fluid
      :onClick="() => router.back()"
    />

    <dialog class="dialog" ref="dialog" @click="closeDialog">
      <div class="box" @click.stop="" role="presentation">
        <div>
          <p class="title is-6 mb-5">Delete Entry?</p>
        </div>
        <div class="field is-grouped">
          <PButton
            label="Cancel"
            severity="secondary"
            rounded
            :onClick="closeDialog"
          />
          <PButton
            label="Delete"
            severity="danger"
            variant="outlined"
            rounded
            :onClick="onConfirmDeletion"
          />
        </div>
      </div>
    </dialog>
  </div>
</template>

<style lang="css">
.grip-strength-records {
  display: grid;
  place-items: center;
}
</style>
