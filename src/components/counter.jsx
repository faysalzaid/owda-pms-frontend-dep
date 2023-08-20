/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { PropTypes } from "prop-types";

const Counter = (props) => {
  let [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => {
        if (count < props.number) {
          return count + 1;
        } else {
          clearInterval(timer);
          return count;
        }
      });
    }, 5);
    return () => clearInterval(timer);
  });

  return (
    <>
        <div className="counter-text mt-4 md:mt-0 max-w-screen-xl text-center items-center justify-center mx-auto container">
          {props.type === "%" ?  <p className="">{count}%</p> :  <p className="">{count}+</p>}
          <p>{props.text}</p>
        </div>
    </>
  );
};
Counter.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
export default Counter;