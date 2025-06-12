<template>
    <v-text-field
        v-model="phoneDisplay"
        :disabled="disabled"
        :required="required"
        :rules="rules"
        variant="underlined"
        v-maska:phoneNumber.unmasked="phoneMask"
        @maska="onUpdate"
    >
        <template #label>
            <span v-if="required" class="text-red">* </span>{{ label }}
        </template>
    </v-text-field>
</template>
<script setup>
import { vMaska } from 'maska/vue';
import { ref, computed } from 'vue';

const props = defineProps({
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    countryId: { type: Number, default: 4 },
    label: { type: String, default: 'Phone Number' },
});
const model = defineModel();
const phoneDisplay = ref(model.value);
const phoneNumber = ref('');
defineExpose({ phoneNumber });

// Apply phone mask only for US and CA.
const phoneMask = computed(() => {
    return [4, 2].includes(props.countryId) ? '(###) ###-####' : null;
});
const rules = computed(() => {
    return [
        (v) => (props.required ? (!!v || 'Phone number is required') : true),
        (v) => (phoneMask.value ? (/^\(\d{3}\) \d{3}-\d{4}$/.test(v) || 'Invalid phone number format') : true),
    ];
});
function onUpdate(event) {
    model.value = event.detail.unmasked;
}
</script>