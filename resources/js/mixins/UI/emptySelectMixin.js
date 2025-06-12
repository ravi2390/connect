export default {
    methods: {
        addEmptyElement(data, labelName, valueName) {
            const empty = {};
            empty[labelName] = '';
            empty[valueName] = '';
            data.unshift(empty);
            return data;
        }
    }
}
