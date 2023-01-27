<script setup>
import CreateChannel from '../components/channel/CreateChannel.vue';
import { reactive, onMounted, inject } from 'vue';
import { CHANNEL_get } from '../api/channel';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';
import ConseillerProvider from '../provider/user/ConseillerProvider.vue';
import ConseillersList from '../components/conseillers/ConseillersList.vue';

const discussions = reactive([]);
const { currentUser } = inject(SECURITY_CURRENT_KEY);

onMounted(async () => {
  const fetched_discussions = await CHANNEL_get();
  Object.assign(discussions, fetched_discussions);
})
</script>

<template>
  <section class="app_padding-section">
    <div class="content">
      <h1>Discussions</h1>

      <CreateChannel :currentUser="currentUser"/>

      <ConseillerProvider>
        <ConseillersList />
      </ConseillerProvider>

      <p>Discussions ouvertes</p>
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
