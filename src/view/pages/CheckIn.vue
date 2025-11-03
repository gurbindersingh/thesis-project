<script setup lang="ts">
import { ref } from "vue";
import TodayCheckIn from "../components/TodayCheckIn.vue";
import { router } from "@/router";
import { useRoute } from "vue-router";

const menu = ref();
const route = useRoute();

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div id="check-in">
    <div class="is-flex mb-5">
      <h1 class="title is-size-3 has-text-primary mb-0">Daily Check-In</h1>
      <button
        class="has-text-primary ml-4 mt-1"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <i class="ti ti-settings"></i>
      </button>
      <PMenu
        ref="menu"
        id="overlay_menu"
        :model="[
          {
            label: 'View Options',
            items: [
              {
                label: 'Everything on one page',
                icon: 'ti ti-file',
                command: () =>
                  router.push({
                    query: {
                      ...route.query,
                      view: 'single-page',
                      // do not overwrite the `page` parameter here so the page
                      // in the multi-page view is preserved
                    },
                  }),
              },
              {
                label: 'One page per section',
                icon: 'ti ti-files',
                command: () =>
                  router.push({
                    query: {
                      ...route.query,
                      view: 'multi-page',
                      page: '1',
                    },
                  }),
              },
            ],
          },
        ]"
        :popup="true"
      />
    </div>
    <TodayCheckIn />
  </div>
</template>
