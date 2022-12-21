<script setup>
import { onMounted, ref, reactive } from 'vue';


const props = defineProps({
    message: {
        type: Object,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    },
    getUserById: {
        type: Function,
        required: true
    },
    getUserByPath: {
        type: Function,
        required: true
    }
});

const user = reactive({});
const connected = ref(user.id === props.currentUser?.id);
onMounted(() => {
    loadUser();
})

const loadUser = async () => {
    if (props.message.userId) {
        const askedUser = await props.getUserById(props.message.userId);
        if (askedUser) {
            Object.assign(user, askedUser);
        }
    } else if (props.message.user) {
        const askedUser = await props.getUserByPath(props.message.user);
        if (askedUser) {
            Object.assign(user, askedUser);
        }
    }
}

</script>

<template>
    <li :class="connected ? 'mine' : 'else'">
        <p>{{ user?.lastname }} {{ user?.firstname }}</p>
        {{ props.message.message }}
    </li>
</template>