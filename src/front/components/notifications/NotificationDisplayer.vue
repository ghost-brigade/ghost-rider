<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject, reactive, watch, ref } from 'vue';
import { NOTIFICATIONS_PROVIDER } from '../../provider/notification/NotificationProviderKeys';

const { notifications } = inject(NOTIFICATIONS_PROVIDER);
const displayedNotifications = reactive([]);
const notificationId = ref(0);

watch(notifications, () => {
    notificationId.value ++;
    displayedNotifications.push({
        id: notificationId.value,
        notification: notifications[notifications.length - 1]
    });

    setTimeout(() => {
        deleteNotification(notificationId.value);
    }, 10000);
});

const deleteNotification = (id) => {
    displayedNotifications.splice(
        displayedNotifications.findIndex((notification) => notification.id === id), 
        1
    );
}
</script>

<template>
    <div class="app-notifications_top">
        <ul class="app-notifications">
            <template v-for="displayedNotification in displayedNotifications" :key="displayedNotification.notificationId" >
                <li class="app-notification" :class="displayedNotification.notification.type">
                    <div class="content">
                        <p>Message de {{ displayedNotification.notification.user }} :</p>
                        <p>{{ displayedNotification.notification.message }}</p>
                    </div>
                    <div class="close">
                        <FontAwesomeIcon icon="close" @click="deleteNotification(displayedNotification.notificationId)"/>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>