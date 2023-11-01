import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import styleFooter from '../style/footer.module.scss';

const Footer = () => {
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=v')
      .then((response) => {
        const data = response.data;
        const meals = data.meals.slice(1, 7);
        setMealData(meals);
      })
      .catch((error) => {
        console.error('Error fetching meal data', error);
      });
  }, []);

  return (
    <>   
    <h2 className={styleFooter.recipies}>More recipies</h2>
    <div className={styleFooter.container}>
      {mealData.map((meal, index) => (
        <div className={styleFooter.item} key={index}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strMeal}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Footer;
