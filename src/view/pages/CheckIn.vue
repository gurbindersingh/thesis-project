<script setup lang="ts">
import { ref } from "vue";
import TodayCheckIn from "../components/TodayCheckIn.vue";

const menu = ref();

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div id="check-in">
    <div>
      <h1 class="title is-size-3 has-text-primary">
        Daily Check-In
        <PButton
          class=""
          icon="ti ti-settings"
          iconPos="right"
          size="large"
          variant="text"
          rounded
          fluid
          :onClick="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
      </h1>
      <PMenu
        ref="menu"
        id="overlay_menu"
        :model="[
          {
            label: 'View Options',
            items: [
              { label: 'Everything on Single Page', icon: 'ti ti-file' },
              { label: 'One Page per Section', icon: 'ti ti-files' },
            ],
          },
        ]"
        :popup="true"
      />
    </div>
    <TodayCheckIn />
  </div>
</template>
