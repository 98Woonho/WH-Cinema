import React, { useState } from 'react';
import '../css/Loading.css';

const Loading = ({isVisible}) => {
  return (
    <div id="loading" className={isVisible ? 'visible' : '' }>
      <img src='/loading.png' alt="" className="icon" />
      <span className="text">잠시만 기다려 주세요...</span>
    </div>
  );
};

export default Loading;
