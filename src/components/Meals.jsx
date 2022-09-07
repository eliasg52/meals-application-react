import { useGlobalContext } from '../context/context';
import { BsHandThumbsUp } from 'react-icons/bs';

export const Meals = () => {
  const { randomMeal, loading, selectMeal, addToFavorites } =
    useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (randomMeal < 1) {
    return (
      <section className="section">
        <h4>No items for your search</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {randomMeal.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              alt=""
              className="img"
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavorites(idMeal)}
              >
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};
