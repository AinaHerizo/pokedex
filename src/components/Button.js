import React from 'react'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Button = ({inversed}) => {
  return (
    <p className="buttonSwitch">
    {!inversed ?
        <>
            <ArrowBackIosNewOutlinedIcon />
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"/>
            <span>Name</span>
            <span>#numero</span> 
        </> 
        :
        <>
            <span>#numero</span> 
            <span>Name</span>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"/>
            <ArrowForwardIosOutlinedIcon />
        </>
    }   
    </p>
  )
}

export default Button