import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTopRatedMovies} from '../store/actions'
import './MovieLibrary.css'
import { getMovies } from '../store/selectors'
import MoviesList from './MoviesList'

export default function MovieLibrary() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTopRatedMovies())
  }, [])
  const movies = useSelector(getMovies)
  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <h1 className="ML-title">Movies</h1>
      </header>
      <div className="ML-intro">
        { movies.length && <MoviesList movies={movies}/> }
      </div>
    </div>)
}
