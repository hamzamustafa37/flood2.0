import {
    type IUserToBeRegister,
    type IUser,
    type IUserSignIn,
    type ICard,
} from '@/utils/commonTypes';
import { type ApiActions } from './index';
export interface PayloadActionLoading {
    key: ApiActions;
}

export interface PayloadActionUserToBeRegister {
    key: keyof IUserToBeRegister;
    value: string | boolean;
}

export interface PayloadActionUserToBeSignIn {
    key: keyof IUserSignIn;
    value: string | boolean;
}
export interface PayloadActionUserProfile extends Partial<IUser> {}

export interface PayloadActionCard extends Partial<ICard> {}
export interface PayloadActionCards extends Partial<ICard[]> {}

export interface PayloadActionGeneral {
    value:
        | string
        | number
        | boolean
        | Date
        | string[]
        | number[]
        | boolean[]
        | Date[]
        | IUser;
}
