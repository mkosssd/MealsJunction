import { useRef, useState } from 'react'
import Input from '../../UI/Input/Input'
import styles from './MealForm.module.css'
const MealForm = (props) => {
  const [amountIsValid,setAmountIsValid]=useState(true)
  const submitHandler = event => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmountNumber<1 || enteredAmountNumber > 5){
      setAmountIsValid(false)
      return
    }
    props.onAddtoCart(enteredAmountNumber)
  }
const amountInputRef = useRef()
  return ( 
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
      ref={amountInputRef}
        input={{
          id: 'amount_'+props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
        label='Amount'
      />
      <button >Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  )
}
export default MealForm
