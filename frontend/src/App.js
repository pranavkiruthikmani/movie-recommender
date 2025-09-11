import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './home/home';
import Movie from './movie/movie';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes () {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/movie' element={<Movie />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
