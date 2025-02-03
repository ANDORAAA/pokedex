import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SearchedPokemon from './pages/searchedPokemon';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path={'/:pokemon'} element={<SearchedPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
