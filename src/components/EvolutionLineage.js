import React from 'react'
import InfoSpan from './InfoSpan.js'

const EvolutionLineage = () => {
  return (
    <div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"/>
        <InfoSpan insideText={"Lvl 16"}/>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"/>
        <InfoSpan insideText={"Lvl 36"}/>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"/>
    </div>
  )
}

export default EvolutionLineage
