import React from 'react';
import "./schedules.css";



const Schedules = ({scheduleData}) => {
  return (
    <div className='Schedules'>
      <h2 className="title">Our Service Schedule</h2>
      <table>
        <thead>
          <tr>
            <td>Event</td>
            <td>Time</td>
            <td>Location</td>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td>{item.event}</td>
              <td>{item.time}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedules;