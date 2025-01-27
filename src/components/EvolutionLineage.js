import React from 'react'
import ConditionEvolutionSpan from './ConditionEvolutionSpan.js'
import Skeleton from '@mui/material/Skeleton'

const EvolutionLineage = ({images, condition}) => {
  
  return (
    <div className="lineage">
        {(images && Array.isArray(images)) && (condition && Array.isArray(condition)) ? (
          images.map((url, index) => (
            <>
              <img src={url} alt={`Image ${index + 1}`} />
              {condition[index] ? (
                <ConditionEvolutionSpan 
                  conditionType={condition[index][0]} 
                  conditionExecute={
                    typeof condition[index][1] === 'object' && condition[index][1] !== null 
                      ? condition[index][1].name 
                      : condition[index][1]
                  }  
                />
              ) : (
                null
              )}
            </>
          ))
          
          
          // <>
          //   {images.map((url)=> <img src={url}/>)}
          //   {condition.map(([key,value], index) => <ConditionEvolutionSpan conditionType={key} conditionExecute={value}/>)}
          // </>


          // <img src={images[0]}/>
          // <ConditionEvolutionSpan conditionType="min_lvl" conditionExecute="16"/>
          // <img src={images[1]}/>
          // <ConditionEvolutionSpan conditionType="min_lvl" conditionExecute="36"/>
          // <img src={images[2]}/>
        ) : 
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={80} height={80} />
        ))
        }
    </div>
  )
}

export default EvolutionLineage
