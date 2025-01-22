import Card from './components/Card.js'
import InformationCard from './components/InformationCard.js'
import TextField from '@mui/material/TextField'
import NumberTo from "./components/NumberTo.js"
import TypeFilter from "./components/TypeFilter.js"
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import Pagination from '@mui/material/Pagination'

// STYLE
const colorStyle = {
  white:"#fff",
}

function App() {
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Pagination count={10} variant="outlined" className="pageSwitch"/>
        </div>
        <InformationCard />
      </div>
    </div>
  );
}

export default App;
