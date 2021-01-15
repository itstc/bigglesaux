import React from 'react';

export default ({color, itemName}) => {
  return <span style={{
    color: `#${color}`
  }}>[{itemName}]</span>;
}
