import { Link } from 'react-router-dom';
import Card from '../components/card';
import '../styles/feed.css';

const Feed = ({ pokemons }) => {
  return (
    <section className='pokemon-feed'>
      {pokemons?.map((pokemons) => (
        <Link to={`/${pokemons.name}`} key={pokemons.name}>
          <Card data={pokemons} />
        </Link>
      ))}
    </section>
  );
};

export default Feed;
