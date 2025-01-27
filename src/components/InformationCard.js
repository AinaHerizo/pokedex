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

const InformationCard = ({url, handleButtonChange}) => {
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
      // setState for test
      // setstate(pokedexData)
      // End test
      const pokemonPokedexEntry = pokedexData.flavor_text_entries.find((entry) => entry.language.name === "en" && entry.version.name === "shield")?.flavor_text || "No description available"
      // damage relation
      const pokemonAllTypes = pokemonDetails.types.map((eachType)=> eachType.type.url)
      const pokemonTypesDetails = await Promise.all(
        pokemonAllTypes.map(async (eachTypesUrl) => {
          try {
            const eachTypesResponse = await axios.get(eachTypesUrl)
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
      const pokemonWeakness = [...new Set(allPokemonDoubleDamageType)]
      // evolution url
      const evolutionChainUrlResponse = await axios.get(pokedexData.evolution_chain.url)
      const evolutionChainData = evolutionChainUrlResponse.data.chain 
      // RECURSIVE FUNCTION FOR CHAIN DATA
      const getAllSpecies = (chain) => {
        const speciesList = [];
        const traverseChain = (node) => {
          if (node.species) {
            speciesList.push(node.species.url);
          }
          // Vérifie si l'enfant existe, et parcours les enfants récursivement
          if (node.evolves_to && node.evolves_to.length > 0) {
            node.evolves_to.forEach((childNode) => traverseChain(childNode));
          }
        };
        traverseChain(chain);
        return speciesList;
      };
      const getAllSpeciesEvolveCondition = (chain) => {
        const speciesList = [];
        const traverseChain = (node) => {
          if (node.evolution_details) {
            speciesList.push(node.evolution_details.length==0 ? null : node.evolution_details );
          }
          // Vérifie si l'enfant existe, et parcours les enfants récursivement
          if (node.evolves_to && node.evolves_to.length > 0) {
            node.evolves_to.forEach((childNode) => traverseChain(childNode));
          }
        };
        traverseChain(chain);
        return speciesList;
      };
      // END RECURSIVE FUNCTION
      const speciesEvolutionUrl = getAllSpecies(evolutionChainData)
      const speciesEvoConditionDetails = getAllSpeciesEvolveCondition(evolutionChainData)
      // const speciesEvoConditionEachMap = speciesEvoConditionDetails.map((eachConditionMap)=> {
      //   if (eachConditionMap != null && Array.isArray(eachConditionMap)) {
      //     const firstElement = eachConditionMap[0];
      //     // Vérifie si le premier élément est un tableau avant d'appeler filter
      //     if (Array.isArray(firstElement)) {
      //       return firstElement.filter((test) => test); // Filtre les éléments "falsy" (null, undefined, false, etc.)
      //     }
      //     // Si ce n'est pas un tableau, retourne null ou un autre traitement
      //     return null;
      //   }
           
      // })
      const speciesEvoConditionEachMap = speciesEvoConditionDetails
        .filter((eachConditionMap) => eachConditionMap != null && Array.isArray(eachConditionMap)) // Garde uniquement les tableaux valides
        .map((eachConditionMap) => eachConditionMap[0]) // Récupère le premier élément de chaque tableau
        .filter((firstElement) => firstElement !== undefined); // Supprime les valeurs undefined
      const speciesAllTrueCondition = speciesEvoConditionEachMap.map((eachCondition)=>{
        const filteredEntries = Object.entries(eachCondition).filter(([key,value]) => value != null && value != false)
        return filteredEntries[0]
      })
      const speciesEvolutionImage = await Promise.all(
        speciesEvolutionUrl.map(async (eachSpeciesUrl) => {
          try {
            const eachSpeciesDetailsResponse = await axios.get(eachSpeciesUrl)
            const eachSpeciesPokemonUrl = eachSpeciesDetailsResponse.data.varieties[0].pokemon.url
            const eachPokemonUrlResponse = await axios.get(eachSpeciesPokemonUrl)
            const eachPokemonUrlImage = eachPokemonUrlResponse.data.sprites.front_default
            return eachPokemonUrlImage
          } catch (error) {
            console.error(error);
            
          }
        })
      )
      
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
        weakness:pokemonWeakness,
        evolutionImages:speciesEvolutionImage,
        evolutionCondition:speciesAllTrueCondition,
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
  // console.log(state);
  

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
            {informationAboutThePokemon.weakness && Array.isArray(informationAboutThePokemon.weakness) ? (
              informationAboutThePokemon.weakness.length > 0 ? (
                  <WeaknessType weaknesses={informationAboutThePokemon.weakness}/>
              ) : (
                <InfoSpan insideText="No weaknesses available" />
              )
            ) : (
              <InfoSpan insideText="..." />
            )}
        </div>
        <div>
            <h3>BASE EXP</h3>
            <InfoSpan insideText={!informationAboutThePokemon.base_exp ? "..." : informationAboutThePokemon.base_exp}/>
        </div>
      </div>

      <h3>STATS</h3>
      <InfoStat  hp={getStatValue(0)} atk={getStatValue(1)} def={getStatValue(2)} spA={getStatValue(3)} spD={getStatValue(4)} spd={getStatValue(5)}/>
      <h3>EVOLUTION</h3>
      <EvolutionLineage images={informationAboutThePokemon.evolutionImages} condition={informationAboutThePokemon.evolutionCondition}/>

      <div className="buttonContainer">
        <Button inversed={false} currentPokemonId={informationAboutThePokemon.id - 1} onClick={() => handleButtonChange(`https://pokeapi.co/api/v2/pokemon/${informationAboutThePokemon.id - 1}`)}/>
        <Button inversed={true} currentPokemonId={informationAboutThePokemon.id + 1} onClick={() => handleButtonChange(`https://pokeapi.co/api/v2/pokemon/${informationAboutThePokemon.id + 1}`)}/>
      </div>
    </div> 
  )
}

export default InformationCard