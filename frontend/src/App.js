import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './home/home';
import Movie from './movie/movie';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes () {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={
          //<PageWrapper>
            <Home />
          //</PageWrapper>          
          } 
        />
        <Route path='/movie' element={
          // <PageWrapper>
            <Movie />
          // </PageWrapper>          
          } 
        />
      </Routes>
    </AnimatePresence>
  )
}

function PageWrapper ({children}) {
  return(
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{duration: 0.5}}
    >
      {children}
    </motion.div>
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
