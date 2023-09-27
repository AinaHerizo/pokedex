import { Card, CardActionArea, CardContent, CardMedia, ListItem, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CardPokemon = ({id, pokemonDataLink, children, loadingCard, page}) => {

    const [pokemonImage, setPokemonImage] = useState()
    const [isLoading, setIsLoading] = useState(loadingCard)
    useEffect(() => {
        const getPokemon = async() => {
            try {
              const res = await axios.get(pokemonDataLink)
              setPokemonImage(res.data.sprites.front_default)
              setIsLoading(true)
            }
            catch (error) {
              console.error('Une erreur s\'est produite lors de la récupération des données :', error);
            }
          }
        getPokemon()
      },[page])
    return (
        <ListItem 
        sx={{justifyContent:'center'}}>
          <Card sx={{width:'50%',}}>
            <CardActionArea>
              {isLoading?
              <CardMedia 
                component="img"
                height="100"
                image={pokemonImage}
                alt={'Pokemon number '+{id}}
                sx={{objectFit: 'contain',}}/>
              
                :

              <Skeleton variant='rounded' height={100} />
              
              }
              <CardContent sx={{padding:'0'}}>
                <Typography variant='h5' sx={{textAlign: 'center'}}>{children}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
    );
};

export default CardPokemon;