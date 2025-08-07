<!--TODO:  make the edit and delete actions a dropdown menu open by dot menu-->
<script setup lang="ts">
import { computed, ref } from "vue";

interface ExtendedGripStrengthRecord {
  isEditable: boolean;
  isDirty: boolean;
  data: {
    timestamp: Date;
    strength: number;
  };
}

const records = ref(new Array<ExtendedGripStrengthRecord>());
const isFull = computed(() => records.value.length >= 10);
const dialog = ref<HTMLDialogElement>();

let onConfirmDeletion = () => {};

function addNewEntry() {
  records.value.filter((r) => r.isEditable).forEach((r) => toggleEditable(r));
  records.value.unshift({
    isEditable: true,
    isDirty: false,
    data: { strength: 15, timestamp: new Date() },
  });
}

function deleteEntry(record: ExtendedGripStrengthRecord) {
  const { timestamp: toDelete } = record.data;
  records.value = records.value.filter(
    (r) => r.data.timestamp.getMilliseconds() !== toDelete.getMilliseconds(),
  );
}

function updateValue(event: Event, record: ExtendedGripStrengthRecord) {
  record.data.strength = (event.target as HTMLInputElement).valueAsNumber;
  record.isDirty = true;
}

function showDialog(record: ExtendedGripStrengthRecord) {
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

function toggleEditable(record: ExtendedGripStrengthRecord) {
  record.isEditable = !record.isEditable;
  if (record.isDirty) {
    record.data.timestamp = new Date();
    record.isDirty = false;
  }
}
</script>

<template>
  <div class="grip-strength-records">
    <h2 class="is-sr-only">Messungen</h2>
    <PButton
      class="has-background-primary mb-4"
      icon="ti ti-plus"
      label="Add entry"
      rounded
      fluid
      :onClick="addNewEntry"
    />
    <div
      class="field is-grouped"
      v-for="r in records"
      :key="r.data.timestamp.getMilliseconds()"
    >
      <PInputGroup>
        <PInputNumber placeholder="10"></PInputNumber>
        <PInputGroupAddon>kg</PInputGroupAddon>
      </PInputGroup>
    </div>

    <dialog class="dialog" ref="dialog" @click="closeDialog">
      <div class="box" @click.stop="" role="presentation">
        <div>
          <p class="title is-6 mb-5">Delete Entry?</p>
        </div>
        <div class="field is-grouped">
          <button class="button is-light is-rounded" @click.stop="closeDialog">
            Cancel
          </button>
          <button
            class="button is-danger is-rounded is-outlined"
            @click.stop="onConfirmDeletion"
          >
            Delete
          </button>
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
