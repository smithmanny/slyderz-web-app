import React, { useEffect } from 'react';

const Callback = ({ auth }) => {
  useEffect(() => {
    auth.handleAuthentication();
  })
  return (
    <div>
      Loading...
    </div>
  )
}

export default Callback;