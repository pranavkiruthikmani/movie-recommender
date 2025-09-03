import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const [invalidInput, setInvalidInput] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const [init, setInit] = useState(0);

    const navigate = useNavigate();

    const get_movies = () => {

        console.log(input)
        if(input.trim().length > 0) {
            setInvalidInput(false);
            const input_movie = input.replaceAll(' ', '+')
            const link = 'http://127.0.0.1:5000/search/' + input_movie
            fetch(link)
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setLoading(false);

                if (data.some(item => item.hasOwnProperty('error'))) {
                    console.log("Connection error")
                }

                if (data.length === 0) {
                    setFound(false);
                } else {
                    setFound(true);
                }

                console.log("result")
                console.log(data)
                setAnimKey((prev) => prev + 1);
                setInit((prev) => prev + 1);

            });
        } else {
            setMovies([]);
            setInvalidInput(true);
        }           

        console.log(found)
    }

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const handleClick = (movie) => {
        navigate('/movie', {state: movie})
    }

    return(
        <div className="container">
            {found ? <h1></h1> : <h1> No Results </h1>}
            {invalidInput ? <h1>Invalid Input</h1> : <h1></h1>}
            <div className={`input-container ${init>0 ? 'active' : ''}`}>
                <input type="textbox" placeholder="Movie" value={input} onChange={handleInput}/>
                <button type="button" onClick={get_movies} className="submit-button">Submit</button>
            </div>
            <AnimatePresence>
                {movies.length > 0 && (
                    <motion.div
                        key={animKey}
                        initial={{y: 100, opacity: 0}}
                        animate={{y:0, opacity: 1}}
                        transition={{duration: 0.6, ease: "easeIn"}}
                        className="results-container"
                    >
                        {movies.map((movie, index) => {
                        if (index <= 5) {
                            return(
                                <button className="poster-button" key={movie.id} onClick={() => handleClick(movie)}>
                                    <img className="poster" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}/>
                                </button>
                            )
                        }
                        })}
                    </motion.div>
                )}                    
            </AnimatePresence>
        </div>
    )      
}

export default Home