import MealsItem from './MealsItem'
import styles from './AvailiableMeals.module.css'
import Card from '../UI/Card/Card'
import { useEffect, useState } from 'react'
import Loader from '../UI/Loader/Loader'

const AvailiableMeals = () => {
  const [meals, setMeals] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fetchMeals = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        'https://recipe-book-project-udem-ad2cc-default-rtdb.firebaseio.com/recipes.json'
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()
      const loadedRecipes = []
      for (const key in data) {
        loadedRecipes.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedRecipes)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchMeals()
  }, []) // Removed the empty dependency array.

  const meal = meals.map(res => (
    <MealsItem key={res.id} props={res}></MealsItem>
  ))
  if (isLoading) {
    return (
      <section className={styles.meals}>
        <Card>
          <Loader></Loader>
        </Card>
      </section>
    )
  }
  if (error) {
    return (
      <section className={styles.meals}>
        <Card>
          <p>{error}</p>
        </Card>
      </section>
    )
  }
  return (
    <section className={styles.meals}>
      <Card>{<ul>{meal}</ul>}</Card>
    </section>
  )
}

export default AvailiableMeals
