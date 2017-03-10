import React from 'react'

export const Btn = ({ children, onClick }) => (
  <button className='btn btn-default' onClick={onClick}>
    {children}
  </button>
)

export default Btn
