import Card from './components/Card.js'
import InformationCard from './components/InformationCard.js'
import TextField from '@mui/material/TextField'
import NumberTo from "./components/NumberTo.js"
import TypeFilter from "./components/TypeFilter.js"
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import Pagination from '@mui/material/Pagination'
import axios  from "axios"
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

// STYLE
const colorStyle = {
  white:"#fff",
}

function App() {
  // STATE
  const [pokedex, setPokedex] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [maxElement, setMaxElement] = useState()
  const elementPerPage = 9
  const [numberPage, setNumberPage] = useState()
  const [actualInformationBlock, setActualInformationBlock] = useState("https://pokeapi.co/api/v2/pokemon/1/")
    // test
    // const [details, setDetails] = useState([])
    // endtest
  // END STATE

  // AXIOS
  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1025")
      const pokedexJson = response.data.results
      // take max element
      setMaxElement(pokedexJson.length)
      // axios each pokemon detail
      const detailsPokemon = await Promise.all(
        pokedexJson.map(async (eachPokemon) => {
          try {
            const eachPokemonUrl = eachPokemon.url
            const eachPokemonResponse = await axios.get(eachPokemonUrl)
            const eachPokemonImage = eachPokemonResponse.data.sprites.front_default
            const eachPokemonId = eachPokemonResponse.data.id
            const eachPokemonName = eachPokemonResponse.data.name
            const eachPokemonTypes = eachPokemonResponse.data.types.map((eachType)=> eachType.type.name)
            return {
              url:eachPokemonUrl,
              id:eachPokemonId,
              image:eachPokemonImage,
              name:eachPokemonName,
              types:eachPokemonTypes,
            }
          } catch (error) {
            console.error(error);
          }
        })
      )
      setPokedex(detailsPokemon.filter((pokemon) => pokemon !== null))
    } catch (error) {
      console.error(error);
    }
  }
  // END AXIOS

  // OTHER FUNCTION
  // useEffect for fetch the data
    useEffect(() => {
      fetchData()
  }, [])
  // useEffect for the number of page
    useEffect(() => {
      if (maxElement) { // Assure-toi que maxElement est défini
        setNumberPage(Math.ceil(maxElement / elementPerPage)) // Math.ceil pour arrondir au nombre entier supérieur
      }
    }, [maxElement])
    // current page and number of pokemon in each page
      const indexOfLastPokemonInThePage = currentPage * elementPerPage
      const indexOfFirstPokemonInThePage = indexOfLastPokemonInThePage - elementPerPage
      const pokemonInPage = pokedex.slice(indexOfFirstPokemonInThePage,indexOfLastPokemonInThePage)
      // handle the changement of page
      const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
      };
      useEffect(() => {
        setActualInformationBlock(`https://pokeapi.co/api/v2/pokemon/${indexOfFirstPokemonInThePage + 1}`);
      }, [currentPage]);
  // function for information card changement
  const handleCardClick = (newUrl) => {
    // test
    console.log("Card clicked! New URL:", newUrl);
    // end test
    setActualInformationBlock(newUrl)
  }

  // console.log for test
  console.log("CURRENT URL : " + actualInformationBlock);
  
  

  return (
    <div className="pokedex">
      <h1>Pokédex Alpha</h1>
      <div className="filter-container">
        <div className="filter-container_blockOne">
          <TextField
            id="searchPokemon"
            label="Search your pokemon" 
            style={{background:colorStyle.white}}         
          />
          <div className="block">
            <NumberTo background={colorStyle.white}/>
          </div>
        </div>
        <div className="filter-container_blockTwo">
          <TypeFilter background={colorStyle.white}/>
          <RefreshOutlinedIcon className="refresh"/>
        </div>
      </div>
      <div className="pokedex-container">
        <div className="pokedex-container_list">
          {pokedex.length === 0 ?
            Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={280} height={150} />
            ))
            : 
            pokemonInPage.map((eachPokemonInPokedex) => (
              <Card onClick={() => handleCardClick(eachPokemonInPokedex.url)} pokemonImage={eachPokemonInPokedex.image} pokemonId={eachPokemonInPokedex.id}  pokemonName={eachPokemonInPokedex.name} pokemonTypes={eachPokemonInPokedex.types}/>
            ))
          }
          <Pagination count={numberPage} variant="outlined" className="pageSwitch" onChange={(event, value) => handlePageChange(value)} page={currentPage}/>
        </div>
        <InformationCard url={actualInformationBlock}/>
      </div>
    </div>
  );
}

export default App;
