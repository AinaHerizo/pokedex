import React from 'react'

// STYLE
const styleColor = {
  hp: "red",
  atk: "orange",
  def: "yellow",
  spA: "rgb(31, 236, 255)",
  spD: "rgb(40, 237, 53)",
  spd: "rgb(255, 52, 140)",
  tot: "#7295dc",
}

const InfoStat = ({hp,atk,def,spA,spD,spd}) => {
    const tot = Number(hp+atk+def+spA+spD+spd)

  return (
    <ul className="statList-container">
      <li><span className="statList-title" style={{ backgroundColor: styleColor.hp }}>HP</span><span className="statList-info">{hp}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.atk }}>ATK</span><span className="statList-info">{atk}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.def }}>DEF</span><span className="statList-info">{def}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.spA }}>SpA</span><span className="statList-info">{spA}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.spD }}>SpD</span><span className="statList-info">{spD}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.spd }}>SPD</span><span className="statList-info">{spd}</span></li>
      <li><span className="statList-title" style={{ backgroundColor: styleColor.tot }}>TOT</span><span className="statList-info">{tot}</span></li>
    </ul>
  )
}

export default InfoStat
