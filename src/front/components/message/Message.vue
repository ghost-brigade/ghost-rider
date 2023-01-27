<script setup>
import { onMounted, ref, reactive, inject } from 'vue';
import { USERS_PROVIDER } from '../../provider/user/UsersProviderKeys';

const props = defineProps({
    message: {
        type: Object,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    }
});

const user = reactive({});
const { searchUser } = inject(USERS_PROVIDER);

onMounted(() => {
    loadUser();
})

const loadUser = async () => {
    const path = props.message.userId ? `/user/${props.message.userId}` : props.message.user;
    const found = await searchUser(path);
    Object.assign(user, found);
}

</script>

<template>
    <li class="app_message" :class="user.id === props.currentUser?.id ? 'mine' : ''">
        <p>{{ user?.lastname }} {{ user?.firstname }}</p>
        {{ props.message.message }}
    </li>
</template>