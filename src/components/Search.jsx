import { useState } from 'react';
import { useGlobalContext } from '../context/context';

export const Search = () => {
  const { setSearchWord, fetchRandomMeal } = useGlobalContext();
  const [searchMeal, setSearchMeal] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    searchMeal && setSearchWord(searchMeal);
    setSearchMeal('');
  };

  const handleRandomMeal = () => {
    setSearchMeal('');
    setSearchWord('');
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => setSearchMeal(e.target.value)}
          className="form-input"
          value={searchMeal}
        />
        <button type="submit" className="btn">
          Search
        </button>
        <button
          type="button"
          onClick={handleRandomMeal}
          className="btn btn-hipster"
        >
          Surprise me
        </button>
      </form>
    </header>
  );
};
