import React, { useEffect, useState } from "react";
import '../App.css'
import { useLocation } from "react-router-dom";

const Movie = () => {
    const location = useLocation();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        if (location.state) {
            setMovie(location.state)
        }
    }, [location.state])

   return(
    <div>
        <div className="poster-container">
            <img className="poster-main" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}/>
        </div>   
        <div className="button-container">
            <button className="submit-button">
                Recommend
            </button>
        </div>     
        
    </div>
   )
}

export default Movie