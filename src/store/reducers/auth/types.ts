import {IUser} from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR",
}
export interface setAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean;
}
export interface setErrorAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string;
}
export interface setUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser;
}
export interface setLoadingAction {
    type: AuthActionEnum.SET_LOADING;
    payload: boolean;
}

export type AuthAction =
    setAuthAction  |
    setErrorAction |
    setUserAction  |
    setLoadingAction
