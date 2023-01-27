<script setup>
import { reactive, provide, onMounted } from "vue";
import { USER_find } from '../../api/user';
import { USERS_PROVIDER } from "./UsersProviderKeys";

const list = reactive({});
const addUserToList = (data, path) => {
    const newList = list;
    newList[path] = data;
    Object.assign(list, newList);
}

const searchUser = async(path) => {
    const existing = list[path];

    if (!existing) {
        const data = await USER_find(path);
        addUserToList(data, path);
    }

    return list[path];
}

provide(USERS_PROVIDER, {
    searchUser
});
</script>

<template>
    <slot></slot>
</template>