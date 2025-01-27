import React from 'react'
import axios  from "axios"
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Button = ({inversed, currentPokemonId, onClick}) => {
  // state
  const [pokemonInfo, setPokemonInfo] = useState()

  // AXIOS
    const pokemonFetch = async () => {
      try {
        if ( currentPokemonId <= 0 || currentPokemonId > 1025) {
          console.log("Invalid pokémon ID,");
          return null
        }
        const pokemonFetchResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemonId}/`)
        const pokemonDetail = pokemonFetchResult.data
        const pokemonName = pokemonDetail.name
        const pokemonImage = pokemonDetail.sprites.front_default

        return {
          name:pokemonName,
          image:pokemonImage
        }

      } catch (error) {
        console.error(error);
      }
    }
  // END AXIOS

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPokemon = await pokemonFetch();
      setPokemonInfo(fetchedPokemon)
    }

    fetchData();
  }, [currentPokemonId])

  console.log(pokemonInfo);
  


  if (!pokemonInfo) {
    return <Skeleton variant="rectangular" width={156.11} height={66} />;
  }

  return (
      currentPokemonId <= 0 || currentPokemonId > 1025 ? (
        <p className="buttonSwitch" onClick={onClick}>
          no pokemon further
        </p>
      ) : (
        !inversed ? (
          <div className="buttonSwitch" onClick={onClick}>
            <ArrowBackIosNewOutlinedIcon />
            <img src={pokemonInfo.image} alt={pokemonInfo.name} />
            <span>{pokemonInfo.name}</span>
            <span>#{currentPokemonId}</span>
          </div>
        ) : (
          <div className="buttonSwitch" onClick={onClick}>
            <span>#{currentPokemonId}</span>
            <span>{pokemonInfo.name}</span>
            <img src={pokemonInfo.image} alt={pokemonInfo.name} />
            <ArrowForwardIosOutlinedIcon />
          </div>
        )
      )
    );
}

export default Button