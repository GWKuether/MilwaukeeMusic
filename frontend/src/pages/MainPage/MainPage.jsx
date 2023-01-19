import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar/Calendar";


const MainPage = (props) => {
  const [todayDate, setTodayDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setTodayDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <h1>Here it is, the page we've all been waiting for!</h1>
      <h1>{todayDate.toLocaleDateString()}</h1>
      <Calendar />
    </div>
  );
};

export default MainPage;
