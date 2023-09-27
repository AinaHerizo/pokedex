import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardPokemon from './composant/CardPokemon';
import { Backdrop, Box, CircularProgress, List, Pagination, ThemeProvider, Typography, createTheme } from '@mui/material';

const App = () => {


  // STYLE AND THEME CREATION
  const theme = createTheme ({
    palette: {
      primary: {
        main:'#fbd743',
      },
      secondary: {
        main: '#ff1f1f',
      },
    }
  })
  const container = {
    background:'#5db9ff',
    width:'60%',
    margin:'auto',
    textAlign:'center',
  }


  // APP VARIABLE
  const [numberPokemons, setNumberPokemons] = useState(0)
  const [allPokemons, setAllPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingCard, setLoadingCard] = useState(false)
    // pagination
    const [page, setPage] = useState(1)
    const pokemonPerPage = 50

    useEffect(() => {
    const getPokemons = async() => {
      try {
        const offset = (page-1)*pokemonPerPage
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`)
        setNumberPokemons(res.data.count)
        setAllPokemons(res.data.results)
        setIsLoading(true)
      }
      catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      }
    }

    getPokemons()
    },[page])

    const handlePageChange = (event,newPage) => {
      setLoadingCard(false)
      setPage(newPage)
    }
    

  return (
      isLoading ?  
        <ThemeProvider theme={theme}>
        <Box sx={container}>
          <Typography color="primary">il y a en tout {numberPokemons} pokemon</Typography>
          <List> 
            {allPokemons.map((pok, index) => (
              <CardPokemon key={index} id={index+1} pokemonDataLink={pok.url} loadingCard={loadingCard} page={page}>{pok.name}</CardPokemon>
            ))}
          </List>
          <Pagination 
            count={Math.ceil(numberPokemons / pokemonPerPage)}
            page={page}
            onChange={handlePageChange}
            color='primary' 
            size='large'
            shape='rounded'
            sx={{justifyContent:'center'}}/>
        </Box>
        </ThemeProvider>
      :
      
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>

  );
};

export default App;