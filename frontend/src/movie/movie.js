import React, { useEffect, useState, unstable_ViewTransition as ViewTransition, startTransition } from "react";
import '../App.css'
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Movie = () => {
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [movieList, setMovieList] = useState([])
    const [ready, setReady] = useState(0)
    const [final, setFinal] = useState(0)

    useEffect(() => {
        if (location.state) {
            setMovie(location.state)
        }
    }, [location.state])

    const handleRecommend = () => {
        const link = 'http://127.0.0.1:5000/recommend/' + movie.title;
        fetch(link)
        .then(response => response.json())
        .then(data => {
            setMovieList(data);
            setReady(prev => prev + 1)
        })
        
    }

    useEffect(() => {
        console.log(movieList)

        if (movieList.length > 0) {
            
            const fetches = movieList.map(item => {
                const title = Object.values(item)[0].replaceAll(' ', '+')                
                const link = 'http://127.0.0.1:5000/search/' + title

                return (
                    fetch(link)
                    .then(response => response.json())
                    .then(data => data[0])
                    .catch((err) => {
                        console.error(err);
                        return movie; // fallback to original
                    })
                )
            })

            Promise.all(fetches).then(newList => {
                setMovieList(newList)
                setFinal(prev => prev + 1)
            })

        } else {
            return;
        }
        // if (movieList.length > 0) {
        //     for (let index = 0; index < movieList.length; index++) {
        //         const title = Object.values(movieList[index])[0].replaceAll(' ', '+')
                
        //         const link = 'http://127.0.0.1:5000/search/' + title
        //         fetch(link)
        //         .then(response => response.json())
        //         .then(data => {
        //             const newList = movieList.map(item => {
        //                 if (Object.values(item)[0] === data[0].title) {
        //                     console.log("found")
        //                     return(
        //                         data[0]
        //                     )
        //                 } else {
        //                     return(item)
        //                 }
        //             })
        //             setMovieList(newList)
        //         })
        //     }
        // }
    }, [ready])

    const showArray = () => {
        console.log(movieList)
    }

   return(
    <div>
        <div className="poster-container">
            <motion.div
                layoutId={`image-${movie.id}`}
                key={movie.id}
            >
                {console.log(`image-${movie.id}`)}
                <img className={`poster-main ${final > 0 ? `active` : ``}`} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}/>
            </motion.div>
        </div>   
        <div className={`button-container ${final > 0 ? `active` : ``}`}>
            <button className="submit-button" onClick={handleRecommend}>
                Recommend
            </button>
            {/* <button onClick={showArray}>
                show
            </button> */}
        </div> 
        <AnimatePresence>
            {final > 0 && (
                <motion.div
                        key={final}
                        initial={{y: 100, opacity: 0}}
                        animate={{y:0, opacity: 1}}
                        transition={{duration: 0.6, ease: "easeIn"}}
                        className="results-container"
                    >
                        {movieList.map((movie, index) => {
                            if (index <= 5) {
                                return (
                                    <button className="poster-button" key={movie.id}>
                                        <img className="poster" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                                    </button>
                                )
                            } else {
                                return null;
                            }
                         })}
                    </motion.div>
            )}
                
        </AnimatePresence>    
        {/* <div className="results-container">
            {final > 0 && (
                movieList.map((movie, index) => {
                    if (index <= 5) {
                        return (
                            <button className="poster-button" key={movie.id}>
                                <img className="poster" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                            </button>
                        )
                    } else {
                        return null;
                    }
                }) 
            )}
        </div> */}
        
    </div>
   )
}

export default Movie