
import { AppDispatch } from './../../index';
import { IUser } from '../../../models/IUser';
import { AuthActionEnum, SetUserAction, SetIsLoading, SetAuthAction, SetErrorAction} from './types';
import axios from 'axios';
import UserService from '../../../api/UserService';


export const AuthActionCreators = {
    setUser: (user: IUser) : SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setError: (payload: string) : SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean) : SetIsLoading => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setIsAuth: (auth: boolean) : SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}), 
    login: (username: string, password:string) => async (dispatch: AppDispatch) => {
      try{
         dispatch(AuthActionCreators.setIsLoading(true)); 
         setTimeout( async () => {
            const response = await UserService.getUsers()
            const mockUser = response.data.find(user => user.username === username && user.password === password)
           
            if(mockUser){
               localStorage.setItem('auth', 'true')
               localStorage.setItem('username', mockUser.username)
               dispatch(AuthActionCreators.setUser(mockUser))
               dispatch(AuthActionCreators.setIsAuth(true))
               
            } else {
               dispatch(AuthActionCreators.setError('username or passwors is not correct'))
            }
           dispatch(AuthActionCreators.setIsLoading(false))
         }, 1000)
         
      }
      catch (e) {
          dispatch(AuthActionCreators.setError('Помилка в логіні'))

      }
    }, 
    logout: () => async (dispatch: AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false))
       }
    
}