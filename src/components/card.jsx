import logo from '../assets/logo.png';

const Card = ({ data }) => {
  const urlParts = data.url.split('/');
  const pokeId = urlParts[urlParts.length - 2];
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`;

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className='card'>
      <img src={imgUrl} alt={data.name} />
      <div className='text'>
        <h4 className='name'>
          <span className='pokeId'>{pokeId}</span>
          {capitalizeFirstLetter(data.name)}
        </h4>
      </div>
    </div>
  );
};

export default Card;
