import { IEvent } from './../../../models/IEvent';
import { IUser } from './../../../models/IUser';


export interface EventState  {
   guests: IUser[], 
   events: IEvent[]
}

export enum EventActionEmun {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS'
}

export interface SetGuestsAction {
    type: EventActionEmun.SET_GUESTS, 
    payload: IUser[]
}


export interface SetEventsAction {
    type: EventActionEmun.SET_EVENTS, 
    payload: IEvent[]
}

export type EventAction =
    SetEventsAction |
    SetGuestsAction
