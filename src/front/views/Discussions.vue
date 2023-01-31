<script setup>
import CreateChannel from '../components/channel/CreateChannel.vue';
import {inject, onMounted, reactive, ref} from 'vue';
import {CHANNEL_delete, CHANNEL_get, CHANNEL_update} from '../api/channel';
import {SECURITY_CURRENT_KEY} from '../provider/security/SecurityUserProviderKeys';
import ConseillerProvider from '../provider/user/ConseillerProvider.vue';
import ConseillersList from '../components/conseillers/ConseillersList.vue';

const discussions = reactive([]);
const { currentUser } = inject(SECURITY_CURRENT_KEY);
const messages = ref(null);
const updateInput = ref({
  id: null,
  update: false
});

onMounted(async () => {
    discussions.push(...await CHANNEL_get());
})

const updateDiscussions = async (newDiscussion) => {
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

const handleEdit = async (id) => {
  try {
    if (updateInput.value.update) {

      await CHANNEL_update({
        id,
        name: discussions.find(discussion => discussion.id === id).name,
        limit: discussions.find(discussion => discussion.id === id).limit
      });

      updateInput.value.update = false;
      updateInput.value.id = null;
    } else {
      updateInput.value.update = true;
      updateInput.value.id = id;
    }
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
          <li style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: flex-start; flex-direction: column; justify-content: flex-start;" v-if="updateInput.id !== discussion.id">
              <div>
                <a :href="'/discussion/' + discussion.id">{{ discussion.name }}</a>
                <p>0/{{ discussion.limit }}</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; flex-direction: column; justify-content: flex-start;" v-else>
              <input type="text" v-model="discussion.name" />
              <input type="number" v-model="discussion.limit" />
            </div>
            <div>
              <button class="cta" @click="handleEdit(discussion.id)" v-if="updateInput.id !== discussion.id">Modifier</button>
              <button class="cta" @click="handleEdit(discussion.id)" v-else>Enregistrer</button>
              &nbsp;
              <button class="cta" @click="handleDelete(discussion.id)" v-if="updateInput.id !== discussion.id">X</button>
            </div>

          </li>
        </template>
      </ul>
    </div>
  </section>
</template>
