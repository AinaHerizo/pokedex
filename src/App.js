import Card from './components/Card.js'
import InformationCard from './components/InformationCard.js'

function App() {
  return (
    <div className="pokedex">
      <h1>Pokédex Alpha</h1>
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
        </div>
        <InformationCard />
      </div>
    </div>
  );
}

export default App;
