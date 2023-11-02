import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styleContent from '../style/content.module.scss';
import { useNavigate } from 'react-router-dom';

function Content() {
  const [meals, setMeals] = useState([]);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
        const mealIds = response.data.meals.map((meal) => meal.idMeal);

        const mealDetails = [];
        for (let i = 0; i < 6 && i < mealIds.length; i++) {
          const mealId = mealIds[i];
          const detailResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
          mealDetails.push(detailResponse.data.meals[0]);
        }

        setMeals(mealDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const truncateDescription = (description) => {
    if (description.length <= 200) {
      return description;
    }
    return description.slice(0, 200) + '...';
  };

  const navigateToDetailPage = (mealId) => {
    navigate(`/detail/${mealId}`);
  };

  const addToFavorites = (meal) => {
    if (!favoriteMeals.some((favoriteMeal) => favoriteMeal.idMeal === meal.idMeal)) {
      setFavoriteMeals([...favoriteMeals, meal]);

      localStorage.setItem('favoriteMeals', JSON.stringify([...favoriteMeals, meal]));
    }
  }

  return (
    <div className={styleContent.container}>
      <div className={styleContent.containerAll}>
        {meals.map((meal) => (
          <div className={styleContent.containerItem} key={meal.idMeal}>
            <div>
              <h2>{meal.strMeal}</h2>
              <p>{truncateDescription(meal.strInstructions)}</p>
              <h2>Ingredients</h2>
              <div className={styleContent.ingredients}>
                {Array.from({ length: 4 }).map((_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`];
                  const measure = meal[`strMeasure${i + 1}`];
                  if (ingredient) {
                    return (
                      <div className={styleContent.detail} key={i}>
                        <h5>{ingredient}</h5>
                        <p>{measure}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className={styleContent.foot}>
                <button onClick={() => navigateToDetailPage(meal.idMeal)}>Detail</button>
                <button onClick={() => addToFavorites(meal)}>Add to Favorite</button>
              </div>
            </div>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
