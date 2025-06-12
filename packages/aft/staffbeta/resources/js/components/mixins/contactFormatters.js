export default {
    methods: {
        formatStaff(staff) {
            let result = '';
            if (staff.StaffDepartment) {
                result += `${staff.StaffDepartment.StaffDepartmentName}: `;
            }
            if (staff.StaffTitle) { result += staff.StaffTitle; }
            return result;
        },
        formatRelationship(rel) {
            let result = '';
            result += '<td>';
            if (rel.UnionRelationshipType) { result += `${rel.UnionRelationshipType}: `; }
            if (rel.MemberId) { result += `${rel.MemberId} - `; }
            if (rel.LocalDuesCategory) { result += `${rel.LocalDuesCategory} - `; }
            if (rel.Affiliate) { result += `${rel.Affiliate.AffiliateName} (${rel.Affiliate.AffiliateNumber})`; }
            if (rel.EndDate) { result += `(FORMER)`; }
            result += '</td>';
            return result;
        },
        formatOfficer(office) {
            let result = '';
            result += '<td>';
            if (office.Affiliate) { result += office.Affiliate.AffiliateName; }
            if (office.Affiliate) { result += ` (${office.Affiliate.AffiliateNumber}) - `; }
            if (office.AffiliateOfficerRole) {
                result += office.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTitleName;
            }
            result += '</td>';
            return result;
        },
        formatPhone(phone) {
            let type = '';
            if (phone.ContactStatus) {
                if (phone.ContactStatus.ContactStatusName === 'Invalid') { type = 'contact-invalid'; }
            }
            let result = '';
            result += `<td class="${type}">`;
            if (phone.IndividualPhoneType) { result += `${phone.IndividualPhoneType.IndividualPhoneTypeName}:`; }
            result += '</td>';
                result += `<td class="${type}">`;
                if (phone.Country && phone.Country.CountryCallingCode) { result += ` +${phone.Country.CountryCallingCode} `; }
                if (phone.PhoneNumber) { result += phone.PhoneNumber; }
                if (phone.Extension) { result += ` x${phone.Extension}`; }
                if (phone.CanCallRestriction && phone.CanCallRestriction.ContactRestrictionId === 2) {
                    result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
                }
                if (phone.IsPreferred) { result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>'; }
                if (phone.VerifiedDate) { result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>'; }
                result += '</td>';
            return result;
        },
        formatEmail(email) {
            let type = '';
            if (email.ContactStatus) {
                if (email.ContactStatus.ContactStatusName === 'Invalid') { type = 'contact-invalid'; }
            }
            let result = '';
                result += `<td class="${type}">`;
                if (email.Email) { result += email.Email; }
                if (email.CanContactRestriction && email.CanContactRestriction.ContactRestrictionId === 2) {
                    result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
                }
                if (email.IsPreferred) { result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>'; }
                if (email.VerifiedDate) { result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>'; }
                result += '</td>';
            return result;
        },
        formatAddress(address) {
            let type = '';
            if (address.ContactStatus) {
                if (address.ContactStatus.ContactStatusName === 'Invalid') { type = 'contact-invalid'; }
            }
            let result = '';
            result += `<td class="${type}">`;
            if (address.IndividualAddressType) { result += `${address.IndividualAddressType}:`; }
            result += '</td>';
                result += `<td class="${type}">`;
                if (address.AddressLine1) { result += address.AddressLine1; }
                if (address.AddressLine2) { result += `, ${address.AddressLine2}`; }
                if (address.City) { result += `, ${address.City}`; }
                if (address.StateTerritory) { result += `, ${address.StateTerritory.StateTerritoryName}`; }
                if (address.PostalCode) { result += `, ${address.PostalCode}`; }
                if (address.CanSendMailRestriction && address.CanSendMailRestriction.ContactRestrictionId === 2) {
                    result += ' <span data-toggle="tooltip" title="Do Not Contact">&#x1F6AB;</span>';
                }
                if (address.IsPreferred) { result += ' <span data-toggle="tooltip" title="Preferred">&#x2B50;</span>'; }
                if (address.VerifiedDate) { result += ' <span data-toggle="tooltip" title="Verified">&#x2714;</span>'; }
                result += '</td>';
            return result;
        },
    },
};
