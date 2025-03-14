import { passwordValidtionsError } from '../messagesType';

export const validatePassword = (
    newpassword: string,
    password: string,
    confirmPassword: string
): string | null => {
    if (newpassword.length < 8) {
        return passwordValidtionsError.longPassword;
    }
    if (!/[A-Z]/.test(newpassword)) {
        return passwordValidtionsError.upperCaseMustBeAtLeast;
    }
    if (!/[0-9]/.test(newpassword)) {
        return passwordValidtionsError.numberMustBeAtLeast;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newpassword)) {
        return passwordValidtionsError.specialCharMustBeAtLeast;
    }
    if (password === newpassword) {
        return passwordValidtionsError.mustBeNewPassword;
    }
    if (newpassword !== confirmPassword) {
        return passwordValidtionsError.confirmPasswordsMust;
    } else {
        return null;
    }
};

export const validPassword = (
    newPassword: string,
    confirmPassword: string,
    currentPassword?: string,
    rules: {
        minLength?: number;
        requireUppercase?: boolean;
        requireNumber?: boolean;
        requireSpecialChar?: boolean;
    } = {}
): string | null => {
    const {
        minLength = 8,
        requireUppercase = true,
        requireNumber = true,
        requireSpecialChar = true,
    } = rules;

    if (newPassword.length < minLength) {
        return passwordValidtionsError.longPassword;
    }

    if (requireUppercase && !/[A-Z]/.test(newPassword)) {
        return passwordValidtionsError.upperCaseMustBeAtLeast;
    }

    // Check for at least one number
    if (requireNumber && !/[0-9]/.test(newPassword)) {
        return passwordValidtionsError.numberMustBeAtLeast;
    }

    // Check for at least one special character
    if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        return passwordValidtionsError.specialCharMustBeAtLeast;
    }

    // If current password is provided, ensure the new password is different
    if (currentPassword && newPassword === currentPassword) {
        return passwordValidtionsError.mustBeNewPassword;
    }

    if (newPassword !== confirmPassword) {
        return passwordValidtionsError.confirmPasswordsMust;
    }

    return null;
};
