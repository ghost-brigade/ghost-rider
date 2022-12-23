<script setup>
import { provide, reactive } from 'vue';
import { USER_find } from '../../api/user';
import { USERS_KEY, USER_GET_ID_KEY, USER_GET_PATH_KEY } from './UserProviderKeys';

const users = reactive([]);

async function getUserById(id) {
    const existing = users.find(user => user.id === id);
    if (existing) {
        return existing;
    }

    const user = await USER_find(`/user/${id}`);
    if (user) {
        users.push(user);
    }
    return user;
}

async function getUserByPath(path) {
    const existing = users.find(user => `/user/${user.id}` === path);
    if (existing) {
        return existing;
    }

    const user = await USER_find(path);
    if (user) {
        users.push(user);
    }
    return user;
}

provide(USERS_KEY, users);
provide(USER_GET_ID_KEY, getUserById);
provide(USER_GET_PATH_KEY, getUserByPath);
</script>

<template>
    <slot 
        :users="users"
        :getUserById="getUserById"
        :getUserByPath="getUserByPath"
    >
    </slot>
</template>