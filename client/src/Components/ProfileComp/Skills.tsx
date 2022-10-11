import React, { useEffect } from 'react'

const Skills = (props: {skillArr?: Array<string>}) => {
  useEffect(() => {
    console.log(props.skillArr?.length);
  }, [])

  const arrLength = props.skillArr?.length
  
  return (
    <div>bb</div>
  )
}

export default Skills