import Header from '../components/header';
import Feed from '../components/feed';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingScreen from '../components/loadingScreen';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(() => {
    const storedOffset = sessionStorage.getItem('offset');
    return storedOffset ? Number(storedOffset) : 0;
  });
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    const newOffSet = offSet + 50;
    setOffSet(newOffSet);
    sessionStorage.setItem('offset', newOffSet.toString());
  };

  const handlePreviousPage = () => {
    const newOffSet = offSet <= 50 ? 0 : offSet - 50;
    setOffSet(newOffSet);
    sessionStorage.setItem('offset', newOffSet.toString());
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      setPokemons(data.results);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchPokemon();
  }, [offSet]);

  useEffect(() => {
    setLoading(true);
  }, [offSet]);

  return (
    <div home-wrapper style={{ maxWidth: '68rem', margin: '0 auto' }}>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <Header />
          <Feed pokemons={pokemons} />
          <div className='pagination'>
            <button className='btn' onClick={() => handlePreviousPage()}>
              Previous
            </button>
            <button className='btn' onClick={() => handleNextPage()}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
