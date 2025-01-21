import React from 'react'
import Card from './Card.js'
import InfoSpan from './InfoSpan.js'
import InfoStat from './InfoStat.js'
import EvolutionLineage from './EvolutionLineage.js'
import Button from './Button.js'

const InformationCard = () => {
  return (
    <div className="pokedex-container_information">

      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" className="pokemonCard-image"/>
      <p className="pokemonCard-number">#numero</p>
      <p className="pokemonCard-name">Name</p>

      <div className="pokedex-entry">
        <h2>POKÉDEX ENTRY</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, dolorem esse nisi aut ducimus cumque.</p>
      </div>

      <h3>ABILITIES</h3>
      <p className="abilities">
        <InfoSpan insideText="Torrent"/>
        <InfoSpan insideText="Defiant"/>
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

      <div>
        <Button inversed={false}/>
        <Button inversed={true}/>
      </div>
    </div> 
  )
}

export default InformationCard
