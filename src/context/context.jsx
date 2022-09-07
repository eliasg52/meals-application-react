import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const useGlobalContext = () => {
  return useContext(AppContext);
};

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const randomMealUrl = 'random.php';
const mealByName = 'search.php?s=';
const getFavoritesFromLocalStorate = () => {
  let favorites = localStorage.getItem('favorites');

  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const [randomMeal, setrandomMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorate());

  console.log(favorites);

  const fetchMeal = async (baseUrl, findParameter) => {
    let url = '';
    setLoading(true);
    try {
      if (searchWord) {
        url = `${baseUrl}${findParameter}${searchWord}`;
      } else {
        url = `${baseUrl}${findParameter}`;
      }
      const { data } = await axios.get(url);
      data.meals ? setrandomMeal(data.meals) : setrandomMeal([]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setSearchWord('');
  };

  const fetchRandomMeal = () => {
    fetchMeal(BASE_URL, randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => {
        return meal.idMeal === idMeal;
      });
    } else {
      meal = randomMeal.find((meal) => {
        return meal.idMeal === idMeal;
      });
    }

    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => {
      return meal.idMeal === idMeal;
    });
    if (alreadyFavorite) return;
    const meal = randomMeal.find((meal) => {
      return meal.idMeal === idMeal;
    });
    const updateFavorites = [...favorites, meal];
    setFavorites(updateFavorites);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    const updateFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updateFavorites);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
  };

  useEffect(() => {
    fetchMeal(BASE_URL, mealByName);
  }, []);

  useEffect(() => {
    if (!searchWord) return;
    fetchMeal(BASE_URL, mealByName);
    /*     fetchMeal(BASE_URL, mealByName); */
  }, [searchWord]);

  return (
    <AppContext.Provider
      value={{
        randomMeal,
        loading,
        setSearchWord,
        fetchRandomMeal,
        showModal,
        setShowModal,
        selectMeal,
        selectedMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useGlobalContext };
