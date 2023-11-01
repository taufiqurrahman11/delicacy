import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styleDetail from '../../style/detail.module.scss';
import Footer from '../Footer';
import Logo from '../Logo'

function Detail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealData = response.data.meals[0];
        setMeal(mealData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styleDetail.container}>
      <Logo />
      {meal ? (
        <div className={styleDetail.containerItem}>
          <h2>{meal.strMeal}</h2>
          <p>{meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <div className={styleDetail.ingredients}>
            {Array.from({ length: 4 }).map((_, i) => {
              const ingredient = meal[`strIngredient${i + 1}`];
              const measure = meal[`strMeasure${i + 1}`];
              if (ingredient) {
                return (
                  <div className={styleDetail.detail} key={i}>
                    <h5>{ingredient}</h5>
                    <p>{measure}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <button>Add to Favorite</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
}

export default Detail;
