import React from 'react'
import "./schedules.css"
const Schedules = () => {
  return (
    <div className='Schedules'>
     <h2 className="title">Our Service Schedule</h2>
        <table>
            <thead>
                <tr>
                    <td>Event</td>
                    <td>Sunday Services</td>
                    <td>Midweek Service</td>
                    <td>New Month Prayers</td>
                    <td>Daily Online Prayer Community</td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>Time:</td>
                <td> 8:00 AM</td>
                <td> Wednesdays at 6:00 PM</td>
                <td> Every 1st Saturday of the month at 8:00 AM</td>
                <td> Monday to Friday at various times (6:00 AM–7:00 AM, 6:00 PM–7:00 PM, 9:00 PM–10:00 PM, 12:00 AM–1:00 AM)</td>
            </tr>
            <tr>
                <td>Location</td>
                <td>RCCG NewSpring, Idiroko Bus Stop</td>
                <td>RCCG NewSpring, Idiroko Bus Stop</td>
                <td>RCCG NewSpring, Idiroko Bus Stop</td>
                <td>Time: Saturday at multiple sessions (6:00 AM–7:00 AM, 9:00 AM–10:00 AM, 12:00 PM–1:00 PM, 3:00 PM–4:00 PM, 6:00 PM–7:00 PM, 9:00 PM–10:00 PM, 12:00 AM–1:00 AM)</td>
            </tr>
            </tbody>
        </table>

    </div>

 
  )
}

export default Schedules