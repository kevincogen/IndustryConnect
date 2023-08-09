import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className='resume-form'>
      <h3>
        No Details, head back to: 
        <Link to= '/'>homepage</Link>
      </h3>
    </div>
  )
};

export default ErrorPage;