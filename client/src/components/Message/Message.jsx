import React from 'react';
import "./message.css";

const Message = ({ data }) => {

  return (
    <>
      <div className='msg-pop' data-aos="slide-left">
        <div className='msg-body'>
          <h4>Message: {data}</h4>
        </div>
      </div>
    </>
  );
};

export default Message;
