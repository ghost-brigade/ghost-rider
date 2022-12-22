<script setup>
import { reactive } from 'vue';
import { getRoutes } from '../../../routes';

const MENU_routes = reactive(
    getRoutes().filter(route => route.meta?.menu)
);
</script>

<template>
    <div class="app_menu">
        <nav>
            <ul v-for="MENU_route in MENU_routes">
                <li>
                    <RouterLink :to="MENU_route.path">
                        <FontAwesomeIcon :icon="MENU_route.meta?.icon"></FontAwesomeIcon>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>