import React, { useEffect, useState } from "react";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/search/Matrix')
            .then(response => response.json())
            .then(data => setMovies(data));
        
        console.log(movies)
    }, [])

    return(
        <div>
            <input type="textbox" placeholder="Movie"/>
            <button type="button">Submit</button>
        </div>
    )
}

export default Home