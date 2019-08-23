import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  
  function routeToMovie(ev, movie) {
    ev.preventDefault();
    props.history.push(`/movies/${movie.id}`);
  }

    return (
      <div className="movie-list">
        {props.movies.map(movie => (
          <Link to={`/movies/${movie.id}`}><MovieCard onClick={ev => routeToMovie(ev, movie)} key={movie.id} movie={movie} /></Link>
        ))}
      </div>
    );
  }

export default MovieList;



