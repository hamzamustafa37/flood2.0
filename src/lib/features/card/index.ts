import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    ApiActions,
    type ICardResponse,
    type ICard,
    type ICustomer,
    type ICustomerPayload,
    type IPaymentMethodsResponse,
    type PaymentMethod,
    type IUpdatePaymentMethodsResponse,
    type UpdateCards,
    type IBillingHistory,
    type IBillingHistoryResponse,
    GeneralEnums,
} from '@/utils';
import { endLoading, startLoading } from '../global';
import { type AppThunk } from '@/lib/store';
import { msgResponse, PopUpMessage } from '@/utils/messagesType';
import {
    addCard,
    attachUserWithPaymentMethod,
    billingHistory,
    cardSelectionUpdate,
    downloadPdfTransaction,
    getAllPaymentMethods,
} from './cardApi';
import {
    errorPopup,
    successPopUps,
    warningPopup,
} from '@/app/components/common';
import { type AxiosError } from 'axios';

export interface ICardSlice {
    cards: ICard[];
    customer: ICustomer;
    paymentMethods: PaymentMethod[];
    billingHistoryDetails: IBillingHistory[];
}

const initialState: ICardSlice = {
    cards: [],
    customer: {
        id: '',
        object: 'customer',
        address: null,
        balance: 0,
        created: Date.now(),
        currency: null,
        default_source: null,
        delinquent: false,
        description: null,
        discount: null,
        email: '',
        invoice_prefix: '',
        invoice_settings: {
            custom_fields: null,
            default_payment_method: '',
            footer: null,
            rendering_options: null,
        },
        livemode: false,
        metadata: {},
        name: null,
        next_invoice_sequence: 1,
        phone: null,
        preferred_locales: [],
        shipping: null,
        tax_exempt: 'none',
        test_clock: null,
    },
    paymentMethods: [],
    billingHistoryDetails: [],
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addNewCard: (state, action: PayloadAction<ICard>) => {
            state.cards.push(action.payload);
        },
        setAllCards: (state, action: PayloadAction<ICard[]>) => {
            state.cards = action.payload;
        },
        updateCards: (state, action: PayloadAction<UpdateCards>) => {
            const updatedPaymentMethod = action.payload.paymentMethod;
            const cardId = action.payload.cardID;
            state.cards = state.cards.map(c => {
                if (c._id === cardId) {
                    return { ...c, isSelected: true };
                }
                return { ...c, isSelected: false };
            });

            const index = state.paymentMethods.findIndex(
                paymentMethod => paymentMethod.id === updatedPaymentMethod.id
            );
            const oldSelectedPaymentIndex = state.paymentMethods.findIndex(
                paymentMethod => paymentMethod.isSelected
            );
            if (index !== -1) {
                state.paymentMethods[index] = {
                    ...state.paymentMethods[index],
                    ...updatedPaymentMethod,
                };
                if (
                    oldSelectedPaymentIndex !== -1 &&
                    oldSelectedPaymentIndex !== index
                ) {
                    state.paymentMethods[oldSelectedPaymentIndex].isSelected =
                        false;
                }
            }
        },
        setCustomerInfo: (state, action: PayloadAction<ICustomer>) => {
            state.customer = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<PaymentMethod[]>) => {
            state.paymentMethods = action.payload;
            state.cards = action.payload.map(paymentMethod => ({
                _id: paymentMethod.id,
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4,
                exp_month: paymentMethod.card.exp_month,
                exp_year: paymentMethod.card.exp_year,
                isSelected: paymentMethod.isSelected,
            }));
        },
        setBillingDetails: (
            state,
            action: PayloadAction<IBillingHistory[]>
        ) => {
            state.billingHistoryDetails = action.payload;
        },
    },
    selectors: {
        cardData: store => store.cards,
        customer: store => store.customer,
        paymentMethod: store => store.paymentMethods,
        billingDetailsData: store => store.billingHistoryDetails,
    },
});
export const { cardData, customer, paymentMethod, billingDetailsData } =
    cardSlice.selectors;
export const {
    addNewCard,
    setAllCards,
    updateCards,
    setCustomerInfo,
    setBillingDetails,
    setPaymentMethod,
} = cardSlice.actions;
export default cardSlice.reducer;

export const _addCard =
    (payload: ICard, callBack?: () => void): AppThunk =>
    dispatch => {
        dispatch(startLoading({ key: ApiActions.ADD_CARD }));
        addCard(payload)
            .then((response: { data: ICardResponse } | { error: string }) => {
                if ('data' in response) {
                    if (
                        response.data.meta.status === 200 ||
                        response.data.meta.status === 201
                    ) {
                        dispatch(addNewCard(response.data.data));
                        successPopUps(msgResponse.cardAdded);
                    }
                } else {
                    errorPopup(response.error);
                }

                if (callBack) {
                    callBack();
                }

                dispatch(endLoading({ key: ApiActions.ADD_CARD }));
            })
            .catch(err => {
                dispatch(endLoading({ key: ApiActions.UPDATE_PASSWORD }));
                errorPopup(err?.message as string);
            });
    };

