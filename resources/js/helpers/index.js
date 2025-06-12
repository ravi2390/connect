import { Mask } from 'maska';

export const reviseLinkUrls = (text) => {
    if (!text) {
        return '';
    }
    // Find all href values that do not start with http or https, and add https://
    // Ignore links starting with / or ./ or ../ to allow for relative links.
    return text.replace(/href="(?!https?:\/\/|\/|(\.{0,2}\/))([^"]+)"/g, (match, _, p1) => {
        return `href="https://${p1}"`;
    });
}

const mask = new Mask({ mask: '+1 (###) ###-####' });
export const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('+1') || phoneNumber.length === 10) {
        return mask.masked(phoneNumber);
    }
    return phoneNumber;
}
