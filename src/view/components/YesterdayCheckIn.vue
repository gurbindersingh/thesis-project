<script setup lang="ts">
import ActivityCard from "./ActivityCard.vue";
</script>

<template>
  <div id="yesterday">
    <h2 class="title is-6">Yesterday</h2>
    <div class="activities">
      <h3 class="subtitle is-6">Did you complete these activities?</h3>
      <!--TODO: Ask user to check off the activities they managed to do yesterday.-->
      <ActivityCard />
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
