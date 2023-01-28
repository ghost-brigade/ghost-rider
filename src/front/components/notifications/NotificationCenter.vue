<script setup>
import { inject, ref } from 'vue';
import { NOTIFICATIONS_PROVIDER } from '../../provider/notification/NotificationProviderKeys';
import RoleChecker from '../security/RoleChecker.vue';

const { notifications, sendNotification } = inject(NOTIFICATIONS_PROVIDER);

const message = ref('');
const type = ref('neutral');

const submit = () => {
    sendNotification({
        'message': message.value,
        'type': type.value,
    });
}
</script>

<template>
    <RoleChecker :rolesNeeded="['ROLE_ADMIN', 'ROLE_SELLER']">
        <p>Envoyer une notification aux utilisateurs connectés</p>
        <form @submit.prevent="submit" :style="{ 'marginBottom': '2rem' }">
            <div class="form-row">
                <input type="text" v-model="message" class="form-control" placeholder="Message à envoyer"/>
            </div>
            <div class="form-row">
                <select class="form-control" v-model="type">
                    <option value="neutral">Information</option>
                    <option value="important">Important</option>
                    <option value="success">Validation</option>
                </select>
            </div>
            <button type="submit" class="cta">Envoyer</button>
        </form>
    </RoleChecker>

    <div>
        <p>Liste des notifications</p>
        <ul v-if="notifications.length" class="app-notifications_list">
            <template v-for="notification in notifications" :key="notification.id" >
                <li :class="notification.type">
                    <p>Message de {{ notification.user }} :</p>
                    <p>{{ notification.message }}</p>
                </li>
            </template>
        </ul>
        <p v-else>Aucune notification</p>
    </div>
</template>