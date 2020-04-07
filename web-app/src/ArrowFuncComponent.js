import React, { useEffect, useState } from "react";

const ArrowFuncComponent = ({ name }) => {
  const [date, setDate] = useState(new Date());

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // When ArrowFuncComponent mount
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      // When ArrowFuncComponent un mount
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    return setDate(new Date());
  };
  return (
    <>
      <h1 className="greeting">Hello, {name}!</h1>
      <h2>{date.toLocaleTimeString()}</h2>
    </>
  );
};

export default ArrowFuncComponent;
