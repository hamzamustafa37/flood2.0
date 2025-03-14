import { AxiosError } from 'axios';
import { msgResponse } from '@/utils/messagesType';

export const handleError = async (error: unknown): Promise<never> => {
    if (error instanceof AxiosError) {
        const errorMessage = (await error.response?.data?.data) as string;
        throw new Error(errorMessage || msgResponse.passwordUpdateError);
    } else {
        throw new Error(msgResponse.unKnowError);
    }
};
