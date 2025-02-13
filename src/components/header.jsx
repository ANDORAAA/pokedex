import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CiSearch } from 'react-icons/ci';
import '../styles/header.css';

const Header = () => {
  const [query, setQuery] = useState('');

  return (
    <header>
      <nav>
        <img src={logo} alt='logo' />
        <div className='search-wrapper'>
          <input
            type='text'
            placeholder='Search by name or id'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/${query}`}>
            <button>
              <CiSearch />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
