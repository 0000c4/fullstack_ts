<script setup lang="ts">
import Tasks from './components/Tasks.vue';
import newTask from './components/newTask.vue';
import { store } from './store/store';
</script>

<template>
  <a-spin v-if="store.isLoading" class="spin"/>
  <newTask />
  <Tasks />
</template>

<style scoped>
.spin{
  margin-bottom: 2rem;
}
</style>
