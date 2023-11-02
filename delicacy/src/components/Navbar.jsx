import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styleNav from '../style/navbar.module.scss'

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        const slicedCategories = response.data.categories.slice(0, 5);
        setCategories(slicedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className={styleNav.container}>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <a href={`#${category.strCategory}`}>{category.strCategory}</a>
          </li>
        ))}
        <li>
          <a href="">Favorite</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
