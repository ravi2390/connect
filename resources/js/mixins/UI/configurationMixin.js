export default {
    data: () => ({
        presets: [],
        selectedPreset: '',
    }),
    methods: {
        getConfiguration(model, key) {
            let url = '/api/v2/ui/component/' + model;
            if (key !== '') {
                url += '/' + key;
            }
            return axios.get(url);
        },
        updateConfiguration(model, key, settingsKey, settings) {
            const url = '/api/v2/ui/component/' + model + '/' + key;
            return axios.post(url, {'settings-key': settingsKey, 'settings': settings});
        },
        onFilterChangeApplied(componentFilters, model, key) {
            const filters = [];
            componentFilters.map(filter => {
                filters.push({value:filter.name, visible:filter.visible});
            });
            this.updateConfiguration(model, key, 'filters', filters);
            this.updateSelectedPreset(key);
        },
        onHeaderChangeApplied(model, key) {
            this.updateConfiguration(model, key, 'fields', this.headers);
            this.updateSelectedPreset(key);
        },
        updateSelectedPreset(key) {
            if (!this.presets.find(preset => preset.component_key === key)) {
                this.presets.unshift({component_key:key});
            }
            this.selectedPreset = key;
        },
        setPresetData(data) {
            this.presets = data.presets;
            this.selectedPreset = data.selectedPreset;
        }
    }
}
