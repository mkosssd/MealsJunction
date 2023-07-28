import MealsItem from "./MealsItem";
import styles from './AvailiableMeals.module.css'
import Card from "../UI/Card/Card";
import { useEffect, useState } from "react";

const AvailiableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://recipe-book-project-udem-ad2cc-default-rtdb.firebaseio.com/recipes.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedRecipes = [];
      for (const key in data) {
        loadedRecipes.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      setMeals(loadedRecipes); // Moved outside the for loop to set the state after all recipes are loaded.
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []); // Removed the empty dependency array.

  const meal = meals.map(res => <MealsItem key={res.id} props={res}></MealsItem>);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meal}</ul>
      </Card>
    </section>
  );
};

export default AvailiableMeals;
