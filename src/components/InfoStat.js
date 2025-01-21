import React from 'react'

const InfoStat = ({hp,atk,def,spA,spD,spd}) => {
    const tot = hp+atk+def+spA+spD+spd

  return (
    <ul>
      <li><span>HP</span><span>{hp}</span></li>
      <li><span>ATK</span><span>{atk}</span></li>
      <li><span>DEF</span><span>{def}</span></li>
      <li><span>SpA</span><span>{spA}</span></li>
      <li><span>SpD</span><span>{spD}</span></li>
      <li><span>SPD</span><span>{spd}</span></li>
      <li><span>TOT</span><span>{tot}</span></li>
    </ul>
  )
}

export default InfoStat
