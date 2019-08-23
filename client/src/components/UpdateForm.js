import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    name: '',
    director: '',
    metascore: '',
    stars: '',
  };

  const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    useEffect(() => {
      const id = props.match.params.id;
      const movieInArr = props.movies.find(movie => `${movie.id}` === id);
      if (movieInArr) setMovie(movieInArr);
    }, [props.movies, props.match.params.id]);
  
    const changeHandler = ev => {
      ev.persist();
      let value = ev.target.value;
  
      setMovie({
        ...movie,
        [ev.target.name]: value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          console.log(res);
          setMovie(initialMovie);
          props.updateMovies(res.data);
          props.history.push('/movies');
        })
        .catch(err => console.log(err.response));
    };
  
    return (
      <div>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={changeHandler}
            placeholder="Name"
            value={movie.name}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={movie.director}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={movie.metascore}
          />
          <div className="baseline" />
  
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="Stars"
            value={movie.stars}
          />
          <div className="baseline" />
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdateForm;
