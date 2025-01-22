import React from 'react'
import Card from './Card.js'
import InfoSpan from './InfoSpan.js'
import InfoStat from './InfoStat.js'
import EvolutionLineage from './EvolutionLineage.js'
import Button from './Button.js'
import axios  from "axios"
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

const InformationCard = ({url}) => {
  // STATE
  const [informationAboutThePokemon, setInformationAboutThePokemon] = useState({})
  // test
  const [state, setstate] = useState()
  
  // AXIOS
  const fecthDataSinglePokemon = async () => {
    try {
      // pokemon url
      const response = await axios.get(url)
      const pokemonDetails = response.data
      const pokemonId = pokemonDetails.id
      const pokemonName = pokemonDetails.name
      const pokemonBaseExp = pokemonDetails.base_experience
      const pokemonHeight = pokemonDetails.height
      const pokemonWeight = pokemonDetails.weight
      const pokemonImage = pokemonDetails.sprites.front_default
      const pokemonAbilities = pokemonDetails.abilities.map((eachAbilitie) => eachAbilitie.ability.name)
      const pokemonStats = pokemonDetails.stats.map((eachStat) => eachStat.base_stat)
      // pokedex url
      const pokedexUrlResponse = await axios.get(pokemonDetails.species.url)
      const pokedexData = pokedexUrlResponse.data
      const pokemonPokedexEntry = pokedexData.flavor_text_entries.find((entry) => entry.language.name === "en" && entry.version.name === "shield")?.flavor_text || "No description available"
      // evolution url
      const evolutionChainUrlResponse = await axios.get(pokedexData.evolution_chain.url)
      const evolutionChainData = evolutionChainUrlResponse.data

      setInformationAboutThePokemon({
        id:pokemonId,
        name:pokemonName,
        base_exp:pokemonBaseExp,
        height:pokemonHeight,
        weight:pokemonWeight,
        image:pokemonImage,
        abilities:pokemonAbilities,
        stat:pokemonStats,
        pokedex_entry:pokemonPokedexEntry,
      }) 
      setstate(evolutionChainData)
    } catch (error) {
      console.error(error);
    }
  }
  // END AXIO
  // OTHER FUNCTION
  // useEffect pour fetch data
  useEffect(() => {
    if (url) {
      fecthDataSinglePokemon();
    }
  }, [url]);

  // Console log pour les test
  console.log(informationAboutThePokemon);
  

  return (
    
    <div className="pokedex-container_information">
      {informationAboutThePokemon.image ? 
        <Skeleton variant="rectangular" className="pokemonCard-image" width={300} height={300}/>
      :
        <img src={informationAboutThePokemon.image} className="pokemonCard-image"/>
      }
      
      <p className="pokemonCard-number">#{informationAboutThePokemon.id}</p>
      <p className="pokemonCard-name">{informationAboutThePokemon.name}</p>

      <div className="pokedex-entry">
        <h2>POKÉDEX ENTRY</h2>
        <p>{informationAboutThePokemon.pokedex_entry}</p>
      </div>

      <h3>ABILITIES</h3>
      <p className="abilities">
          {informationAboutThePokemon.abilities && informationAboutThePokemon.abilities.length > 0 ? (
          informationAboutThePokemon.abilities.map((eachAbilitie, index) => (
            <InfoSpan key={index} insideText={eachAbilitie} />
          ))
          ) : (
            <InfoSpan insideText="null" />
          )}
      </p>

      <div className="physicStat">
        <div>
            <h3>HEIGHT</h3>
            <InfoSpan insideText="1.7m"/>
        </div>
        <div>
            <h3>WEIGHT</h3>
            <InfoSpan insideText="84.5kg"/>
        </div>
        <div>
            <h3>WEAKNESSES</h3>
            <InfoSpan insideText="x2"/>
        </div>
        <div>
            <h3>BASE EXP</h3>
            <InfoSpan insideText={239}/>
        </div>
      </div>

      <h3>STATS</h3>
      <InfoStat hp={84} atk={86} def={88} spA={111} spD={101} spd={60}/>
      <h3>EVOLUTION</h3>
      <EvolutionLineage />

      <div className="buttonContainer">
        <Button inversed={false}/>
        <Button inversed={true}/>
      </div>
    </div> 
  )
}

export default InformationCard
