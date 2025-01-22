import React from 'react'
import TextField from '@mui/material/TextField'

const NumberTo = ({background}) => {
  return (
    <>
        <label for="from">From</label>
        <TextField
          id="from"
          type="number"
          style={{background:background}}
        />
        <label for="to">To</label>
        <TextField
          id="to"
          type="number" 
          style={{background:background}}        
        />
    </>
  )
}

export default NumberTo