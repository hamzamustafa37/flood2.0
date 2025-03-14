// import { useState } from 'react';
// import { type Stripe, type StripeCardElement } from '@stripe/stripe-js';

// interface PaymentMethodInfo {
//     success: boolean;
//     paymentMethod?: any;
//     message?: string;
// }

// export const useStripePaymentMethod = (): {
//     paymentMethodInfo: PaymentMethodInfo;
//     createPaymentMethod: (
//         element: StripeCardElement,
//         stripe: any
//     ) => Promise<void>;
// } => {
//     const [paymentMethodInfo, setPaymentMethodInfo] =
//         useState<PaymentMethodInfo>({
//             success: false,
//         });

//     const createPaymentMethod = async (
//         element: StripeCardElement,
//         stripe: any
//     ): Promise<void> => {
//         if (!stripe) {
//             setPaymentMethodInfo({
//                 success: false,
//                 message: 'Stripe not initialized',
//             });
//             return;
//         }

//         try {
//             if (stripe) {
//                 console.log('hittt>>>>>>');
//                 const paymentMethod = await stripe.createPaymentMethod({
//                     type: 'card',
//                     card: element,
//                 });
//                 console.log(paymentMethod);
//             }
//         } catch (error: any) {
//             console.log(error);
//             setPaymentMethodInfo({
//                 success: false,
//                 message: error?.message,
//             });
//         }
//     };

//     return { paymentMethodInfo, createPaymentMethod };
// };
