export default {
    data() {
        return {
            alert: false,
            alertType: 'success',
            alertText: '',
        }
    },
    methods: {

        onAdd() {
            this.alert = false;
            this.selected = null;
            this.flipped = true;
        },

        onEdit(event) {
            this.alert = false;
            this.selected = event;
            this.flipped = true;
        },

        alertSuccessMessageForSave(contactTypeName){
            this.alert = true;
            this.alertType = 'success';
            this.alertText = contactTypeName + ' saved.';
        }
    }
}
