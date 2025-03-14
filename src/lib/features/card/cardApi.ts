import {
    api,
    apiRoutes,
    type IBillingHistoryResponse,
    // type ICardsResponse,
    type ICard,
    type ICardResponse,
    // type ICustomerResponse,
    type ICustomerPayload,
    type IPaymentMethodsResponse,
    type IUpdatePaymentMethodsResponse,
} from '@/utils';
import { msgResponse } from '@/utils/messagesType';
import { AxiosError, type AxiosResponse } from 'axios';

export const addCard = async (
    payload: ICard
): Promise<{ data: ICardResponse } | { error: string }> => {
    try {
        const response: AxiosResponse<ICardResponse> = await api.request({
            method: 'post',
            url: `${apiRoutes.card.name}${apiRoutes.card.create}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },

            data: payload,
        });
        return response;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.data as string);
        } else {
            throw new Error(msgResponse.unKnowError);
        }
    }
};
export interface StripePaymentMethodResponse {
    success?: boolean;
    paymentMethod?: any;
    message?: string;
}
export const attachUserWithPaymentMethod = async (
    payload: ICustomerPayload
): Promise<{ data: IPaymentMethodsResponse } | { error: string }> => {
    try {
        const response: AxiosResponse<IPaymentMethodsResponse> =
            await api.request({
                method: 'post',
                url: `${apiRoutes.stripe.name}${apiRoutes.stripe.attachCustomerPaymentMethod}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: payload,
            });
        return response;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.data as string);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
export const getAllPaymentMethods = async (): Promise<
    { data: IPaymentMethodsResponse } | { error: string }
> => {
    try {
        const response: AxiosResponse<IPaymentMethodsResponse> =
            await api.request({
                method: 'get',
                url: `${apiRoutes.stripe.name}${apiRoutes.stripe.get}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        return response;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.data as string);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
export const cardSelectionUpdate = async (
    payload: string
): Promise<{ data: IUpdatePaymentMethodsResponse } | { error: string }> => {
    try {
        const response: AxiosResponse<IUpdatePaymentMethodsResponse> =
            await api.request({
                method: 'patch',
                url: `${apiRoutes.stripe.name}${apiRoutes.stripe.changeDefaultPaymentMethod}/${payload}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        return response;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.data as string);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
export const billingHistory = async (): Promise<IBillingHistoryResponse> => {
    try {
        const response = await api.request({
            method: 'get',
            url: `${apiRoutes.stripe.name}${apiRoutes.stripe.getHistory}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.data as string);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const downloadPdfTransaction = async (
    payload: string
): Promise<Blob> => {
    try {
        const response: AxiosResponse<Blob> = await api.request({
            method: 'get',
            url: `${apiRoutes.stripe.name}${apiRoutes.stripe.getPdf}${payload}`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data as string);
        } else {
            throw new Error(msgResponse.unexpectedError);
        }
    }
};
