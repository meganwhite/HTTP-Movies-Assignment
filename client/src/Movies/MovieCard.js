import React from 'react';
import MovieList from './MovieList';
import {Link} from 'react-router-dom';
import axios from 'axios'

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const {movie} = props;

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/movies/${movie.id}`)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push('/movies');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link to={`/update-movies/${props.movie.id}`}><button>Edit</button></Link>
      <button onClick={deleteMovie} className="md-button">
        Delete Movie
      </button>
    </div>
  );
};

export default MovieCard;
