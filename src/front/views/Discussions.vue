<script setup>
import CreateChannel from '../components/channel/CreateChannel.vue';
import { reactive, onMounted } from 'vue';
import { CHANNEL_get } from '../api/channel';

const discussions = reactive([]);

onMounted(async () => {
  const fetched_discussions = await CHANNEL_get();
  Object.assign(discussions, fetched_discussions);
})
</script>

<template>
  <p>Discussions</p>

  <CreateChannel />

  <ul v-for="discussion in discussions">
    <RouterLink :to="`/discussion/${discussion.id}`">
      <li>{{ discussion.name }}</li>
    </RouterLink>
  </ul>
</template>
