import React from 'react';

const ERROR_STYLES = {
  padding: 10,
  marginBotton: 30,
  borderRadius: 5,
  color: '#E62626',
  backgroundColor: "#FFDDDF"
}

const Errors = ({ errorMessages }) => {
  if (!errorMessages || !errorMessages.length) {
    return null;
  }

  return (
    <div style={ERROR_STYLES}>
      {errorMessages.map(e => <div key={e}>{e}</div>)}
    </div>
  )
}

export default Errors;
