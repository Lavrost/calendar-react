import {AuthActionEnum, setAuthAction, setErrorAction, setLoadingAction, setUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setIsAuth: (auth: boolean): setAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setUser: (user: IUser): setUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsLoading: (loading: boolean): setLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload: loading}),
    setError: (error: string): setErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    login: (username: string, password: string) => {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true));
                setTimeout(async () => {
                    const response = await UserService.getUsers()
                    const mockUser = response.data.find(user => user.username === username && user.password === password)
                    if(mockUser) {
                        localStorage.setItem('auth', 'true')
                        localStorage.setItem('username', mockUser.username)
                        dispatch(AuthActionCreators.setUser(mockUser))
                        dispatch(AuthActionCreators.setIsAuth(true))
                    } else {
                        dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
                    }
                    dispatch(AuthActionCreators.setIsLoading(false));
                }, 700)
            } catch (e: any) {
                dispatch(AuthActionCreators.setError(e.response.data.message))
            }
        };
    },
    logout: () => async(dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}