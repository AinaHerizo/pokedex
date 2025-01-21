import React from 'react'

// STYLE
const styleColor = {
    grass: "greenyellow",
    poison: "rgb(159, 0, 244)",
    fire: "red",
    flying: "rgb(201, 250, 255)",
    water: "rgb(0, 119, 255)",
    bug: "rgb(203, 248, 41)",
    normal: "rgb(172, 172, 172)",
    electric: "yellow",
    ground: "rgb(134, 47, 47)",
    fairy: "rgb(255, 208, 215)",
    fighting: "orange",
    psychic: "rgb(251, 125, 146)",
    rock: "rgb(201, 198, 132)",
    steel: "rgb(132, 174, 237)",
    ice: "rgb(19, 243, 255)",
    ghost: "rgb(112, 65, 233)",
    dragon: "rgb(65, 93, 233)",
    dark: "rgb(65, 25, 25)",
}

const Card = ({pokemonTypes}) => {
    const backgroundColor = styleColor[pokemonTypes];

  return (
    <div className="pokemonCard">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" className="pokemonCard-image"/>
        <p className="pokemonCard-number">N°numéro</p>
        <p className="pokemonCard-name">Name</p>
        <p className="pokemonCard-type">
            <span className="pokemonCard-type_element" style={{backgroundColor:"red"}}>Type 1</span><span className="pokemonCard-type_element" style={{backgroundColor:"pink"}}>Type 2</span>
        </p>
    </div>
  )
}

export default Card
