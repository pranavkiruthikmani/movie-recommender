import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/home';
import Movie from './movie/movie';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/movie' element={<Movie />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
