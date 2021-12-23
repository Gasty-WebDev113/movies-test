import React, { useState, useEffect } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import { DescriptionModal } from './DescriptionModal'

export default function MoviesList (){
  const [movieList, setMovieList] = useState([])
  const [movieListIndex, setMovieListIndex] = useState(3)

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('default')

  const handleSelectMovie = movie => {
    setSelectedMovie(movie)
  }
  const handleSortingChange = event => {
    setSortingType(event.target.value)
  }
  const applyFilters = () => {
    switch(sortingType){
      case "name_asc":
        return movieList.map(movies => movies.sort((a, b) => a.title > b.title ? 1 : -1))
        break;

      case "name_desc":
        return movieList.map(movies => movies.sort((a, b) => a.title > b.title ? -1 : 1))

      case "rating":
        return movieList.map(movies => movies.sort((a, b) => b.popularity - a.popularity))

      case 'default':
        return movieList
    }
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  console.log(movieListIndex, 'indx')

  const handleScroll = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1  > e.target.documentElement.scrollHeight){
      //at bottom
      setMovieListIndex((movieListIndex) => movieListIndex+1)
      console.log(movieListIndex, 'index')
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=${movieListIndex}`)
    .then(response => response.json())
    .then((data) => {
      setMovieList((oldList) => [...oldList, data.results])
    })
  }, [movieListIndex])

  useEffect(() => {
    let movieList = []

    if(movieListIndex <= 3){
      fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=1")
      .then(response => response.json())
      .then((data) => movieList.push (data.results))
      .then(
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=2")
        .then(response => response.json())
        .then((data) => movieList.push(data.results))
      )
      .then(
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=3")
        .then(response => response.json())
        .then((data) => movieList.push(data.results))
        .then(() => {
          setMovieList(movieList)
        })
      )
    }
  }, [movieListIndex])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])
    
  console.log(movieList)

  return(<div className="movies-list">
    <div className="sort-list">
      <span>Sort by:</span>
      <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
    </div>
    <div className="items">
      {
        applyFilters().map(movies => 
          <div className="row-list">
            {movies && movies.map((movie) => <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={handleSelectMovie}/>)}
          </div>
          
        )
      }
    </div>
    {
      selectedMovie && (
        <DescriptionModal movie={selectedMovie} closeModal={handleCloseModal} />
      )
    }
  </div>)

  
}

const ExpandedMovieItem = ({movie: {title, original_title, poster_path, overview, vote_average, vote_count}}) => (
  <div className="expanded-movie-item">
    <TMDBImage src={poster_path} className="poster" />
    <div className="description">
      <h2>{title}({original_title})</h2>
      <div><h4>Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span></div>
      <span>{overview}</span>
    </div>
  </div>
)

function MovieListItem ({movie, isSelected, onSelect}) {
  const handleClick = () => onSelect(movie)
  const { title, vote_average, poster_path} = movie
  const className = `movie-list-item ${isSelected ? 'selected' : ''}`
  return(
    <div className={className} onClick={handleClick}>
      <TMDBImage src={poster_path}/>
    </div>)
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select value={selectedOption} onChange={onChange}>
      <option value="default"></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

