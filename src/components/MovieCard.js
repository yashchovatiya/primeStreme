import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
    console.log("test movies", posterPath);
  return (
    <div className='w-48 p-4'>
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
}

export default MovieCard