import React, { useEffect, useState } from "react";
import '../App.css'
import { useLocation } from "react-router-dom";

const Movie = () => {
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [movieList, setMovieList] = useState([])
    const [ready, setReady] = useState(0)

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
            <img className="poster-main" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}/>
        </div>   
        <div className="button-container">
            <button className="submit-button" onClick={handleRecommend}>
                Recommend
            </button>
            <button onClick={showArray}>
                show
            </button>
        </div>     
        
    </div>
   )
}

export default Movie