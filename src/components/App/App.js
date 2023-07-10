import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import ExitMovie from '../ExitMovie/ExitMovie';
import { useState, useEffect } from 'react';
import { getAllMovies, getSingleMovie } from '../../apiCalls';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [singleMovie, setSingleMovie] = useState(null);
  const [movieNeeded, setMovieNeeded] = useState(null);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchApi = (request, setter, id) => {
    setLoading(true)
    const apiCall = async () => {
      try {
        setter(await request(id))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
  
    apiCall()   
  }

  useEffect(() => {
    fetchApi(getAllMovies, setAllMovies)

    return () => setError('')
  }, [])

  useEffect(() => {
    if(movieNeeded) fetchApi(getSingleMovie, setSingleMovie, movieNeeded)

    return () => {
      setMovieNeeded(null)
      setError('')
    }
  }, [movieNeeded])

  const viewMovie = (id) => {
    setMovieNeeded(id)
  };

  const viewAll = () => {
    setSingleMovie(null);
  };

  return (
    <main className="main-app">
      <div className='title-container'>
        <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
        {singleMovie && <ExitMovie viewAll={viewAll} />}
      </div>
      {error && <h1 style={{color: 'red'}}>{error.message}</h1>}
      {singleMovie ? 
          <SingleMovie selectedMovie={singleMovie} /> 
        : 
        <>
          {loading && <div className='loading-container'><span className='loading'></span></div>}
          <MoviesBox movies={allMovies} viewMovie={viewMovie}/>
        </>
      }
    </main>
  );
}

export default App;
