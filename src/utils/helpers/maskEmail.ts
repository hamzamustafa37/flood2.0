export const maskEmail = (_email: string): string => {
    if (_email !== '') {
        const [localPart, domainPart] = _email.split('@');
        const maskedLocalPart =
            localPart.substring(0, 2) + '*'?.repeat(localPart.length - 2);
        return `${maskedLocalPart}@${domainPart}`;
    }
    return '';
};
