import { useContext } from 'react'
import MealForm from './MealForm/MealForm'
import styles from './MealsItem.module.css'
import CartContext from '../../Store/Cart-Context'
const MealsItem = props => {
  const cartCtx = useContext(CartContext)
  const onAddtoCartHandler=(amount)=>{
    cartCtx.addItem({
      id:props.props.id,
      name:props.props.name,
      amount:amount,
      price:props.props.price
    })
  }
  return (
    <li className={styles.meal} >
      
        <div >
          <h3>{props.props.name}</h3>
          <div className={styles.description}>{props.props.description}</div>
        <div className={styles.price}>₹ {props.props.price.toFixed(2)}</div>
        </div>
      <MealForm id={props.props.id} onAddtoCart={onAddtoCartHandler}></MealForm>
    </li>
  )
}
export default MealsItem
