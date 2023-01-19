
import { AppDispatch } from './../../index';
import { async } from 'q';
import { IUser } from './../../../models/IUser';
import { IEvent } from './../../../models/IEvent';
import { EventActionEmun, SetEventsAction, SetGuestsAction } from './types';
import axios from 'axios';
import UserService from '../../../api/UserService';


export const EventActionCreators = {
    SetEvents: (event: IEvent[]): SetEventsAction => ({type: EventActionEmun.SET_EVENTS, payload: event}),
    setGuests: (guest: IUser[]): SetGuestsAction => ({type: EventActionEmun.SET_GUESTS, payload: guest}), 
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
         const response = await UserService.getUsers() 
         dispatch(EventActionCreators.setGuests(response.data))
        }
        catch(e){
            console.log(e)
        }
    }, 
    createEvent: (event: IEvent) =>  async (dispatch: AppDispatch) => {
      try{
        const events = localStorage.getItem('events') || '[]' 
        const json = JSON.parse(events) as IEvent[]
        json.push(event)
        dispatch(EventActionCreators.SetEvents(json))
        localStorage.setItem('events', JSON.stringify(json))
      }
      catch (e) {
       console.log(e)
      }    }, 
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
      try{
          const events = localStorage.getItem('events') || '[]'
          const json = JSON.parse(events) as IEvent[]
          const currentUserEvents  = json.filter(ev => ev.author == username || ev.guest == username)
          dispatch(EventActionCreators.SetEvents(currentUserEvents))
      }
       catch (e) {
           console.log(e)
       }
    }
}