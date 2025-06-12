<template>
    <div v-if="visible">
        <v-list-item
            v-for="(item) in menuItems"
            v-if="menuItems.length"
            :key="item.path"
            :name="item.name"
            :link="link"
            :to="item.path"
            :active="item.path === $route.fullPath"
        >
            <template #prepend>
                <v-icon :icon="item.icon" color="primary"></v-icon>
            </template>
            <v-list-item-title>
                {{ item.label }}
            </v-list-item-title>
        </v-list-item>
        <v-list-item
            v-else
            :link="link"
            :to="path"
            @click="onCreateForm()"
        >
            <template #prepend>
                <v-icon :icon="icon" color="primary"></v-icon>
            </template>
            <v-list-item-title>{{ label }}</v-list-item-title>
        </v-list-item>
    </div>
</template>

<script>
export default {
    name: 'NavItem',
    props: {
        link: { type: Boolean, default: false },
        path: { type: String, required: true },
        label: { type: String, default: 'unknown' },
        icon: { type: String, default: 'mdi:mdi-crosshairs-question' },
        visible: { type: Boolean, default: false },
        menuItems: { type: Array, default: () => [] },
        name: { type: String, required: true },
    },
    data: () => ({
        previousIndex: '1',
        activeLink: false,
    }),
    methods: {
        onCreateForm() {
            if (this.name === 'create') {
                const activeTemplate = localStorage.formBuilderActiveTemplate
                    ? JSON.parse(localStorage.formBuilderActiveTemplate) : null;
                if (activeTemplate
                    && activeTemplate.action
                    && activeTemplate.action.startsWith('edit')) {
                    this.$router.go();
                }
            }
        },
    },
};
</script>
