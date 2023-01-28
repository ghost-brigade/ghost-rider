<script setup>
import CreateChannel from '../components/channel/CreateChannel.vue';
import {inject, onMounted, reactive, ref} from 'vue';
import {CHANNEL_delete, CHANNEL_get} from '../api/channel';
import {SECURITY_CURRENT_KEY} from '../provider/security/SecurityUserProviderKeys';
import ConseillerProvider from '../provider/user/ConseillerProvider.vue';
import ConseillersList from '../components/conseillers/ConseillersList.vue';

const discussions = reactive([]);
const { currentUser } = inject(SECURITY_CURRENT_KEY);
const messages = ref(null);

onMounted(async () => {
    discussions.push(...await CHANNEL_get());
})

const updateDiscussions = async (newDiscussion) => {
  console.log(newDiscussion);
  discussions.value = [...discussions, newDiscussion]; //to fix
}

const handleDelete = async (id) => {
  try {
    discussions.splice(discussions.findIndex(discussion => discussion.id === id), 1);
    await CHANNEL_delete(id);
  } catch (err) {
    messages.value = err.message;
  }
}
</script>

<template>
  <section class="app_padding-section">
    <div class="content">
      <h1>Discussions</h1>

      <CreateChannel :currentUser="currentUser" v-model:discussions="discussions" @update:discussions="updateDiscussions" />

      <ConseillerProvider>
        <ConseillersList />
      </ConseillerProvider>

      <p>Discussions ouvertes</p>
      <ul class="app_discussion-list">
        <template v-for="discussion in discussions">
          <li style="display: flex; justify-content: space-between; align-items: center;" v-if="discussion.id !== undefined">
            <span style="display: flex; align-items: flex-start; flex-direction: column; justify-content: flex-start;">
              <a :href="'/discussion/' + discussion.id">{{ discussion.name }}</a>
              <p>0/{{ discussion.limit }}</p>
            </span>
            <button class="cta" @click="handleDelete(discussion.id)">X</button>
          </li>
        </template>
      </ul>
    </div>
  </section>
</template>
