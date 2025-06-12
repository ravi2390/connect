import ChildAffiliate from "../components/ChildAffiliate.vue";
import DateOfBirth from "../components/DateOfBirth.vue";
import JobTitle from "../components/JobTitle.vue";
import LocalDuesCategory from "../components/LocalDuesCategory.vue";
import MfpBillingAddress from "../components/MfpBillingAddress.vue";
import MfpCheckboxField from "../components/MfpCheckboxField.vue";
import MfpChecktextField from "../components/MfpChecktextField.vue";
import MfpCountryCallingCodeSelect from "../components/MfpCountryCallingCodeSelect.vue";
import MfpCustomCopeField from "../components/MfpCustomCopeField.vue";
import MfpCustomSelectionField from "../components/MfpCustomSelectionField.vue";
import MfpGroupField from "../components/MfpGroupField.vue";
import MfpHiddenField from "../components/MfpHiddenField.vue";
import MfpMarkupField from "../components/MfpMarkupField.vue";
import MfpPayment from "../components/MfpPayment.vue";
import MfpSearchSelectField from "../components/MfpSearchSelectField.vue";
import MfpSelectField from "../components/MfpSelectField.vue";
import MfpSignatureField from "../components/MfpSignatureField.vue";
import MfpTextAreaField from "../components/MfpTextAreaField.vue";
import MfpTextField from "../components/MfpTextField.vue";
import MfpWorkLocation from "../components/MfpWorkLocation.vue";
import Phone from "../components/Phone.vue";
import WorkLocation from "../components/WorkLocation.vue";
import WorkStructure from "../components/WorkStructure.vue";

const MfpTypes = {
    install(app, options) {
        app.config.globalProperties.$MfpMapFieldTypeToComponent = (type) => {
            switch (type) {
                case 'childAffiliate': return ChildAffiliate;
                case 'date': return DateOfBirth;
                case 'jobTitle': return JobTitle;
                case 'LocalDuesCategory': return LocalDuesCategory;
                case 'checkbox': return MfpCheckboxField;
                case 'checktext': return MfpChecktextField;
                case 'drawing': return MfpSignatureField;
                case 'billingAddress': return MfpBillingAddress;
                case 'countryCallingCodes': return MfpCountryCallingCodeSelect;
                case 'customCope': return MfpCustomCopeField;
                case 'customSelectionField': return MfpCustomSelectionField;
                case 'group': return MfpGroupField;
                case 'hidden': return MfpHiddenField;
                case 'markup': return MfpMarkupField;
                case 'payment': return MfpPayment;
                case 'search': return MfpSearchSelectField;
                case 'select': return MfpSelectField;
                case 'textarea': return MfpTextAreaField;
                case 'text': return MfpTextField;
                case 'email': return MfpTextField;
                case 'employmentInformation': return MfpWorkLocation;
                case 'phone':
                case 'home':
                case 'mobile':
                case 'work':
                    return Phone;
                case 'workLocation': return WorkLocation;
                case 'workStructure': return WorkStructure;
                default: return MfpTextField;
            }
        };
    },
};

export default MfpTypes;
