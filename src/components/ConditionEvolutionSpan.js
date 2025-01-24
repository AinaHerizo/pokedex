import React from 'react'

const ConditionEvolutionSpan = ({conditionType, conditionExecute}) => {
  return (
    <p className="evolution_condition">
        <span>{conditionType}</span>
        <span>{conditionExecute}</span>
    </p>
  )
}

export default ConditionEvolutionSpan