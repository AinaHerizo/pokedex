import React from 'react'
import Card from './Card.js'
import InfoSpan from './InfoSpan.js'
import WeaknessType from './WeaknessType.js'
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
  // const [state, setstate] = useState()
  
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
      // damage relation
      const pokemonAllTypes = pokemonDetails.types.map((eachType)=> eachType.type.url)
      const pokemonTypesDetails = await Promise.all(
        pokemonAllTypes.map(async (eachTypesUrl) => {
          try {
            const eachTypesResponse = await axios.get(eachTypesUrl)
            // test
            const data = eachTypesResponse.data
            // end test
            const eachTypesDoubleDamage = eachTypesResponse.data.damage_relations.double_damage_from.map((eachTypeDoubleDamage)=> eachTypeDoubleDamage.name).flat()
            const eachTypesHalfDamage = eachTypesResponse.data.damage_relations.half_damage_from.map((eachTypeHalfDamage)=> eachTypeHalfDamage.name)
            const eachTypesNoDamage = eachTypesResponse.data.damage_relations.no_damage_from.map((eachTypeNoDamage)=> eachTypeNoDamage.name)

            
            return [eachTypesDoubleDamage, eachTypesHalfDamage, eachTypesNoDamage]
          } catch (error) {
            console.error(error);
          }
        })
      )
      const pokemonDoubleDamageType = pokemonTypesDetails.map((eachType)=> eachType[0]).flat()
      const pokemonHalfDamageType = pokemonTypesDetails.map((eachType)=> eachType[1]).flat()
      const pokemonNoDamageType = pokemonTypesDetails.map((eachType)=> eachType[2]).flat()
      // Filtered element with *1 or none damage
      const allPokemonDoubleDamageType = pokemonDoubleDamageType.filter((type) => !pokemonHalfDamageType.includes(type) && !pokemonNoDamageType.includes(type))
      // setstate(allPokemonDoubleDamageType)


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
        weakness:allPokemonDoubleDamageType,
      }) 
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
  // Function for stat value
  const getStatValue = (index) => {
    return informationAboutThePokemon.stat ? informationAboutThePokemon.stat[index] : "0";
  };

  // Console log pour les test
  // console.log(informationAboutThePokemon);
  

  return (
    
    <div className="pokedex-container_information">
      {!informationAboutThePokemon.image ? 
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
            <InfoSpan insideText={!informationAboutThePokemon.height ? "..." : ((informationAboutThePokemon.height/10)+" m")}/>
        </div>
        <div>
            <h3>WEIGHT</h3>
            <InfoSpan insideText={!informationAboutThePokemon.weight ? "..." : ((informationAboutThePokemon.weight/10)+" kg")}/>
        </div>
        <div>
            <h3>WEAKNESSES</h3>
            <WeaknessType weaknesses={informationAboutThePokemon.weakness.length === 0 ? "no weakness" : informationAboutThePokemon.weakness}/>
        </div>
        <div>
            <h3>BASE EXP</h3>
            <InfoSpan insideText={!informationAboutThePokemon.base_exp ? "..." : informationAboutThePokemon.base_exp}/>
        </div>
      </div>

      <h3>STATS</h3>
      <InfoStat  hp={getStatValue(0)} atk={getStatValue(1)} def={getStatValue(2)} spA={getStatValue(3)} spD={getStatValue(4)} spd={getStatValue(5)}/>
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
