import { EventAction, EventActionEmun, EventState } from './types';
import { IEvent } from './../../../models/IEvent';
import { IUser } from './../../../models/IUser';

const initialState: EventState = {
    guests: [], 
    events: []
}

export default function EventReducer(state = initialState, action: EventAction): EventState{
   switch(action.type){
     case EventActionEmun.SET_EVENTS: {
       return {...state, events: action.payload}
     }
     case EventActionEmun.SET_GUESTS: {
       return {...state, guests: action.payload}
     }
      default: 
      return state
   }
}