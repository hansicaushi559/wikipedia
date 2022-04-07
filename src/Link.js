import React from 'react'

function Link({data}) {


  return (
    <a className='search-box' href={data}>
        {data}
    </a>
  )
}

export default Link