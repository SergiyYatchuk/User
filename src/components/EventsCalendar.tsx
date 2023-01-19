import { Badge, Calendar } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { formatDate } from '../utils/date'

interface EventsCalendarProps {
   events: IEvent[];
}


const EventsCalendar: FC<EventsCalendarProps> = (props) => {
    function dateCallRender(value: Moment) {
       const formatedDate = formatDate(value.toDate())
       const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map((el: IEvent, index: number) => 
                  <div key={index}>{el.description} </div>
                  )}

            </div>
        )
    }
    return (
        <Calendar  dateCellRender={dateCallRender}/>     
    )
}

export default EventsCalendar