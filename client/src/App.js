import React, { useState, useEffect } from "react";
import { Route, Link} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./components/UpdateForm";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);


  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/"
              render={props => (
                <MovieList
                  {...props} 
                  movies={movies}
                />
              )} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
      path="/update-movies/:id" 
      render={props => {
        return <UpdateForm {...props} movies = {movies} updateMovies = {setMovies}/>
      }}
      />
    </>
  );
};

export default App;  
