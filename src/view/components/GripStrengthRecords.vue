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
    <button class="button is-info mb-4" @click="addNewEntry" :disabled="isFull">
      <span class="icon">
        <i class="ti ti-plus is-size-4"></i>
      </span>
      <span> Hinzufügen </span>
    </button>
    <div
      class="field is-grouped"
      v-for="r in records"
      :key="r.data.timestamp.getMilliseconds()"
    >
      <button class="mx-2" @click.stop="() => toggleEditable(r)">
        <span class="icon">
          <i
            class="ti ti-square-check-filled is-size-4 has-text-success"
            v-if="r.isEditable"
          ></i>
          <i class="ti ti-edit is-size-4" v-else></i>
        </span>
      </button>

      <button
        class="button"
        @click="() => r.data.strength--"
        :disabled="!r.isEditable"
      >
        <i class="ti ti-minus"></i>
      </button>
      <input
        class="input"
        type="number"
        :value="r.data.strength"
        @change="(event: Event) => updateValue(event, r)"
        :disabled="!r.isEditable"
      />
      <button
        class="button"
        @click="() => r.data.strength++"
        :disabled="!r.isEditable"
      >
        <i class="ti ti-plus"></i>
      </button>

      <button
        class="mx-2"
        :class="{ 'is-invisible': !r.isEditable }"
        @click.stop="() => showDialog(r)"
      >
        <span class="icon has-text-danger">
          <i class="ti ti-trash-filled is-size-4"></i>
        </span>
      </button>
    </div>

    <dialog class="dialog" ref="dialog" @click="closeDialog">
      <div class="box" @click.stop="" role="presentation">
        <div>
          <p class="title is-6"></p>
        </div>
        <div class="field is-grouped">
          <button class="button is-light" @click.stop="closeDialog">
            Abbrechen
          </button>
          <button
            class="button is-danger"
            @click.stop="onConfirmDeletion"
          ></button>
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
