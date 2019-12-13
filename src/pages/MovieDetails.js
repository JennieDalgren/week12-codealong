import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { BackArrow } from 'icons/BackArrow'

export const MovieDetails = () => {
  const [movie, setMovie] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=0a7bdc5f7b44e6a5230c95a3dbb9bbbc&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status_code === 34) {
          setError('Movie not found')
        } else {
          setMovie(json)
        }

        setLoading(false)
      })
  }, [id]) // We need to pass id as a dependecy here so everytime the id changes, we do a new fetch.

  if (loading) {
    return <h1>LOADING</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>
      <button onClick={() => history.goBack()} className="backLink">
        <BackArrow />
        Back
      </button>
      <h1>{movie.title}</h1>
    </div>
  )
}
