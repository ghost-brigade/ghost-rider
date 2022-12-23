<script setup>
import CreateChannel from '../components/channel/CreateChannel.vue';
import { reactive, onMounted } from 'vue';
import { CHANNEL_get } from '../api/channel';
import SecurityUserProvider from '../provider/security/SecurityUserProvider.vue';

const discussions = reactive([]);

onMounted(async () => {
  const fetched_discussions = await CHANNEL_get();
  Object.assign(discussions, fetched_discussions);
})
</script>

<template>
  <section class="app_padding-section">
    <div class="content">
      <h1>Discussions</h1>

      <SecurityUserProvider v-slot="{ currentUser }">
        <CreateChannel :currentUser="currentUser"/>
      </SecurityUserProvider>

      <ul class="app_discussion-list">
        <template v-for="discussion in discussions">
          <RouterLink :to="`/discussion/${discussion.id}`">
            <li>{{ discussion.name }}</li>
          </RouterLink>
        </template>
      </ul>
    </div>
  </section>
</template>
