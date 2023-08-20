import React from 'react'
import {Helmet} from "react-helmet";
const TitleChange = ({name}) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
      </Helmet>
    </div>
  )
}

export default TitleChange