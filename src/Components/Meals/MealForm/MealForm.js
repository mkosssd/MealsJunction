import styles from './MealForm.module.css'
const MealForm = (props) => {
  const submitHandler = event => {
    event.preventDefault()
    props.onAddtoCart(1)
  }
  return ( 
    <form className={styles.form} onSubmit={submitHandler}>
      
      <button type='submit'>Add</button>
      {/* {!amountIsValid && <p>Please enter a valid amount (1-5)</p>} */}
    </form>
  )
}
export default MealForm
