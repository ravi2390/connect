export default {
    methods: {
        handleIsPreferred(items, changedItem, comparisonField, secondaryComparisonField) {
            if (!changedItem.IsPreferred) {
                return;
            }

            items.filter((item) => {
                if(secondaryComparisonField && secondaryComparisonField !== ''){
                    return item.IsPreferred && item[comparisonField] !== changedItem[comparisonField] && item[secondaryComparisonField] === changedItem[secondaryComparisonField];
                } else {
                    return item.IsPreferred && item[comparisonField] !== changedItem[comparisonField];
                }

            }).forEach((preferredItem) => {
                preferredItem.IsPreferred = false;
            });
        }
    }
}
