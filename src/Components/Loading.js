import React from 'react';
import loadingImg from './Images/loading.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className='my-4'>
        <img src={loadingImg} alt="Loading ..." className='m-auto'></img>
      </div>
    )
  }
}

export default Loading;