export const _attachCustomerPaymentMethod =
    (payload: ICustomerPayload, callBack?: () => void): AppThunk =>
    dispatch => {
        dispatch(startLoading({ key: ApiActions.ATTACH_PAYMENT_CARD }));
        attachUserWithPaymentMethod(payload)
            .then(
                (
                    response:
                        | { data: IPaymentMethodsResponse }
                        | { error: string }
                ) => {
                    if ('data' in response) {
                        dispatch(setPaymentMethod(response.data.data));
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        errorPopup(response.error);
                    }
                    dispatch(
                        endLoading({ key: ApiActions.ATTACH_PAYMENT_CARD })
                    );
                }
            )
            .catch(err => {
                dispatch(endLoading({ key: ApiActions.ATTACH_PAYMENT_CARD }));
                errorPopup(err?.message as string);
            });
    };

export const _getAllPaymentMethods = (): AppThunk => dispatch => {
    dispatch(startLoading({ key: ApiActions.GET_PAYMENT_CARD }));
    getAllPaymentMethods()
        .then(
            (
                response: { data: IPaymentMethodsResponse } | { error: string }
            ) => {
                if ('data' in response) {
                    if (
                        response.data.meta.status === 200 ||
                        response.data.meta.status === 201
                    ) {
                        dispatch(setPaymentMethod(response.data.data));
                    }
                    if (response.data.meta.status === 204) {
                        warningPopup(response.data.meta.message);
                    }
                } else {
                    errorPopup(response.error);
                }
                dispatch(endLoading({ key: ApiActions.GET_PAYMENT_CARD }));
            }
        )
        .catch(err => {
            dispatch(endLoading({ key: ApiActions.GET_PAYMENT_CARD }));
            errorPopup(err?.message as string);
        });
};

export const _cardSelectionUpdate =
    (payload: string, callBack?: () => void): AppThunk =>
    dispatch => {
        dispatch(startLoading({ key: ApiActions.UPDATE_CARD_SELECT }));
        cardSelectionUpdate(payload)
            .then(
                (
                    response:
                        | { data: IUpdatePaymentMethodsResponse }
                        | { error: string }
                ) => {
                    if ('data' in response) {
                        if (
                            response.data.meta.status === 200 ||
                            response.data.meta.status === 201
                        ) {
                            dispatch(
                                updateCards({
                                    paymentMethod: response.data.data,
                                    cardID: payload,
                                })
                            );
                            if (callBack) {
                                callBack();
                            }
                        }
                    } else {
                        errorPopup(response.error);
                    }
                    dispatch(
                        endLoading({ key: ApiActions.UPDATE_CARD_SELECT })
                    );
                }
            )
            .catch(err => {
                dispatch(endLoading({ key: ApiActions.UPDATE_CARD_SELECT }));
                errorPopup(err?.message as string);
            });
    };
export const _billingHistory = (): AppThunk => dispatch => {
    dispatch(startLoading({ key: ApiActions.BILLING_HISTORY }));
    billingHistory()
        .then((value: IBillingHistoryResponse): void => {
            if (value.meta.status === 200) {
                dispatch(setBillingDetails(value.data));
            }
            if (value.meta.status === 204) {
                warningPopup(value.meta.message);
            }
            dispatch(endLoading({ key: ApiActions.BILLING_HISTORY }));
        })
        .catch(error => {
            dispatch(endLoading({ key: ApiActions.BILLING_HISTORY }));
            errorPopup(error.message as string);
        });
};
export const _getTransactionPdf =
    (payload: string): AppThunk =>
    async dispatch => {
        dispatch(startLoading({ key: ApiActions.GET_PDF_REBUTTAL }));
        try {
            // Assuming downloadPdfTransaction returns a Blob
            const blob = await downloadPdfTransaction(payload);
            dispatch(endLoading({ key: ApiActions.GET_PDF_REBUTTAL }));

            // Create a URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element for downloading
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transaction.pdf';
            document.body.appendChild(a);
            a.click();

            // Optionally open in a new tab
            const newTab = window.open(url, GeneralEnums.BLANK);
            if (newTab) {
                newTab.focus();
            } else {
                alert(PopUpMessage.openPdfTab);
            }

            // Clean up
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            const error = err as AxiosError;
            dispatch(endLoading({ key: ApiActions.GET_PDF_REBUTTAL }));
            errorPopup(error.message);
        }
    };
