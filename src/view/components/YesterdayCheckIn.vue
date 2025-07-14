<script setup lang="ts">
import ActivityCard from "./ActivityCard.vue";
import MedsCard from "./MedsCard.vue";
</script>

<template>
  <div id="yesterday">
    <h2 class="title is-5">Yesterday</h2>
    <div class="activities mb-6">
      <h3 class="subtitle is-6 mb-4">Did you complete these activities?</h3>
      <!--TODO: Ask user to check off the activities they managed to do yesterday.-->
      <ActivityCard class="mb-1" activity="Activity 1" :severity="3" />
      <ActivityCard class="mb-1" activity="Activity 2" :severity="2" />
      <ActivityCard class="mb-1" activity="Activity 3" :severity="2" />
      <ActivityCard class="mb-1" activity="Activity 4" :severity="1" />
    </div>
    <div class="meds">
      <h3 class="subtitle is-6 mb-4">Did you take your meds yesterday?</h3>
      <MedsCard class="mb-1" :med="{ name: 'Med 1', dose: 25, times: [0] }" />
      <MedsCard class="mb-1" :med="{ name: 'Med 2', dose: 4.5, times: [1] }" />
      <MedsCard
        class="mb-1"
        :med="{ name: 'Med 3', dose: 40, times: [0, 1, 3] }"
      />
    </div>
    <div>
      <!-- <h3>Steps</h3> -->
    </div>
    <!-- <div class="meds"> -->
    <!--   <h3>Did you take your medications?</h3> -->
    <!--   <PCard> -->
    <!--     <template #content> -->
    <!--       <p>Test</p> -->
    <!--     </template> -->
    <!--   </PCard> -->
    <!-- </div> -->
  </div>
</template>
