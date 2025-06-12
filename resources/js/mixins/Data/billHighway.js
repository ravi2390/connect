export default {
    methods: {
        updateBillHighwayIndividual(IndividualId, AffiliateId, InvokedFrom) {
            let data = {
                IndividualId: IndividualId,
                AffiliateId: AffiliateId,
                InvokedFrom: InvokedFrom,
            };
            axios.put('/api/v2/billHighway/updateBillHighwayIndividual', data).then((response) => {
                // console.log('Mixin: updateBillHighwayIndividual - InvokedFrom: ' + InvokedFrom, response);
            }).finally();
        }
    }
}
