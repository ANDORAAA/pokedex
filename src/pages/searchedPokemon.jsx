import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';
import Stats from '../components/stats';
import '../styles/searchedPokemon.css';

const SearchedPokemon = () => {
  const { pokemon } = useParams();
  const [selectePokemon, setSelectedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    height: 0,
    weight: 0,
    exp: 0,
    hp: 0,
    attack: 0,
    defence: 0,
    splAttack: 0,
    aplDefence: 0,
    speed: 0,
  });

  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  useEffect(() => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSelectedPokemon(data);
        setStats({
          height: (data.height / 3.048).toFixed(1),
          weight: (data.weight / 10).toFixed(1),
          exp: data.base_experience,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          splAttack: data.stats[3].base_stat,
          splDefence: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchPokemon();
  }, [pokemon]);

  if (loading) return <LoadingScreen />;

  return (
    <div className='searched-pokemon-wrapper'>
      <div className='searched-pokemon-header'>
        <Link to={'/'}>
          <button className='btn'>Back</button>
        </Link>
      </div>

      <div className='pokemon-details'>
        <div className='searched-pokemon-info'>
          <h4>{selectePokemon.name}</h4>
          <div className='type'>
            {selectePokemon.types.map((type, index) => (
              <span
                key={index}
                style={{ backgroundColor: colours[type.type.name] }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <Stats stats={stats} />
        </div>
        <div className='preview-image'>
          <img
            src={selectePokemon.sprites.other.home.front_default}
            alt={selectePokemon.name}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedPokemon;
