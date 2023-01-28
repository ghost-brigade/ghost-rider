<script setup>
import { ref, defineProps, onMounted, inject, watch } from 'vue';
import { SECURITY_CURRENT_KEY } from '../../provider/security/SecurityUserProviderKeys';

const props = defineProps({
    rolesNeeded: {
        type: Array,
        required: true
    }
});

const { currentUser } = inject(SECURITY_CURRENT_KEY);
const isValid = ref(false);

watch(currentUser, () => {
    isValid.value = hasRole();
});

onMounted(() => {
    isValid.value = hasRole();
});

const hasRole = () => {
    return props.rolesNeeded.some((role) => {
        return currentUser.roles.includes(role);
    });
}

</script>

<template>
    <template v-if="isValid">
        <slot></slot>
    </template>
</template>