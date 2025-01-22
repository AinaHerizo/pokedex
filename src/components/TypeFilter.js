import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { Select } from '@mui/material'

const TypeFilter = ({background}) => {
  return (
    <FormControl  style={{background:background, width:"300px"}}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
            id="type-pokemon"
            label="Type"
        >
            <MenuItem value={"steel"}>Steel</MenuItem>
            <MenuItem value={"fighting"}>Fighting</MenuItem>
            <MenuItem value={"dragon"}>Dragon</MenuItem>
            <MenuItem value={"water"}>Water</MenuItem>
            <MenuItem value={"electric"}>Electric</MenuItem>
            <MenuItem value={"fairy"}>Fairy</MenuItem>
            <MenuItem value={"fire"}>Fire</MenuItem>
            <MenuItem value={"ice"}>Ice</MenuItem>
            <MenuItem value={"bug"}>Bug</MenuItem>
            <MenuItem value={"normal"}>Normal</MenuItem>
            <MenuItem value={"grass"}>Grass</MenuItem>
            <MenuItem value={"poison"}>Poison</MenuItem>
            <MenuItem value={"psychic"}>Psychic</MenuItem>
            <MenuItem value={"rock"}>Rock</MenuItem>
            <MenuItem value={"ground"}>Ground</MenuItem>
            <MenuItem value={"ghost"}>Ghost</MenuItem>
            <MenuItem value={"dark"}>Dark</MenuItem>
            <MenuItem value={"flying"}>Flying</MenuItem>
        </Select>
      </FormControl>
  )
}

export default TypeFilter